/**
 * Builds the site and ships build/ to Dreamhost over SSH.
 *
 * The whole site is static files, so deploying is an rsync of build/ into the
 * domain directory. Two things make that safe enough to run casually:
 *
 *  1. Every run does a dry run first and prints what would change. Nothing is
 *     written until you confirm, or pass --yes.
 *  2. --delete prunes files the build no longer produces, which is what keeps
 *     old hashed assets and deleted routes from piling up forever. Anything in
 *     KEEP is excluded from both the upload and the prune, so files the server
 *     owns (cert challenges, stats, logs) are never touched.
 *
 * One SSH connection is shared by every command in the run, so a password
 * login only asks once. Set up a key with `ssh-copy-id user@host` and it stops
 * asking at all.
 *
 * Run: npm run deploy            build, preview the diff, confirm, upload, verify
 *      npm run deploy -- -n      dry run only, change nothing
 *      npm run deploy -- --skip-build --yes
 */
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { existsSync, readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Server-owned paths. Excluded patterns are skipped on upload and, because
 * rsync will not delete what it was told to ignore, survive the prune.
 */
const KEEP = [
  '.well-known/acme-challenge/', // Let's Encrypt writes here during renewal.
  'cgi-bin/',
  'stats/',
  'logs/',
  '.htpasswd',
  '.user.ini',
];

/** A prune this large is more likely a wrong DEPLOY_PATH than a real change. */
const DELETE_ALARM = 400;

const args = process.argv.slice(2);
const has = (...names) => names.some((n) => args.includes(n));

const opts = {
  dryRun: has('-n', '--dry-run'),
  skipBuild: has('--skip-build'),
  skipVerify: has('--skip-verify'),
  prune: !has('--no-prune'),
  yes: has('-y', '--yes'),
};

if (has('-h', '--help')) {
  console.log(
    [
      'Usage: npm run deploy [-- options]',
      '',
      '  -n, --dry-run    show what would change, upload nothing',
      '  -y, --yes        skip the confirmation prompt',
      '      --skip-build deploy build/ as it stands',
      '      --skip-verify  do not run npm run verify afterwards',
      '      --no-prune   leave files the build no longer produces',
      '',
      'Config comes from .env.deploy or the environment:',
      '  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_PORT, DEPLOY_SSH_KEY,\n  DEPLOY_RSYNC',
    ].join('\n'),
  );
  process.exit(0);
}

// --- config ---------------------------------------------------------------

/** Minimal KEY=value reader. The real environment wins over the file. */
function loadEnvFile(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
    if (!match) continue;
    const value = match[2].trim().replace(/^(['"])(.*)\1$/, '$2');
    if (process.env[match[1]] === undefined) process.env[match[1]] = value;
  }
}

loadEnvFile(path.join(root, '.env.deploy'));

const cfg = {
  user: process.env.DEPLOY_USER,
  host: process.env.DEPLOY_HOST,
  // Relative paths resolve against the login home, which is where Dreamhost
  // puts the domain directories.
  path: process.env.DEPLOY_PATH ?? 'solutions.ironcoffee.com',
  port: process.env.DEPLOY_PORT,
  key: process.env.DEPLOY_SSH_KEY,
};

if (!cfg.user || !cfg.host) {
  console.error(
    'Missing DEPLOY_USER or DEPLOY_HOST.\n' +
      'Copy .env.deploy.example to .env.deploy and fill it in.',
  );
  process.exit(1);
}

// A trailing slash on the source copies the contents of build/, not build/
// itself. Getting this wrong nests the whole site one level deep.
const source = path.join(root, 'build') + '/';
const target = `${cfg.user}@${cfg.host}:${cfg.path.replace(/\/$/, '')}/`;

/**
 * macOS ships openrsync, which speaks the 2.6 protocol. It talks to the rsync
 * 3.x on the server fine in the normal case, but when it does not the error is
 * an unreadable protocol tag rather than anything about versions. Prefer a
 * Homebrew rsync when one is installed, and name the fix if the transfer dies.
 */
const rsyncBin =
  process.env.DEPLOY_RSYNC ??
  ['/opt/homebrew/bin/rsync', '/usr/local/bin/rsync'].find((b) => existsSync(b)) ??
  'rsync';

// --- plumbing -------------------------------------------------------------

/** Runs a command, inheriting stdio so password prompts still work. */
function run(cmd, cmdArgs, { cwd = root, capture = false } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, cmdArgs, {
      cwd,
      stdio: capture ? ['inherit', 'pipe', 'inherit'] : 'inherit',
    });
    let out = '';
    if (capture) child.stdout.on('data', (d) => (out += d));
    child.on('error', reject);
    child.on('close', (code) =>
      code === 0
        ? resolve(out)
        : reject(new Error(`${cmd} exited with ${code}`)),
    );
  });
}

// One multiplexed connection for the whole run: the first command opens it and
// everything after rides along, so a password is typed once rather than per
// rsync. The socket closes when the script finishes.
const socket = path.join(os.homedir(), '.ssh', `deploy-%r@%h-%p.sock`);
const sshOpts = ['-o', 'ControlMaster=auto', '-o', `ControlPath=${socket}`, '-o', 'ControlPersist=120'];
if (cfg.port) sshOpts.push('-p', cfg.port);
if (cfg.key) sshOpts.push('-i', cfg.key);

/** Single quotes for the remote shell, so a path is never re-expanded there. */
const shellQuote = (value) => `'${value.replace(/'/g, `'\\''`)}'`;

const sshCommand = ['ssh', ...sshOpts].join(' ');
const ssh = (remoteCmd) =>
  run('ssh', [...sshOpts, `${cfg.user}@${cfg.host}`, remoteCmd], { capture: true });

async function closeMaster() {
  try {
    await run('ssh', [...sshOpts, '-O', 'exit', `${cfg.user}@${cfg.host}`], {
      capture: true,
    });
  } catch {
    // No master to close, which is fine.
  }
}

async function confirm(question) {
  if (opts.yes) return true;
  if (!process.stdin.isTTY) {
    console.error('Not a terminal. Re-run with --yes to deploy unattended.');
    return false;
  }
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(`${question} [y/N] `);
  rl.close();
  return /^y(es)?$/i.test(answer.trim());
}

function rsyncArgs({ dryRun }) {
  // -a would try to preserve owner and group, which a shared host rejects.
  // Permissions, times and symlinks are all that matter for static files.
  const a = ['-rlptz', '--itemize-changes', '--human-readable'];
  if (dryRun) a.push('--dry-run');
  if (opts.prune) a.push('--delete');
  for (const pattern of KEEP) a.push('--exclude', pattern);
  a.push('-e', sshCommand, source, target);
  return a;
}

/** Splits rsync's itemized output into what it would send and what it would delete. */
function summarize(output) {
  const sent = [];
  const deleted = [];
  for (const line of output.split('\n')) {
    if (!line.trim()) continue;
    if (line.startsWith('*deleting') || line.startsWith('deleting ')) {
      deleted.push(line.replace(/^\*?deleting\s+/, ''));
    } else if (/^[<>ch.]/.test(line)) {
      const file = line.slice(line.indexOf(' ') + 1);
      // Directories whose only change is a timestamp are noise.
      if (!file.endsWith('/')) sent.push(file);
    }
  }
  return { sent, deleted };
}

const list = (files, limit = 15) =>
  files
    .slice(0, limit)
    .map((f) => `    ${f}`)
    .concat(files.length > limit ? [`    ... and ${files.length - limit} more`] : [])
    .join('\n');

// --- the deploy -----------------------------------------------------------

async function main() {
  if (!opts.skipBuild) {
    console.log('\n→ Building');
    await run('npm', ['run', 'build']);
  }

  // A build missing either of these would deploy a site that 404s on refresh
  // or loses every redirect and cache header, so check before touching the
  // server rather than after.
  for (const file of ['index.html', '.htaccess']) {
    if (!existsSync(path.join(root, 'build', file))) {
      throw new Error(`build/${file} is missing. Run npm run build first.`);
    }
  }

  console.log(`\n→ Connecting to ${cfg.user}@${cfg.host}`);
  // Resolving the path server side catches a typo in DEPLOY_PATH now, when it
  // is one message, instead of after rsync has created the directory.
  const probe = await ssh(
    `cd ${shellQuote(cfg.path)} 2>/dev/null && pwd && ls -A | wc -l || echo MISSING`,
  );
  const [remotePath, entryCount] = probe.trim().split('\n');

  if (remotePath === 'MISSING') {
    throw new Error(
      `${cfg.path} does not exist on ${cfg.host}. Set DEPLOY_PATH to the domain directory.`,
    );
  }
  if (remotePath === (await ssh('echo $HOME')).trim()) {
    throw new Error(
      'DEPLOY_PATH points at the home directory. That would spray the site over Maildir and logs.',
    );
  }
  console.log(`  ${remotePath} (${entryCount.trim()} entries)`);

  console.log('\n→ Comparing');
  const { sent, deleted } = summarize(
    await run(rsyncBin, rsyncArgs({ dryRun: true }), { capture: true }),
  );

  if (!sent.length && !deleted.length) {
    console.log('  Already up to date. Nothing to do.');
    return;
  }

  if (sent.length) console.log(`\n  ${sent.length} to upload:\n${list(sent)}`);
  if (deleted.length) console.log(`\n  ${deleted.length} to delete:\n${list(deleted)}`);

  if (opts.dryRun) {
    console.log('\nDry run. Nothing was uploaded.');
    return;
  }

  if (deleted.length > DELETE_ALARM) {
    console.log(
      `\n  ${deleted.length} deletions is a lot. Check DEPLOY_PATH is the right domain before saying yes.`,
    );
  }

  if (!(await confirm(`\nDeploy to ${cfg.host}:${remotePath}?`))) {
    console.log('Cancelled.');
    process.exitCode = 1;
    return;
  }

  console.log('\n→ Uploading');
  await run(rsyncBin, ['--stats', ...rsyncArgs({ dryRun: false })]);

  if (opts.skipVerify) {
    console.log('\nDone. Skipping verification.');
    return;
  }

  console.log('\n→ Verifying the live site');
  try {
    await run('node', [path.join(root, 'scripts', 'verify-deploy.js')]);
  } catch {
    // The upload succeeded, so this is a report about the live site rather
    // than a failed deploy. Say which one it is.
    throw new Error('Uploaded, but npm run verify found problems above.');
  }
}

try {
  await main();
} catch (error) {
  console.error(`\n${error.message}`);
  if (/rsync exited/.test(error.message) && rsyncBin === 'rsync') {
    console.error(
      "If that was a protocol error rather than a refused login, macOS's\n" +
        'openrsync and the server disagreed. `brew install rsync` and rerun.',
    );
  }
  process.exitCode = 1;
} finally {
  await closeMaster();
}

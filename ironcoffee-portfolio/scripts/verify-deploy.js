const https = require('https');
const dns = require('dns');

const domain = 'solutions.ironcoffee.com';
const paths = [
  '/',
  '/about',
  '/portfolio',
  '/services',
  '/contact',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml'
];

const checkEndpoint = (path) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: domain,
      port: 443,
      path: path,
      method: 'GET'
    };

    const req = https.request(options, (res) => {
      console.log(`${path} - Status: ${res.statusCode}`);
      resolve(res.statusCode);
    });

    req.on('error', (error) => {
      console.error(`Error checking ${path}: ${error}`);
      reject(error);
    });

    req.end();
  });
};

const verifyDeployment = async () => {
  console.log('Starting deployment verification...');
  
  // Check DNS
  dns.resolve4(domain, (err, addresses) => {
    if (err) {
      console.error('DNS resolution failed:', err);
    } else {
      console.log('DNS Resolution:', addresses);
    }
  });

  // Check SSL
  try {
    const sslCheck = await checkEndpoint('/');
    console.log('SSL Check:', sslCheck === 200 ? 'OK' : 'Failed');
  } catch (error) {
    console.error('SSL Check failed:', error);
  }

  // Check all paths
  for (const path of paths) {
    try {
      await checkEndpoint(path);
    } catch (error) {
      console.error(`Failed checking ${path}`);
    }
  }

  console.log('Verification complete!');
};

verifyDeployment(); 
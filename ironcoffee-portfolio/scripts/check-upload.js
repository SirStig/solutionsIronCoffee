const https = require('https');

const criticalFiles = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
  '/.htaccess'
];

const checkFile = (path) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'solutions.ironcoffee.com',
      port: 443,
      path: path,
      method: 'HEAD'
    };

    const req = https.request(options, (res) => {
      console.log(`${path}: ${res.statusCode} (${res.headers['content-type'] || 'no content-type'})`);
      resolve({
        path,
        status: res.statusCode,
        contentType: res.headers['content-type']
      });
    });

    req.on('error', (error) => {
      console.error(`Error checking ${path}: ${error.message}`);
      reject(error);
    });

    req.end();
  });
};

const main = async () => {
  console.log('Checking critical files...');
  
  for (const file of criticalFiles) {
    try {
      await checkFile(file);
    } catch (error) {
      console.error(`Failed to check ${file}`);
    }
  }

  console.log('\nChecking for common issues...');
  try {
    const indexResponse = await checkFile('/');
    if (indexResponse.status === 404) {
      console.error('WARNING: index.html not found or not serving correctly');
    }
    if (indexResponse.status === 403) {
      console.error('WARNING: Possible permissions issue');
    }
    if (indexResponse.contentType && indexResponse.contentType.includes('text/plain')) {
      console.error('WARNING: .htaccess might not be working correctly');
    }
  } catch (error) {
    console.error('Failed to perform checks:', error.message);
  }

  console.log('\nVerification complete!');
};

main().catch(console.error); 
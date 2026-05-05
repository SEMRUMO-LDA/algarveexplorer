// Phusion Passenger entry point for the cPanel "Setup Node.js App" form.
// Passenger sets process.env.PORT to the socket it'll proxy from; we hand
// every request to Next.js's request handler. CommonJS for max compat.

// FORCE production mode — cPanel sets NODE_ENV="Production" (capital P)
// which Next.js does not recognise. We overwrite it unconditionally.
process.env.NODE_ENV = 'production';

const path = require('path');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dir = path.resolve(__dirname);
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

console.log('Starting Algarve Explorer...');
console.log('  dir:', dir);
console.log('  NODE_ENV:', process.env.NODE_ENV);
console.log('  .next exists:', require('fs').existsSync(path.join(dir, '.next')));

const app = next({ dev: false, dir });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`Algarve Explorer ready on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Next.js failed to start:', err);
    process.exit(1);
  });

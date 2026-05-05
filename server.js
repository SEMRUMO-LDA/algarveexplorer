// Phusion Passenger entry point for the cPanel "Setup Node.js App" form.
// Passenger sets process.env.PORT to the socket it'll proxy from; we hand
// every request to Next.js's request handler. CommonJS for max compat.

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// cPanel's "Application mode" dropdown writes NODE_ENV with the literal
// case from the UI ("Production"), which Next.js doesn't recognise — it
// would fall back to dev mode and try to webpack the CSS at request time.
// Compare lowercased so any casing of `production` boots production mode.
const dev = (process.env.NODE_ENV || '').toLowerCase() !== 'production';
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const app = next({ dev });
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

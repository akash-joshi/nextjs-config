const express = require('express');
const next = require('next');
const cors = require('cors');
const bodyparser = require('body-parser');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(cors());
  server.use(bodyparser.json());

  server.get('/sitemap.xml', (req, res) => res.sendFile(`${__dirname}/sitemap.xml`));
  server.get('/robots.txt', (req, res) => res.sendFile(`${__dirname}/robots.txt`));

  // API to check if api server running
  server.get('/api', (req, res) => {
    res.send('working');
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

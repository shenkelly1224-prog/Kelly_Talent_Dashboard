'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, 'dist');
const PORT = Number(process.env.PORT) || 10000;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end();
    return;
  }

  let requestedPath;
  try {
    requestedPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }

  if (requestedPath === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(req.method === 'HEAD' ? undefined : 'ok');
    return;
  }
  if (requestedPath === '/en') {
    res.writeHead(308, { Location: '/en/' });
    res.end();
    return;
  }
  if (requestedPath === '/index-3.html') {
    res.writeHead(302, { Location: '/' });
    res.end();
    return;
  }

  if (requestedPath.endsWith('/')) requestedPath += 'index.html';
  const filePath = path.resolve(ROOT, '.' + requestedPath);
  if (!filePath.startsWith(ROOT + path.sep)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  fs.readFile(filePath, (error, contents) => {
    if (error) {
      res.writeHead(error.code === 'ENOENT' || error.code === 'EISDIR' ? 404 : 500);
      res.end('Not found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    });
    res.end(req.method === 'HEAD' ? undefined : contents);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Kelly Talent Dashboard ready on port ' + PORT);
});

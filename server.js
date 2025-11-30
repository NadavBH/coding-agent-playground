import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const distPath = path.resolve(__dirname, 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm',
};

const server = http.createServer((req, res) => {
  // Parse URL and decode the pathname to handle encoded characters
  const parsedUrl = url.parse(req.url);
  const decodedPath = decodeURIComponent(parsedUrl.pathname);
  
  // Normalize the path and remove leading slash for safe resolution
  const normalizedPath = path.normalize(decodedPath).replace(/^\/+/, '');
  
  // Resolve the file path within the dist directory
  let filePath = path.resolve(distPath, normalizedPath);
  
  // Security check: ensure the resolved path is within distPath
  // Use path.relative to check if the path escapes the base directory
  const relativePath = path.relative(distPath, filePath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    res.writeHead(403, { 'Content-Type': 'text/html' });
    res.end('<h1>403 - Forbidden</h1>', 'utf-8');
    return;
  }

  // If path is a directory (empty path or trailing slash), serve index.html
  if (normalizedPath === '' || filePath.endsWith('/') || filePath.endsWith(path.sep)) {
    filePath = path.join(distPath, normalizedPath, 'index.html');
  }

  // Get file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Try to serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // If file not found and it's not a known static file, serve index.html for SPA routing
      if (err.code === 'ENOENT' && !extname) {
        fs.readFile(path.join(distPath, 'index.html'), (err, content) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - Not Found</h1>', 'utf-8');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Not Found</h1>', 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

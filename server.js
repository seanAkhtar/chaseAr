const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 443; // Default HTTPS port

// SSL certificate
const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Test route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

// Start the server
httpsServer.listen(PORT, () => {
  console.log(`HTTPS Server running on port ${PORT}`);
});


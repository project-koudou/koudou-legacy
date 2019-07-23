const http = require('http');
const express = require('express');
const RED = require('node-red');

// Create an Express app
const app = express();

// Add a simple route for static content served from 'public'
app.use('/', express.static('public'));

// Create a server
const server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
const settings = {
  httpAdminRoot: '/red',
  httpNodeRoot: '/api',
  userDir: '.nodered/',
  functionGlobalContext: {} // enables global context
};

// Initialise the runtime with a server and settings
RED.init(server, settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot, RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot, RED.httpNode);

server.listen(9000);

// Start the runtime
RED.start();

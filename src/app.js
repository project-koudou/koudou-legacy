const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const swagger = require('feathers-swagger');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const app = express(feathers());
const history = require('connect-history-api-fallback');
const proxy = require('http-proxy-middleware');

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.urlencoded({ extended: true }));
// app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/demo-client', express.static('client/mobile-web'));
app.use('/demo-speaker', express.static('client/smartspeaker-web'));
const px = proxy({
  target: `${app.get('noderedBase')}`,
  changeOrigin: true,
  ws: true,
  pathRewrite: { '^/api/red/socket.io': '/socket.io', '^/api/red': '/api' }
});
app.use('/api/red', px);
const px2 = proxy({
  target: `${app.get('noderedBase')}`,
  changeOrigin: true,
});
app.use('/red', px2);
app.use(history());
app.use('/demo-client', express.static('client/mobile-web'));
app.use('/demo-speaker', express.static('client/smartspeaker-web'));
app.use('/', express.static(app.get('frontend')));
// app.get('/', function (req, res) {
//   res.redirect('/docs');
// });

app.use('/api/red', px);
app.use('/red', px2);

app.use(express.json());

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());
app.configure(
  swagger({
    openApiVersion: 3,
    docsPath: '/docs',
    uiIndex: true,
    specs: {
      info: {
        title: 'service-backend',
        description: 'The service backend',
        version: '0.1.0'
      }
    }
  })
);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;

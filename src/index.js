/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
// const proxy = require('http-proxy-middleware');
// const px = proxy({
//   target: `${app.get('noderedBase')}`,
//   // changeOrigin: true,
//   ws: true,
//   pathRewrite: { '^/api/red/socket.io': '/socket.io' }
// });
// app.use('/api/red', px);
const server = app.listen(port);
// server.on('upgrade', px.upgrade);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info(
    'Feathers application started on http://%s:%d',
    app.get('host'),
    port
  )
);

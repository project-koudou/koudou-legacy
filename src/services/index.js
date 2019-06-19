const hr = require('./hr/hr.service.js');
const item = require('./item/item.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(hr);
  app.configure(item);
};

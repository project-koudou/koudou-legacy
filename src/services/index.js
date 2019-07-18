const hr = require('./hr/hr.service.js');
const item = require('./item/item.service.js');
const users = require('./users/users.service.js');
const plan = require('./plan/plan.service.js');
const feed = require('./feed/feed.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(hr);
  app.configure(item);
  app.configure(users);
  app.configure(plan);
  app.configure(feed);
};

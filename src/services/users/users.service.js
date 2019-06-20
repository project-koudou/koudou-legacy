// Initializes the `users` service on path `/users`
const createService = require('feathers-nedb');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
const definitions = require('./users.definitions');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  const users = createService(options);
  users.id = "_id";
  users.docs = definitions;
  app.use('/api/users', users);

  // Get our initialized service so that we can register hooks
  const service = app.service('api/users');

  service.hooks(hooks);
};

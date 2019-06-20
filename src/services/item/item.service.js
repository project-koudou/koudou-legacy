// Initializes the `item` service on path `/item`
const createService = require('feathers-nedb');
const createModel = require('../../models/item.model');
const hooks = require('./item.hooks');
const definitions = require('./item.definitions');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  const item = createService(options);
  item.id = "_id";
  item.docs = definitions;
  app.use('/api/item', item);

  // Get our initialized service so that we can register hooks
  const service = app.service('api/item');

  service.hooks(hooks);
};

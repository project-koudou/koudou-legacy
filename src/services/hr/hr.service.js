// Initializes the `hr` service on path `/api/hr`
const createService = require('feathers-nedb');
const createModel = require('../../models/hr.model');
const hooks = require('./hr.hooks');
const definitions = require('./hr.definitions');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    id: 'clientId'
  };

  // Initialize our service with any options it requires
  const hr = createService(options);
  hr.id = 'clientId';
  hr.docs = definitions;
  app.use('/api/person', hr);

  // app.use('/api/person', {
  //   async find(req, params) {
  //     // let id = req.route.id;
  //     console.log(req, params);
  //     app.authenticate()
  //     let resp = await app.service('api/feed').get(req.query);
  //     console.log(resp);
  //     // let plan = resp;
  //     // plan._meta.status += 1;
  //     // app.service('api/plan').patch(id, plan);
  //     // return { status: plan._meta.status };
  //   }
  // });

  // Get our initialized service so that we can register hooks
  const service = app.service('api/person');

  service.hooks(hooks);
};

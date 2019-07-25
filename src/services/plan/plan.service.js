// Initializes the `plan` service on path `/api/plan`
const createService = require('feathers-nedb');
const createModel = require('../../models/plan.model');
const hooks = require('./plan.hooks');

const fs = require('fs');
const jsonata = require('jsonata');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    id: 'id'
  };

  // Initialize our service with any options it requires
  app.use('/api/plan', createService(options));

  app.use('/api/plan/:id/next', {
    async find(req, params) {
      let id = req.route.id;
      console.log(id, 'next');
      let resp = await app.service('api/plan').get(id);
      let plan = resp;
      plan._meta.status += 1;
      app.service('api/plan').patch(id, plan);
      return { status: plan._meta.status };
    }
  });

  app.use('/api/plan/:id/complete', {
    async find(req, params) {
      let id = req.route.id;
      console.log(id, 'complete');
      let resp = await app.service('api/plan').get(id);
      let plan = resp;
      plan._meta.status = 0;
      app.service('api/plan').patch(id, plan);
      return { status: plan._meta.status };
    }
  });

  app.use('/api/_plan', {
    async find(params) {},
    async get(id, params) {
      if (id === 'templates') {
        return JSON.parse(
          fs.readFileSync('data/default/templates.json')
        );
      } else if (id === 'blocks') {
        return JSON.parse(fs.readFileSync('data/default/blocks.json'));
      } else if (id === 'flow') {
        // console.log(params);
        let resp = await app.service('api/plan').find();
        let plans = resp.data;
        // console.log(plans);
        let resAll = [];
        plans.forEach((json) => {
          // console.log(json);
          let filteredPhases = json;
          let subscribedTo = params.query.subscribedTo;
          filteredPhases.phases = json.phases.filter(phase => {
            return phase.trigger.subscribeTo.endpoint === subscribedTo;
          });
          if (subscribedTo === '/nrf/checkpoint/complete') {
            console.log(params.query.phaseId);
            filteredPhases.phases = filteredPhases.phases.filter(phase => {
              return (
                phase.trigger.subscribeTo.params.phaseId ===
                params.query.phaseId
              );
            });
          }
          let query = `$append([], phases.blocks.{
            "endpoint": "http://localhost:9000/api" & endpoint,
            "payload": {
              "id": $$.id,
              "params": params,
              "output": output
            }
          })`;
          let res1 = jsonata(query).evaluate(filteredPhases);
          query = `$append([], phases.{
            "endpoint": "http://localhost:9000/api" & complete.invoke.endpoint,
            "payload": {
              "id": $$.id,
              "params": complete.invoke.params,
              "output": complete.invoke.output
            }
          })`;
          let res2 = jsonata(query).evaluate(filteredPhases);
          console.log('res1', res1);
          console.log('res2', res2);
          let res = res1.concat(res2);
          resAll = resAll.concat(res);
        });
        console.log(resAll);
        return resAll;
      } else {
        return {};
      }
    }
  });

  // Get our initialized service so that we can register hooks
  const service = app.service('api/plan');

  service.hooks(hooks);
};

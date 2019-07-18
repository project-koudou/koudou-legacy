// Initializes the `plan` service on path `/api/plan`
const createService = require('feathers-nedb');
const createModel = require('../../models/plan.model');
const hooks = require('./plan.hooks');

const fs = require('fs');
const path = require('path');
const jsonata = require('jsonata');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/plan', createService(options));

  app.use('/api/_plan', {
    async find (params) {
    },
    async get (id, params) {
      if (id === "templates") {
        return JSON.parse(fs.readFileSync('plan-backend/default/templates.json'));
      }
      else if (id === "blocks") {
        return JSON.parse(fs.readFileSync('plan-backend/default/blocks.json'));
      }
      else if (id === "plan1") {
        return JSON.parse(fs.readFileSync('plan-backend/default/plan1.json'));
      }
      else if (id === "flow") {
        // console.log(params);
        let json = JSON.parse(fs.readFileSync('plan-backend/default/plan1.json'));
        let filteredPhases = json;
        let subscribedTo = params.query.subscribedTo;
        filteredPhases.phases = json.phases.filter(phase => {
          return phase.trigger.subscribeTo.endpoint === subscribedTo;
        })
        if (subscribedTo === "/nrf/checkpoint/complete") {
          console.log(params.query.phaseId);
          filteredPhases.phases = filteredPhases.phases.filter(phase => {
            return phase.trigger.subscribeTo.params.phaseId === params.query.phaseId;
          })
        }
        let query = `phases.blocks.{
          "endpoint": "http://localhost:9000/api" & endpoint,
          "payload": {
            "id": $$.id,
            "params": params,
            "output": output
          }
        }`;
        let res1 = jsonata(query).evaluate(filteredPhases);
        query = `phases.{
          "endpoint": "http://localhost:9000/api" & complete.invoke.endpoint,
          "payload": {
            "id": $$.id,
            "params": complete.invoke.params,
            "output": complete.invoke.output
          }
        }`;
        let res2 = jsonata(query).evaluate(filteredPhases);
        let res = res1.concat(res2)
        return res;
      }
      else {
        return {};
      }
    }
  });

  // Get our initialized service so that we can register hooks
  const service = app.service('api/plan');

  service.hooks(hooks);
};

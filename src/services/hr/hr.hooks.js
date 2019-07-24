const { authenticate } = require('@feathersjs/authentication').hooks;
const { unless, disallow } = require('feathers-hooks-common');
const tokenAuth = require('../../hooks/tokenAuth');
const { validateSchema, alterItems } = require('feathers-hooks-common');
const Ajv = require('ajv');
const _ = require('lodash');

const createSchema = require('./hr.definitions').definitions.person;

const findProxy = async context => {
  let _params = context.params;
  let resp = await context.app
    .service('api/feed')
    .find(Object.assign(_params, { query: { $select: ['clientId'] } }));
  let people = _.uniqBy(resp.data, 'clientId');
  // console.log(people);
  let res = await Promise.all(
    people.map(async v => {
      _params = Object.assign({}, context.params);
      Object.assign(_params, {
        query: {
          clientId: v.clientId,
          $select: ['location'],
          $sort: { date: -1 }
        }
      });
      let msgs = (await context.app
        .service('api/feed')
        .find(
          _params
        )).data;
      const location = msgs.length > 0 ? msgs[0].location : null;
      // console.log(v.clientId, msgs, v.name, location);
      return {
        clientId: v.clientId,
        name: v.name,
        location: location
      };
    })
  );
  console.log(res);
  resp.data = res;
  // console.log(context.result);
  context.result = resp;
  return context;
};

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), unless(tokenAuth(), disallow())],
    get: [authenticate('jwt'), unless(tokenAuth(), disallow())],
    create: [validateSchema(createSchema, Ajv)],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [findProxy],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

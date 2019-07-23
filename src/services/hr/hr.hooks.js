const { authenticate } = require('@feathersjs/authentication').hooks;
const { unless, disallow } = require('feathers-hooks-common');
const tokenAuth = require('../../hooks/tokenAuth');
const { validateSchema, alterItems } = require('feathers-hooks-common');
const Ajv = require('ajv');
const _ = require('lodash');

const createSchema = require('./hr.definitions').definitions.person;

const findProxy = async context => {
  let resp = await context.app
    .service('api/feed')
    .find(Object.assign(context.params, { query: { $select: ['clientId'] } }));
  let people = _.uniqBy(resp.data, 'clientId');
  // console.log(people);
  let res = await Promise.all(people.map(async v => {
    let location = (await context.app
      .service('api/feed')
      .find(
        Object.assign(context.params, {
          query: { clientId: v.clientId, $select: ['location'], $sort: { date: -1 } }
        })
      )).data.filter(x => 'location' in x)[0].location;
    return {
      clientId: v.clientId,
      name: v.name,
      location: location
    };
  }));
  resp.data = res;
  // console.log(res);
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

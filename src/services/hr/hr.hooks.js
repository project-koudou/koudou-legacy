const { authenticate } = require('@feathersjs/authentication').hooks;
const { unless, disallow } = require('feathers-hooks-common');
const tokenAuth = require('../../hooks/tokenAuth');
const { validateSchema } = require('feathers-hooks-common');
const Ajv = require('ajv');

const createSchema = require('./hr.definitions').definitions.person;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [unless(tokenAuth(), disallow())],
    get: [unless(tokenAuth(), disallow())],
    create: [validateSchema(createSchema, Ajv)],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
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

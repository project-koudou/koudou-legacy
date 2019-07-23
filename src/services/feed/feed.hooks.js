const { authenticate } = require('@feathersjs/authentication').hooks;
const { unless, disallow } = require('feathers-hooks-common');
const tokenAuth = require('../../hooks/tokenAuth');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), unless(tokenAuth(), disallow())],
    get: [authenticate('jwt'), unless(tokenAuth(), disallow())],
    create: [],
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

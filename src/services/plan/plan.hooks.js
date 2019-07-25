const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  associateCurrentUser,
  restrictToOwner
} = require('feathers-authentication-hooks');
// const { unless } = require('feathers-hooks-common');
// const tokenAuth = require('../../hooks/tokenAuth');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [restrictToOwner({ idField: 'email', ownerField: 'userId' })],
    get: [restrictToOwner({ idField: 'email', ownerField: 'userId' })],
    create: [associateCurrentUser({ idField: 'email', as: 'userId' })],
    update: [restrictToOwner({ idField: 'email', ownerField: 'userId' })],
    patch: [restrictToOwner({ idField: 'email', ownerField: 'userId' })],
    remove: [restrictToOwner({ idField: 'email', ownerField: 'userId' })]
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

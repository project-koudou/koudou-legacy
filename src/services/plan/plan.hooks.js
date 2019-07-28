const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  associateCurrentUser,
  restrictToOwner
} = require('feathers-authentication-hooks');
const { fastJoin } = require('feathers-hooks-common');
// const tokenAuth = require('../../hooks/tokenAuth');

const planResolvers = {
  joins: {
    blockIdx: (...args) => async (plan, context) => {
      let idx = 0;
      plan.phases.forEach((phase, pIdx) => {
        phase.blocks.forEach((v, bIdx) => {
          if (
            plan.phases[pIdx].blocks[bIdx].output
              .map(x => x.endpoint)
              .includes('/nrf/output/demo_client')
          ) {
            plan.phases[pIdx].blocks[bIdx].params.idx = idx++;
          }
        });
      });
      return plan;
    }
  }
};

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
    find: [fastJoin(planResolvers, { blockIdx: true })],
    get: [fastJoin(planResolvers, { blockIdx: true })],
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

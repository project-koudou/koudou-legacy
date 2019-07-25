const { authenticate } = require('@feathersjs/authentication').hooks;
const { unless, disallow, fastJoin } = require('feathers-hooks-common');
const tokenAuth = require('../../hooks/tokenAuth');

const postResolvers = {
  joins: {
    name: (...args) => async (post, context) => {
      if (!('clientId' in post)) {
        return post;
      }
      let resp = await context.app.service('api/users').find({
        query: { email: post.clientId },
        paginate: false,
        authenticated: true
      });
      post.name =
        resp.length > 0 ? resp[0].name : 'Temporary user' + ` (${post.clientId})`;
        // console.log(post.name);
      return post;
    }
  }
};

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
    find: [fastJoin(postResolvers, { name: true })],
    get: [fastJoin(postResolvers, { name: true })],
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

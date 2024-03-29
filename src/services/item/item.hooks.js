const { validateSchema } = require("feathers-hooks-common");
const Ajv = require("ajv");

const createSchema = require("./item.definitions").definitions.item;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      validateSchema(createSchema, Ajv),
    ],
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

const { validateSchema } = require("feathers-hooks-common");
const Ajv = require("ajv");

const createSchema = {
  "properties": {
    "itemName": { "type": "string" },
    "url": { "type": "string" },
    "tags": { "type": "array" },
    "count": { "type": "integer", "minimum": 0 },
    "location": { "type": "array" },
  },
  required: ["itemName", "url", "tags", "count", "location"],
  additionalProperties: false,
};

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

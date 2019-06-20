module.exports = {
  "description": "A service to manage human resources",
  "idType": "string",
  "definitions": {
    "hr": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "The name"
        },
        "status": {
          "type": "string",
          "description": "The status"
        },
      },
      "required": ["name", "status"],
      "additionalProperties": false,
    },
    "hr_response": {
      "allOf": [
        {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "description": "The ID"
            },
          },
        },
        { $ref: "#/components/schemas/hr" }
      ],
    },
    "hr_list": {
      "type": "array",
      "items": { $ref: "#/components/schemas/hr" }
    },
  },
  "refs": {
    "getResponse": "hr_response",
    "createResponse": "hr_response",
    "updateResponse": "hr_response",
    "patchResponse": "hr_response",
    "removeResponse": "hr_response",
  }
};

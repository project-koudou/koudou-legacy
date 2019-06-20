module.exports = {
  "description": "A service for authentication",
  "idType": "string",
  "definitions": {
    "users": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "name"
        },
        "email": {
          "type": "string",
          "description": "Email"
        },
        "password": {
          "type": "string",
          "description": "Password"
        },
        "organization": {
          "type": "string",
          "description": "Organization"
        },
        "role": {
          "type": "string",
          "description": "Role"
        },
      },
      "required": ["name", "email", "password", "organization", "role"],
      "additionalProperties": false,
    },
    "users_response": {
      "allOf": [
        {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "description": "ID"
            },
          },
        },
        { $ref: "#/components/schemas/users" }
      ],
    },
    "users_list": {
      "type": "array",
      "items": { $ref: "#/components/schemas/users" }
    },
  },
  "refs": {
    "getResponse": "users_response",
    "createResponse": "users_response",
    "updateResponse": "users_response",
    "patchResponse": "users_response",
    "removeResponse": "users_response",
  }
};

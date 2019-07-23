module.exports = {
  description: 'A service to manage human resources',
  idType: 'string',
  definitions: {
    person: {
      type: 'object',
      properties: {
        clientId: {
          type: 'string',
          description: 'Client ID'
        },
        name: {
          type: 'string',
          description: 'Name'
        },
        status: {
          type: 'string',
          description: 'Status'
        },
        location: {
          type: 'object',
          properties: {
            placeName: {
              type: 'string',
              description: 'Place Name'
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp'
            },
            latitude: {
              type: 'number',
              description: 'Latitude'
            },
            longitude: {
              type: 'number',
              description: 'Longitude'
            }
          }
        }
      },
      required: ['clientId'],
      additionalProperties: false
    },
    person_response: {
      allOf: [
        {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID'
            }
          }
        },
        { $ref: '#/components/schemas/person' }
      ]
    },
    person_list: {
      type: 'array',
      items: { $ref: '#/components/schemas/person' }
    }
  },
  refs: {
    getResponse: 'person_response',
    createResponse: 'person_response',
    updateResponse: 'person_response',
    patchResponse: 'person_response',
    removeResponse: 'person_response'
  }
};

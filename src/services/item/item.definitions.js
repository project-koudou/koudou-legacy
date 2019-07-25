module.exports = {
  description: 'A service to manage items',
  idType: 'string',
  definitions: {
    item: {
      type: 'object',
      properties: {
        itemName: {
          type: 'string',
          description: ''
        },
        url: {
          type: 'string',
          description: ''
        },
        tags: {
          type: 'array',
          description: '',
          items: {
            type: 'string'
          }
        },
        count: {
          type: 'integer',
          description: '',
          minimum: 0
        },
        location: {
          type: 'object',
          properties: {
            placeName: {
              type: 'string',
              description: ''
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
      required: ['itemName', 'url', 'tags', 'count', 'location'],
      additionalProperties: false
    },
    item_response: {
      allOf: [
        {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The ID'
            }
          }
        },
        { $ref: '#/components/schemas/item' }
      ]
    },
    person_list: {
      type: 'array',
      items: { $ref: '#/components/schemas/item' }
    }
  },
  refs: {
    getResponse: 'item_response',
    createResponse: 'item_response',
    updateResponse: 'item_response',
    patchResponse: 'item_response',
    removeResponse: 'item_response'
  }
};

const app = require('../../src/app');

describe('\'item\' service', () => {
  it('registered the service', () => {
    const service = app.service('item');
    expect(service).toBeTruthy();
  });
});

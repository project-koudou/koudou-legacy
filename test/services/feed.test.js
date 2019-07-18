const app = require('../../src/app');

describe('\'feed\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/feed');
    expect(service).toBeTruthy();
  });
});

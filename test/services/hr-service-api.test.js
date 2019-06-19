const app = require('../../src/app');

describe('\'hr\' service', () => {
  it('registered the service', () => {
    const service = app.service('hr');
    expect(service).toBeTruthy();
  });
});

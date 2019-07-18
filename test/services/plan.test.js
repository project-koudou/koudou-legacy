const app = require('../../src/app');

describe('\'plan\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/plan');
    expect(service).toBeTruthy();
  });
});

const app = require('../src/app');
const users = require('../fixture/users.json');

users.forEach(v => {
  console.log(v);
  app.service('api/users').create(v);
});

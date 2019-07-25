const app = require('../src/app');
const data = require('../fixture/item.json');

data.forEach(v => {
  console.log(v);
  app.service('api/item').create(v);
});

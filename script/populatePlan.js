const app = require('../src/app');
const plan1 = require('../fixture/plan1.json');

(async () => {
  let user1 = await app.service('api/users').get('demo1@example.com');
  console.log(user1);
  app.service('api/plan').create(plan1, { user1 });
})();

import Vue from 'vue';
import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import App from './App.vue';
import router from './router';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (!window.$client) {
    window.$client = feathers();
    const socket = io();
    $client.configure(feathers.socketio(socket));
    $client.configure(feathers.authentication({ storage: window.localStorage }));
  }
  if (to.matched.some(record => !record.meta.isPublic)) {
    $client
      .authenticate()
      .then(() => {
        next();
      })
      .catch(() => {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
      });
  } else {
    next();
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

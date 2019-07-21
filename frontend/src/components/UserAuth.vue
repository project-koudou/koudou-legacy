<template>
  <div class="card">
    <div class="card-content" v-if="!loggedIn">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="email" v-model="input.email" placeholder="Email" />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" v-model="input.password" placeholder="Password" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <label class="checkbox">
            <input type="checkbox" v-model="isOperator">
            Login as an <b>operator</b>
          </label>
        </p>
      </div>
      <div class="field" v-if="isOperator">
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="Operator Token" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button v-on:click="login()" class="button is-success is-fullwidth">Login</button>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-text is-fullwidth">Register</button>
        </p>
      </div>
    </div>
    <div class="card-content" v-else>
      <div class="field">
        <p class="control has-text-centered">
          <button v-on:click="logout()" class="button is-light">Logout</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-auth',
  data() {
    return {
      input: {
        email: 'taro@example.com',
        password: 'taro',
      },
      isOperator: false,
      message: '',
      loggedIn: false,
    };
  },
  methods: {
    async login() {
      this.message = '';
      try {
        if (this.input.username !== '' && this.input.password !== '') {
          const credentials = Object.assign({ strategy: 'local' }, this.input);
          const resp = await $client.authenticate(credentials);
          const payload = await $client.passport.verifyJWT(resp.accessToken);
          console.log(payload);
          const info = await $client.service('api/users').get(payload.userId);
          console.log(info);
          this.message = JSON.stringify(info, null, '  ');
          this.loggedIn = true;
          if (this.isOperator) {
            this.$router.push('/op/dashboard');
          } else {
            this.$router.push('/dashboard');
          }
        } else {
          // await $client.authenticate()
        }
      } catch (error) {
        this.message = error.message;
      }
    },
    async logout() {
      await $client.logout();
      this.message = '';
      this.loggedIn = false;
    },
  },
  async mounted() {
    const resp = await $client.authenticate();
    console.log(resp);
    const payload = await $client.passport.verifyJWT(resp.accessToken);
    const info = await $client.service('api/users').get(payload.userId);
    this.message = JSON.stringify(info, null, '  ');
    this.loggedIn = true;
  },
};
</script>

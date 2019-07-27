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
            <input
              type="checkbox"
              v-model="isOperator"
              :change="input = (isOperator ? demoOperator : demoUser)"
            />
            Login as <b>operator</b>
          </label>
        </p>
      </div>
      <div class="field" v-if="isOperator">
        <p class="control has-icons-left">
          <input
            class="input"
            type="password"
            :value="isOperator ? demoOperator.operatorToken : ''"
            @change="input.operatorToken = $event.target.value"
            placeholder="Operator Token"
          />
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
        email: 'demo1@example.com',
        password: 'demo1',
        operatorToken: null,
      },
      demoOperator: {
        email: 'demo2@example.com',
        password: 'demo2',
        operatorToken: '1234',
      },
      demoUser: {
        email: 'demo1@example.com',
        password: 'demo1',
        operatorToken: null,
      },
      isOperator: false,
      message: '',
      loggedIn: false,
    };
  },
  methods: {
    async login() {
      this.message = '';
      console.log(this.input);
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
            localStorage.isOperator = JSON.stringify(true);
            localStorage.operatorToken = JSON.stringify(this.input.operatorToken);
            this.$router.push('/dashboard');
          } else {
            localStorage.isOperator = JSON.stringify(false);
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
  },
};
</script>

<template>
  <div class="card is-shadowless" style="border: none;">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <jazzicon :address="info.seed" :diameter="48" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ info.name }}</p>
          <p class="subtitle is-6">
            <div><b>{{ info.role }}</b></div>
            <div class="is-size-7">{{ info.email }}</div>
            </p>
        </div>
      </div>
      <div class="has-text-right">
        <a href="#" v-on:click="logout()" class="button is-text">
          <span class="icon">
            <i class="fas fa-sliders-h"></i>
          </span>
        </a>
        <a href="#" v-on:click="logout()" class="button is-light">Logout</a>
      </div>
      <div class="content has-text-centered" style="margin-top: 40px;">
        <p class="is-size-6 has-text-dark" style="margin-bottom: 0;">Setup mobile client:</p>
        <qrcode :value="mobileUrl" :options="{ width: 150 }"></qrcode>
        <p class="is-size-7"><a @click="isShowingSetups = true">More setups</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import crypto from 'crypto';
import Jazzicon from 'vue-jazzicon';
import VueQrcode from '@chenfengyuan/vue-qrcode';

export default {
  components: {
    [Jazzicon.name]: Jazzicon,
    [VueQrcode.name]: VueQrcode,
  },
  data() {
    return {
      message: '',
      info: {},
      mobileUrl: 'http://a602.local:3030/demo-client?host=a602.local:9000',
      isShowingSetups: false,
    };
  },
  methods: {
    async login() {
      this.message = '';
    },
    async logout() {
      await $client.logout();
      this.message = '';
      this.loggedIn = false;
      this.$router.push('/login');
    },
  },
  async mounted() {
    const resp = await $client.authenticate();
    const payload = await $client.passport.verifyJWT(resp.accessToken);
    const info = await $client.service('api/users').get(payload.userId);
    this.message = JSON.stringify(info, null, '  ');
    info.seed = crypto
      .createHash('sha1')
      .update(info.email)
      .digest('hex');
    this.info = info;
  },
};
</script>

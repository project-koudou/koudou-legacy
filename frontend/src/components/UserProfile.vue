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
        <!-- <a href="#" class="button is-text">
          <span class="icon">
            <i class="fas fa-sliders-h"></i>
          </span>
        </a> -->
        <a href="#" v-on:click="logout()" class="button is-light">Logout</a>
      </div>
      <div class="content has-text-centered" style="margin-top: 50px;">
        <div class="tag is-info is-rounded is-uppercase">
          Mobile client
        </div>
        <div>
          <qrcode :value="mobileUrl" :options="{ width: 150 }"></qrcode>
        </div>
        <div class="is-size-7"><a :href="this.mobileUrl" target="_blank">Link</a></div>
        <div class="is-size-7"><a @click="isShowingSetups = true">More setups...</a></div>
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
      mobileUrl: 'about:blank',
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
    const jwt = await $client.passport.getJWT();
    const payload = await $client.passport.verifyJWT(jwt);
    const info = await $client.service('api/users').get(payload.userId);
    this.message = JSON.stringify(info, null, '  ');
    info.seed = crypto
      .createHash('sha1')
      .update(info.email)
      .digest('hex');
    this.info = info;
    const plans = await $client.service('api/plan').find();
    console.log(plans.data);
    let planIds = JSON.stringify(plans.data.map(x => x.id));
    let host = location.host;
    console.log(host);
    this.mobileUrl = `http://${host}/demo-client?id=${this.info.email}&host=${host}&s=${planIds}`;
  },
};
</script>

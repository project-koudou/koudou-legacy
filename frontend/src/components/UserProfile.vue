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
          <div class="subtitle is-6">
            <div>
              <b>{{ info.role }}</b>
            </div>
            <div class="is-size-7">{{ info.email }}</div>
          </div>
        </div>
      </div>
      <div class="has-text-right">
        <!-- <a href="#" class="button is-text">
          <span class="icon">
            <i class="fas fa-sliders-h"></i>
          </span>
        </a>-->
        <div class="dropdown is-right" :class="{ 'is-active': isDropdownActive }" @click="isDropdownActive = !isDropdownActive">
          <div class="dropdown-trigger">
            <button class="button is-white" aria-haspopup="true" aria-controls="dropdown-menu">
              <span class="icon is-small">
                <i class="fas fa-ellipsis-h" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a v-on:click="logout()" class="dropdown-item">Logout</a>
            </div>
          </div>
        </div>
        <!-- <a href="#" v-on:click="logout()" class="button is-light">Logout</a> -->
      </div>
      <div class="content has-text-centered" style="margin-top: 50px;">
        <div class="tag is-info is-rounded is-uppercase">Mobile Assistant</div>
        <div>
          <a :href="this.mobileUrl" target="_blank">
            <qrcode :value="mobileUrl" :options="{ width: 150 }"></qrcode>
          </a>
        </div>
        <div class="is-size-7">
          <a :href="this.mobileUrl" target="_blank">Direct Link</a>
        </div>
        <div class="is-size-7">
          <a @click="toggleModal">More setups...</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import crypto from "crypto";
import Jazzicon from "vue-jazzicon";
import VueQrcode from "@chenfengyuan/vue-qrcode";

export default {
  components: {
    [Jazzicon.name]: Jazzicon,
    [VueQrcode.name]: VueQrcode
  },
  data() {
    return {
      message: "",
      info: {},
      mobileUrl: "about:blank",
      isShowingSetups: false,
      isDropdownActive: false,
    };
  },
  methods: {
    async login() {
      this.message = "";
    },
    async logout() {
      await $client.logout();
      this.message = "";
      this.loggedIn = false;
      this.$router.push("/login");
    },
    toggleModal() {
      this.$parent.$parent.modalOpen = !this.$parent.modalOpen;
    }
  },
  async mounted() {
    const jwt = await $client.passport.getJWT();
    const payload = await $client.passport.verifyJWT(jwt);
    const info = await $client.service("api/users").get(payload.userId);
    this.message = JSON.stringify(info, null, "  ");
    info.seed = crypto
      .createHash("sha1")
      .update(info.email)
      .digest("hex");
    this.info = info;
    const plans = await $client.service("api/plan").find();
    console.log(plans.data);
    let planIds = JSON.stringify(plans.data.map(x => x.id));
    let host = location.host;
    console.log(host);
    this.mobileUrl = `http://${host}/demo-client?id=${this.info.email}&host=${host}&s=${planIds}`;
  }
};
</script>

<style scoped>
.card .media {
  margin-bottom: 12px !important;
}
</style>

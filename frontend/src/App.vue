<template>
  <div id="app">
    <nav
      class="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
      v-if="['/login', '/register'].indexOf(this.$router.currentRoute.path) === -1"
    >
      <div class="navbar-brand">
        <span class="navbar-item">
          <router-link to="/">
            <h1 class="title is-4 has-text-white">KOUDOU</h1>
          </router-link>
        </span>
        <a
          role="button"
          @click="burgerOpen = !burgerOpen"
          class="navbar-burger"
          :class="{ 'is-active': burgerOpen }"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': burgerOpen }">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">
            <span class="icon">
              <i class="fas fa-home"></i>
            </span>&nbsp;
            Home
          </router-link>
          <router-link to="/plan-wizard" class="navbar-item">
            <span class="icon">
              <i class="fas fa-plus"></i>
            </span>&nbsp;
            Prepare a new plan
          </router-link>
          <a href="#" v-if="isOperator" class="navbar-item">
            <span class="icon">
              <i class="fas fa-project-diagram"></i>
            </span>&nbsp;
            Node-RED
          </a>
        </div>
      </div>
    </nav>
    <section class="section">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column">
            <transition mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
      </div>
    </section>
    <div class="modal" :class="{ 'is-active': modalOpen }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Optional Setups</p>
          <button @click="modalOpen = !modalOpen" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="content">
            <dl>
              <dt>Default Smart Speaker (Web Audio API based)</dt>
              <dd>
                Open
                <a :href="speakerUrl" target="_blank">the client</a> on your device with the audio input/output (e.g., Raspberry Pi +
                ReSpeaker 2-Mics Pi HAT).
              </dd>
            </dl>
          </div>
        </section>
        <footer class="modal-card-foot"></footer>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "app",
  data() {
    return {
      isOperator: JSON.parse(localStorage.isOperator),
      burgerOpen: false,
      modalOpen: false,
      speakerUrl: "",
    };
  },
  async updated() {
    this.isOperator = JSON.parse(localStorage.isOperator);
    const plans = await $client.service("api/plan").find();
    console.log(plans.data);
    let planIds = JSON.stringify(plans.data.map(x => x.id));
    let host = location.host;
    console.log(host);
    this.speakerUrl = `http://${host}/demo-speaker?host=${host}&s=${planIds}`;
},
  async mounted() {
    // const plans = await $client.service("api/plan").find();
    // console.log(plans.data);
    // let planIds = JSON.stringify(plans.data.map(x => x.id));
    // let host = location.host;
    // console.log(host);
    // this.speakerUrl = `http://${host}/demo-speaker?host=${host}&s=${planIds}`;
  }
};
</script>

<style lang="scss">
$message-background-color: #fcfcfc;

@import "../node_modules/bulma/bulma.sass";
@import "../node_modules/bulma-o-steps/bulma-steps.sass";
@import "../node_modules/bulma-switch/dist/css/bulma-switch.sass";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app > .navbar {
  // border-top: 3px solid #3273dc;
  // border-bottom: 1px solid rgba(0, 40, 100, 0.12);
}

.navbar-item:focus {
  background-color: transparent !important;
}

.button {
  justify-content: center;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s;
  transition-timing-function: ease;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

@page {
  size: A4;
  margin: 5mm;
  margin-top: 20mm;
}

@media print {
  .navbar,
  .column-leftside,
  .buttons,
  .breadcrumb,
  .content-output {
    display: none;
  }
  .column-main .card {
    box-shadow: none;
    border: none;
  }
  .card-content {
    margin: 0;
    padding: 0;
  }
  .steps-marker {
    // page-break-inside: avoid-page;
    // break-inside: avoid-page;
    // page-break-before: always;
    // break-before: always;
    background-color: #23d160 !important;
  }
  .steps-segment::after {
    background-color: #23d160 !important;
  }
  .message {
    page-break-inside: avoid-page;
    break-inside: avoid-page;
    // page-break-before: always;
    // break-before: always;
    // zoom: 0.75;
  }
  .message .subtitle {
    margin-bottom: 0 !important;
  }
  body {
    -webkit-print-color-adjust: exact;
    zoom: 0.75;
  }
}
</style>

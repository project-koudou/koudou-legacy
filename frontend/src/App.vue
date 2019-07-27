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
          <router-link to="/"><h1 class="title is-4 has-text-white">KOUDOU flow</h1></router-link>
        </span>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu">
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
  </div>
</template>

<style lang="scss">
$message-background-color: #fcfcfc;

@import "../node_modules/bulma/bulma.sass";
@import "../node_modules/bulma-o-steps/bulma-steps.sass";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.button {
  justify-content: center;
}

.v-enter-active, .v-leave-active {
  transition: opacity .1s;
  transition-timing-function: ease;
}

.v-enter, .v-leave-to {
  opacity: 0;
}
</style>

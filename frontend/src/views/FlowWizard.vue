<template>
  <div>
    <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
      <ul>
        <li :class="{ 'is-active': this.$router.currentRoute.path == '/plan-wizard/select' }">
          <router-link to="/plan-wizard/select">Select a plan template</router-link>
        </li>
        <li :class="{ 'is-active': this.$router.currentRoute.path == '/plan-wizard/describe' }">
          <a href="#">Name & describe your plan</a>
        </li>
        <li>
          <a href="#">Edit and save the plan</a>
        </li>
      </ul>
    </nav>
    <transition name="wizard" mode="out-in">
      <router-view name="step"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  },
  async mounted() {
    // this.$router.addRoutes
  },
};
</script>

<style>
/* .wizard-enter-active, .wizard-leave-active {
  transform: translate(0px, 0px);
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
} */

/* .wizard-enter, .wizard-leave-to { */
/* transform: translateX(-100vw) translateX(0px); */
/* transform: translateY(100vh) translateY(0px); */
/* } */

.wizard-enter-active,
.wizard-leave-active {
  transition-duration: 0.2s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.wizard-enter {
  opacity: 0;
  transform: translate(2em, 0);
}

.wizard-leave-to {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>

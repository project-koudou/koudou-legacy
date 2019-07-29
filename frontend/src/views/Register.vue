<template>
  <div class="container has-text-centered" style="max-width: 360px;">
    <h1 class="title is-3">KOUDOU</h1>
    <user-register></user-register>
  </div>
</template>

<script>
import UserRegister from '@/components/UserRegister.vue';

export default {
  components: {
    UserRegister,
  },
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style lang="sass" scoped>
</style>

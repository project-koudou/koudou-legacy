<template>
  <div class="container has-text-centered" style="max-width: 360px;">
    <h1 class="title is-3">KOUDOU</h1>
    <user-auth></user-auth>
  </div>
</template>

<script>
import UserAuth from '@/components/UserAuth.vue';

export default {
  components: {
    UserAuth,
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

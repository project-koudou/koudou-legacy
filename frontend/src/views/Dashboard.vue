<template>
  <div class="columns">
    <div class="column is-3">
      <aside class="menu">
        <user-profile></user-profile>
      </aside>
    </div>
    <div class="column">
      <transition>
        <router-view name="view"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UserProfile from '@/components/UserProfile.vue'

export default {
  name: 'dashboard',
  components: {
    UserProfile,
  },
}
</script>

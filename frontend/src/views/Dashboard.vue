<template>
  <div class="columns">
    <div class="column is-3 column-leftside">
      <aside class="menu">
        <user-profile></user-profile>
      </aside>
    </div>
    <div class="column column-main">
      <transition>
        <router-view name="view"></router-view>
      </transition>
    </div>
    <div v-if="isOperator" class="column is-2">
      <aside class="menu">
        <p class="menu-label has-text-centered">Operations</p>
        <ul class="menu-list">
          <li>
            <router-link to="/feed">
              <span class="icon is-large">
                <i class="fas fa-2x fa-stream"></i>
              </span>
              <span class="is-size-6">Feed</span>
            </router-link>
          </li>
          <li>
            <router-link to="/control">
              <span class="icon is-large">
                <i class="fas fa-2x fa-directions"></i>
              </span>
              <span class="is-size-6">Control</span>
            </router-link>
          </li>
          <li>
            <router-link to="/person">
              <span class="icon is-large">
                <i class="fas fa-2x fa-user-friends"></i>
              </span>
              <span class="is-size-6">Person</span>
            </router-link>
          </li>
          <li>
            <router-link to="/item">
              <span class="icon is-large">
                <i class="fas fa-2x fa-box"></i>
              </span>
              <span class="is-size-6">Item</span>
            </router-link>
          </li>
          <!-- <li>
            <router-link to="/cabinet">
              <span class="icon is-large">
                <i class="fas fa-2x fa-file-alt"></i>
              </span>
              <span class="is-size-6">Cabinet</span>
            </router-link>
          </li> -->
          <li>
            <router-link to="/map">
              <span class="icon is-large">
                <i class="fas fa-2x fa-map-marked"></i>
              </span>
              <span class="is-size-6">Map</span>
            </router-link>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UserProfile from '@/components/UserProfile.vue';

export default {
  name: 'dashboard',
  components: {
    UserProfile,
  },
  data() {
    return {
      isOperator: false,
    };
  },
  methods: {
  },
  mounted() {
    this.isOperator = JSON.parse(localStorage.isOperator);
  },
};
</script>

<style scoped>
.menu-list > li > a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.menu-list > li > a > .icon {
  margin-right: 4px;
}
</style>

<template>
  <div class="columns">
    <div class="column is-3">
      <aside class="menu">
        <div style="margin-bottom: 30px;">
          <app-users-profile></app-users-profile>
        </div>
        <p class="menu-label has-text-centered">Apps</p>
        <ul class="menu-list">
          <li>
            <router-link to="/feed">
              <span class="icon is-large"><i class="fas fa-2x fa-stream"></i></span>
              <span class="is-size-6">Feed</span>
            </router-link>
          </li>
          <li>
            <router-link to="/person">
              <span class="icon is-large"><i class="fas fa-2x fa-user-friends"></i></span>
              <span class="is-size-6">Person</span>
            </router-link>
          </li>
          <li>
            <router-link to="/item">
              <span class="icon is-large"><i class="fas fa-2x fa-box"></i></span>
              <span class="is-size-6">Item</span>
            </router-link>
          </li>
          <li>
            <router-link to="/cabinet">
              <span class="icon is-large"><i class="fas fa-2x fa-file-alt"></i></span>
              <span class="is-size-6">Cabinet</span>
            </router-link>
          </li>
          <li>
            <router-link to="/map">
              <span class="icon is-large"><i class="fas fa-2x fa-map-marked"></i></span>
              <span class="is-size-6">Map</span>
            </router-link>
          </li>
          <li>
            <router-link to="/control">
              <span class="icon is-large"><i class="fas fa-2x fa-directions"></i></span>
              <span class="is-size-6">Control</span>
            </router-link>
          </li>
        </ul>
      </aside>
    </div>
    <div class="column">
        <app-flow-list></app-flow-list>
    </div>
  </div>
</template>

<style>
.menu-list > li > a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  /* height: 60px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 40, 100, 0.12);
  border-radius: 3px;
  margin: 10px 0; */
}
.menu-list > li > a > .icon {
  margin-right: 4px;
}
</style>

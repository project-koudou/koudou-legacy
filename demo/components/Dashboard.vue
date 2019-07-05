<template>
  <div class="columns">
    <div class="column is-3">
      <aside class="menu">
        <div>
            <app-users-profile></app-users-profile>
        </div>
        <p class="menu-label">General</p>
        <ul class="menu-list">
          <li>
            <a>Dashboard</a>
          </li>
        </ul>
        <p class="menu-label">Apps</p>
        <ul class="menu-list">
          <li>
            <a>Person</a>
          </li>
          <li>
            <a>Item</a>
          </li>
          <li>
            <a>Cabinet</a>
          </li>
        </ul>
      </aside>
    </div>
    <div class="column">
        <app-flow-list></app-flow-list>
    </div>
  </div>
</template>

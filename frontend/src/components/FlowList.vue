<template>
  <div class="box is-shadowless">
    <div
      class="box is-shadowless tile is-vertical is-ancestor"
      style="padding: 10px; padding-top: 0px; margin-bottom: 20px; border-radius: 4px;"
    >
      <h4 class="title is-4">Ongoing</h4>
      <router-link to="flow" tag="div" class="tile is-child card flow">
        <div class="card-header is-shadowless">
          <p class="card-header-title">Response Plan for Earthquake</p>
        </div>
        <div class="card-content">
          <ul class="steps is-thin has-content-centered">
            <li class="steps-segment">
              <span class="steps-marker"></span>
              <div class="steps-content">
                <p class="is-size-5">Preparation</p>
                <p></p>
              </div>
            </li>
            <li class="steps-segment">
              <span class="steps-marker"></span>
              <div class="steps-content">
                <p class="is-size-5">Alarm Events</p>
                <p></p>
              </div>
            </li>
            <li class="steps-segment is-active">
              <span class="steps-marker"></span>
              <div class="steps-content">
                <p class="is-size-5">Evacuation</p>
                <p></p>
              </div>
            </li>
            <li class="steps-segment">
              <span class="steps-marker"></span>
              <div class="steps-content">
                <p class="is-size-5">Evacuation Life</p>
                <p></p>
              </div>
            </li>
          </ul>
        </div>
      </router-link>
    </div>
    <div
      class="box is-shadowless tile is-vertical is-ancestor"
      style="padding: 10px; margin-bottom: 20px; border-radius: 4px;"
    >
      <h4 class="title is-4">In Preparation</h4>
      <div class="tile is-child card">
        <div class="card-header is-shadowless">
          <p class="card-header-title">Response Plan for Typhoon</p>
        </div>
        <div class="card-content">
          <ul class="steps is-thin has-content-centered">
            <li class="steps-segment is-active">
              <span class="steps-marker"></span>
              <div class="steps-content">
                <p class="is-size-5">Preparation</p>
                <p></p>
              </div>
            </li>
            <li class="steps-segment">
              <span class="steps-marker"></span>
              <div class="steps-content">
                <p class="is-size-5">Alarm Events</p>
                <p></p>
              </div>
            </li>
            <li class="steps-segment">
              <span class="steps-marker"></span>
              <div class="steps-content">
                <p class="is-size-5">Evacuation</p>
                <p></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="tile is-child card">
        <div class="card-header is-shadowless">
          <p class="card-header-title">Response Plan for Thunderstorm</p>
        </div>
        <div class="card-content">
          <ul class="steps is-thin has-content-centered">
            <li class="steps-segment is-active">
              <span class="steps-marker"></span>
              <div class="steps-content">
                <p class="is-size-5">Preparation</p>
                <p></p>
              </div>
            </li>
            <li class="steps-segment">
              <span class="steps-marker"></span>
              <div class="steps-content">
                <p class="is-size-5">Alarm Events</p>
                <p></p>
              </div>
            </li>
            <li class="steps-segment">
              <span class="steps-marker"></span>
              <div class="steps-content">
                <p class="is-size-5">Evacuation</p>
                <p></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    find(ev) {
    },
  },
  async mounted() {
    const items = await $client.service('api/item').find();
    this.items = items.data;
  },
};
</script>


<style scoped>
.card.flow:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}
</style>

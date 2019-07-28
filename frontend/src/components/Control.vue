<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link to="/">
            <span class="icon">
              <i class="fas fa-bars"></i>
            </span>Back to List
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="box">
      <section>
        <!-- <div class="field">
        <label class="label">Issue Alert</label>
        <p class="control">
          <button
            v-on:click="fetch('/api/red/nrf/trigger/panicbutton')"
            class="button is-danger is-fullwidth is-large is-rounded"
          ></button>
        </p>
        </div>-->
        <!-- <div class="field">
        <label class="label"></label>
        <p class="control">
          <button
            v-on:click="fetch('/api/red/nrf/checkpoint/pressbutton')"
            class="button is-danger is-fullwidth is-large is-rounded"
          >Go</button>
        </p>
        </div>-->
        <p class="title is-4">Response Operation Control</p>
        <div class="field">
          <input
            id="switchPanic"
            type="checkbox"
            name="switchPanic"
            class="switch is-danger is-medium"
            @change="fetch('/api/red/nrf/trigger/panicbutton')"
          />
          <label for="switchPanic">Issue New Alert</label>
        </div>
        <div class="field">
          <input
            id="switchNext"
            type="checkbox"
            name="switchNext"
            class="switch is-danger is-medium"
            @change="fetch('/api/red/nrf/checkpoint/pressbutton')"
          />
          <label for="switchNext">Evacuation Order / Step in Next Phase</label>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    fetch(url) {
      fetch(url, { headers: { Accept: "application/json" } });
    }
  },
  async mounted() {}
};
</script>

<template>
  <div class="box" style="width: 400px;">
    <section>
      <div class="field">
        <p class="control">
          <button
            v-on:click="fetch('http://localhost:9000/api/nrf/trigger/panicbutton')"
            class="button is-danger"
          >Panic</button>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button
            v-on:click="fetch('http://localhost:9000/api/nrf/checkpoint/pressbutton')"
            class="button is-danger"
          >Go</button>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    fetch(url) {
      fetch(url, { headers: { "Accept": "application/json" } });
    }
  },
  async mounted() {}
};
</script>

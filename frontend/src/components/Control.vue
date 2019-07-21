<template>
  <div class="box" style="width: 400px;">
    <section>
      <div class="field">
        <p class="control">
          <button
            v-on:click="fetch('http://localhost:9000/api/nrf/trigger/panicbutton')"
            class="button is-success"
          >Panic</button>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button
            v-on:click="fetch('http://localhost:9000/api/nrf/checkpoint/pressbutton')"
            class="button is-success"
          >Press</button>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button
            v-on:click="fetch('http://localhost:9000/api/nrf/checkpoint/complete')"
            class="button is-success"
          >(Dev) Complete</button>
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
      fetch(url);
    },
  },
  async mounted() {},
};
</script>

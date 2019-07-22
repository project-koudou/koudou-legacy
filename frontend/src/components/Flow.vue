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
    <div class="box is-shadowless tile is-vertical is-ancestor">
      <div class="tile is-child card">
        <div class="card-content">
          <p class="title">{{ name }}</p>
          <p class="content">{{ description }}</p>
          <div class="field is-grouped">
            <p class="control">
              <button v-on:click="testflow" class="button is-success">Simulate Plan</button>
            </p>
            <p class="control">
              <router-link tag="button" to="/flow-edit" class="button is-link">Edit</router-link>
            </p>
            <p class="control">
              <button v-on:click class="button is-light">Export as PDF</button>
            </p>
            <p class="control">
              <button v-on:click class="button is-light">Export as JSON</button>
            </p>
            <p class="control">
              <router-link tag="button" to="/flow-edit" class="button is-text">Remove</router-link>
            </p>
            <!-- <p class="control">
			<button v-on:click="" class="button is-link">Publish online</button>
            </p>-->
          </div>
        </div>
        <div class="card-content">
          <!-- <ul class="steps has-content-centered">
                <li class="steps-segment" v-for="step in flow">
                    <span class="steps-marker"></span>
                    <div class="steps-content">
                    <p class="is-size-4">{{ step.name }}</p>
                    <p></p>
                    </div>
                </li>
          </ul>-->
          <ul
            class="steps has-content-centered is-small is-vertical is-light"
            style=" position: relative; left: 25px;"
          >
            <template v-for="step in flow">
              <li class="steps-segment" v-if="step.trigger.name">
                <span class="steps-marker"></span>
                <div class="steps-content">
                  <p class="is-size-4">{{ step.trigger.name }}</p>
                  <div
                    style="margin: 10px 0px; position: relative; left: -50px; right: -50px; z-index: 9;"
                  >
                    <div
                      v-for="block in [step.trigger.subscribeTo]"
                      v-bind:class="['message', 'item', block.style]"
                    >
                      <div class="message-body">
                        <p class="title is-5">{{ block.name }}</p>
                        <p v-if="block.always" class="subtitle is-6 is-size-7">{{ block.always }}</p>
                        <p class="content"><span v-html="block.message"></span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="steps-segment">
                <span class="steps-marker"></span>
                <div class="steps-content">
                  <p class="is-size-4">{{ step.name }}</p>
                  <div style="margin: 10px 0px; position: relative; left: -50px; z-index: 9;">
                    <div
                      v-for="(block, idx) in step.blocks"
                      :key="block.id"
                      v-bind:class="['message', 'item', block.style]"
                    >
                      <div class="message-body">
                        <p class="title is-5">{{ block.name }}</p>
                        <p v-if="block.always" class="subtitle is-6 is-size-7">{{ block.always }}</p>
                        <p class="content"><span v-html="block.message"></span></p>
                        <p class="content">
                          <b>On:</b>
                          {{ block.output.map(x => x.name).join(' · ') }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </template>
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
      name: '',
      description: '',
      testTrigger: '',
      flow: [],
    };
  },
  methods: {
    find() {
    },
    testflow() {
      fetch(this.testTrigger);
    },
  },
  async mounted() {
    const resp = await fetch('//localhost:3030/api/_plan/plan1');
    const flow1 = await resp.json();
    this.name = flow1.name;
    this.description = flow1.description;
    this.testTrigger = flow1.testTrigger;
    this.flow = flow1.phases;
  },
};
</script>

<style scoped>
/* .message {
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
  cursor: default;
} */
.message,
.message-body {
  border-radius: 4px;
}
.message-body {
  border: none;
}
.message {
  box-shadow: none !important;
  border: 1px solid #dee2e6;
}
.steps:not(.is-hollow) .steps-marker:not(.is-hollow) {
  background-color: #23d160;
  color: #fff;
}
.steps-segment::after {
  background-color: #23d160;
}
</style>

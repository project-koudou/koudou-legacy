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
    <!-- <div class="box is-shadowless"> -->
      <div class="card">
        <div class="card-content">
          <p class="title is-size-5-mobile">{{ plan.name }}</p>
          <p class="content">{{ plan.description }}</p>
          <div class="buttons">
            <button v-on:click="testflow" class="button is-success">{{ simulateLabel }}</button>
            <button v-on:click="stopflow" class="button is-danger">Stop</button>
            <router-link tag="button" :to="editUrl" class="button is-link">Edit</router-link>
            <button @click="exportPDF" class="button is-light">Export as PDF</button>
            <button @click="exportJSON" class="button is-light">Export as JSON</button>
          </div>
        </div>
        <div class="card-content">
          <ul
            class="steps is-balanced has-content-centered is-small is-vertical"
            style=" position: relative; left: 25px;"
          >
            <template v-for="(phase, phaseIdx) in plan.phases">
              <li class="steps-segment" v-if="phase.trigger.name">
                <span class="steps-marker"></span>
                <div class="steps-content">
                  <p class="title is-4 is-size-5-mobile">{{ phase.trigger.name }}</p>
                  <div
                    style="margin: 10px 0px; position: relative; left: -50px; right: -50px; z-index: 9;"
                  >
                    <div
                      v-for="block in [phase.trigger.subscribeTo]"
                      v-bind:class="['message', 'item', block.style]"
                    >
                      <div class="message-body">
                        <p class="title is-5 is-size-6-mobile">{{ block.name }}</p>
                        <p v-if="block.always" class="subtitle is-6 is-size-7">{{ block.always }}</p>
                        <p class="content is-size-6-mobile">
                          <span v-html="block.message"></span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li
                class="steps-segment"
                :key="phaseIdx"
                :class="{ 'is-active': phaseIdx === plan._meta.status }"
              >
                <span class="steps-marker"></span>
                <div class="steps-content">
                  <p class="title is-4 is-size-5-mobile">{{ phase.name }}</p>
                  <div style="margin: 10px 0px; position: relative; left: -50px; z-index: 9;">
                    <div
                      v-for="(block, idx) in phase.blocks"
                      :key="block.id"
                      v-bind:class="['message', 'item', block.style]"
                    >
                      <div class="message-body">
                        <p class="title is-5 is-size-6-mobile">{{ block.name }}</p>
                        <p v-if="block.always" class="subtitle is-6 is-size-7">{{ block.always }}</p>
                        <p class="content">
                          <span v-html="block.message"></span>
                        </p>
                        <p class="content content-output is-size-7-mobile">
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
    <!-- </div> -->
  </div>
</template>

<script>
const { detect } = require("detect-browser");

export default {
  data() {
    return {
      plan: {},
      editUrl: "",
      simulateStatus: 0,
      simulateLabel: "Simulate This Plan"
    };
  },
  methods: {
    testflow() {
      let nextSimulateStatus =
        (this.simulateStatus + 1) % (this.plan.testTriggers.length + 1);
      if (this.simulateStatus === this.plan.testTriggers.length) {
        this.plan.stopEndpoint = `/api/plan/${this.$route.params.id}/complete`;
        fetch(this.plan.stopEndpoint, {
          headers: { Accept: "application/json" }
        });
        this.simulateLabel = "Simulate This Plan";
      } else if (this.simulateStatus === this.plan.testTriggers.length - 1) {
        fetch(this.plan.testTriggers[this.simulateStatus] + `?id=${this.$route.params.id}`, {
          headers: { Accept: "application/json" }
        });
        this.simulateLabel = "Complete";
      } else {
        fetch(this.plan.testTriggers[this.simulateStatus] + `?id=${this.$route.params.id}`, {
          headers: { Accept: "application/json" }
        });
        this.simulateLabel = "Next Phase";
      }
      this.simulateStatus = nextSimulateStatus;
    },
    stopflow() {
      this.plan.stopEndpoint = `/api/plan/${this.$route.params.id}/complete`;
      fetch(this.plan.stopEndpoint, {
        headers: { Accept: "application/json" }
      });
      this.simulateStatus = 0;
      this.simulateLabel = "Simulate This Plan";
    },
    exportPDF() {
      const browser = detect();
      if (browser.name === "chrome") {
        window.print();
      } else {
        alert("This feature is available for Google Chrome at the moment.");
      }
    },
    exportJSON() {
      const json = encodeURIComponent(JSON.stringify(this.plan, null, ""));
      window.open(`data:application/json,${json}`);
    }
  },
  async mounted() {
    const plan = await $client.service("api/plan").get(this.$route.params.id);
    console.log(plan);
    this.plan = plan;
    this.editUrl = `/plan/${this.$route.params.id}/edit`;
    $client.service("api/plan").on("patched", msg => {
      console.log(msg);
      if (this.plan.id === msg.id) {
        // TODO: Secure
        this.plan = msg;
      }
    });
  }
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
  /* border: 1px solid #dee2e6; */
  border: 1px solid #cecece;
}
.steps-segment.is-active::after {
  background-color: #23d160 !important;
}
/* .steps:not(.is-hollow) .steps-marker:not(.is-hollow) {
  background-color: #23d160;
  color: #fff;
}
.steps-segment::after {
  background-color: #23d160;
} */
</style>

<template>
  <div>
    <h4 class="title is-4">Plan Description</h4>
    <div class="columns">
      <div class="column is-12">
        <div class="card">
          <div class="card-content">
            <div class="field">
              <label class="label">Name</label>
              <div class="control is-large">
                <input
                  class="input is-large"
                  type="text"
                  :placeholder="plan.name"
                  :value="plan.name"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Description (Optional)</label>
              <p class="control">
                <textarea
                  class="textarea"
                  rows="2"
                  v-model="plan.description"
                  :placeholder="plan.description"
                ></textarea>
              </p>
            </div>
            <div class="field is-grouped">
              <p class="control">
                <button @click="toNext" class="button is-link">Next</button>
              </p>
              <p class="control">
                <button class="button is-text" @click="cancel">Cancel</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plan: {},
    };
  },
  methods: {
    toNext() {
      // if (this.$route.path.startsWith('/plan-wizard/')) {}
      this.$router.push('/plan/_plan1/edit?wizard=1');
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  async mounted() {
    const plan = await $client.service('api/plan').get('_plan1');
    console.log(plan);
    this.plan = plan;
  },
};
</script>

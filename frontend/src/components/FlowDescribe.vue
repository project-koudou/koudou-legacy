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
                  :placeholder="template.name"
                  :value="template.name"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Description (Optional)</label>
              <p class="control">
                <textarea
                  class="textarea"
                  rows="2"
                  :placeholder="template.description"
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
import nanoid from 'nanoid';

export default {
  data() {
    return {
      template: {},
    };
  },
  methods: {
    async toNext() {
      const id = nanoid();
      console.log(id);
      this.template.id = id;
      await $client.service('api/plan').create(this.template);
      // if (this.$route.path.startsWith('/plan-wizard/')) {}
      this.$router.push(`/plan/${id}/edit?wizard=1`);
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  async mounted() {
    // console.log(this.$route.query);
    let templateId = this.$route.query.template;
    const resp = await fetch('/api/_plan/templates', { headers: { "Accept": "application/json" } });
    const templates = await resp.json();
    this.template = templates.filter(x => x.id === templateId)[0].template;
},
};
</script>

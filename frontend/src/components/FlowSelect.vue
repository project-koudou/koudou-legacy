<template>
  <div>
    <h4 class="title is-4">Templates for Crisis Response Plan</h4>
    <div class="columns is-multiline">
      <div class="column is-6" v-for="template in templates">
        <div
          class="card template"
          @click="toEdit"
          v-bind:class="{ 'is-enabled': template.isEnabled }"
          v-bind:style="template.isEnabled ? {} : { color: '#7a7a7a !important' }"
        >
          <div class="card-image" v-if="template">
            <figure class="image is-3by1">
              <img :src="template.image" />
            </figure>
          </div>
          <div class="card-header is-shadowless">
            <p
              class="card-header-title"
              v-bind:style="template.isEnabled ? {} : { color: '#7a7a7a !important' }"
            >{{ template.name }}</p>
          </div>
          <div class="card-content">
            <ul class="steps is-thin has-content-centered is-horizontal">
              <li class="steps-segment" v-for="phase in template.phases">
                <span href="#" class="steps-marker"></span>
                <div class="steps-content">
                  <p class="is-size-6">{{ phase.name }}</p>
                  <p class="is-size-7">{{ phase.detail }}</p>
                </div>
              </li>
            </ul>
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
      templates: [],
    };
  },
  methods: {
    toEdit() {
      if (this.$router.currentRoute.path.startsWith('/plan-wizard/')) {
        this.$router.push('/plan-wizard/describe');
      } else {
        this.$router.push('/plan-describe');
      }
    },
  },
  async mounted() {
    const resp = await fetch('//localhost:3030/api/_plan/templates');
    const templates = await resp.json();
    this.templates = templates;
  },
};
</script>

<style scoped>
.card-image .image {
  filter: brightness(75%);
}
.template.is-enabled:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}
.image > img {
  object-fit: cover;
}
</style>

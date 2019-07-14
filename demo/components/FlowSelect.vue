<template>
	<div>
    <h4 class="title is-4">Templates for Crisis Response Flow</h4>
    <div class="columns is-multiline">
      <div class="column is-6" v-for="template in templates">
        <div class="card template" @click="toEdit" v-bind:class="{ 'is-enabled': template.isEnabled }" v-bind:style="template.isEnabled ? {} : { color: '#7a7a7a !important' }">
          <div class="card-image">
            <figure class="image is-3by1">
              <img :src="template.image">
            </figure>
          </div>
          <div class="card-header is-shadowless">
            <p class="card-header-title" v-bind:style="template.isEnabled ? {} : { color: '#7a7a7a !important' }">
              {{ template.name }}
            </p>
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
module.exports = {
	data: function () {
		return {
			templates: [],
		}
	},
	methods: {
		toEdit: function (ev) {
      if (this.$router.currentRoute.path.startsWith("/flow-wizard/")) {
        this.$router.push("/flow-wizard/describe")
      } else {
        this.$router.push("/flow-describe")
      }
		}
	},
	mounted: async function () {
    resp = await fetch("/templates.json")
    let templates = await resp.json()
		this.templates = templates
	},
}
</script>

<style>
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

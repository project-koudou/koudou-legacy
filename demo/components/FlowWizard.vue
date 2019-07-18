<template>
	<div>
    <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
      <ul>
        <li :class="{ 'is-active': this.$router.currentRoute.path == '/flow-wizard/select' }"><router-link to="/flow-wizard/select">Select a plan template</router-link></li>
        <li :class="{ 'is-active': this.$router.currentRoute.path == '/flow-wizard/describe' }"><router-link to="/flow-wizard/describe">Name & describe your plan</router-link></li>
        <li :class="{ 'is-active': this.$router.currentRoute.path == '/flow-wizard/edit' }"><router-link to="/flow-wizard/edit">Edit and save the plan</router-link></li>
      </ul>
    </nav>
    <router-view name="step"></router-view>
  </div>
</template>

<script>
module.exports = {
	data: function () {
		return {
		}
	},
	methods: {
	},
	mounted: async function () {
    // this.$router.addRoutes
	},
}
</script>

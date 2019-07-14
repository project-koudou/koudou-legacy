<template>
	<div>
    <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/flow-wizard/select">Select a flow template</router-link></li>
        <li><router-link to="/flow-wizard/describe">Name & describe your flow</router-link></li>
        <li><router-link to="/flow-wizard/edit">Edit and save the flow</router-link></li>
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

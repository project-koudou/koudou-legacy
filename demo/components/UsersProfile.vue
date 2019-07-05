<template>
	<div class="box">
		<pre>{{ message }}</pre>
		<hr>
		<div class="field">
			<p class="control">
				<button v-on:click="logout()" class="button is-success">Logout</button>
			</p>
		</div>
	</div>
</template>

<script>
module.exports = {
	data: function () {
		return {
			"message": ""
		}
	},
	methods: {
		login: async function () {
			this.message = ""
		}
	},
	mounted: async function () {
		let resp = await client.authenticate()
		let payload = await client.passport.verifyJWT(resp.accessToken)
		let info = await client.service('api/users').get(payload.userId)
		this.message = JSON.stringify(info, null, "  ")
	},
}
</script>

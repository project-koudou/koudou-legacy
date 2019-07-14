<template>
	<div class="card">
		<div class="card-content">
			<div class="media">
			<div class="media-left">
				<figure class="image is-48x48">
				<img src="/assets/96x96.png" alt="Placeholder image">
				</figure>
			</div>
			<div class="media-content">
				<p class="title is-4">{{ info.name }}</p>
				<p class="subtitle is-6">{{ info.email }}</p>
			</div>
			</div>
			<!-- <pre>{{ message }}</pre> -->
			<!-- <hr>
			<div class="field">
				<p class="control">
					<button v-on:click="logout()" class="button is-success">Logout</button>
				</p>
			</div> -->
		</div>
	</div>
</template>

<script>
module.exports = {
	data: function () {
		return {
			"message": "",
			"info": {},
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
		this.info = info
	},
}
</script>

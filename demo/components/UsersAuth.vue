<template>
	<div class="box" style="width: 400px;">
		<section v-if="!loggedIn">
			<div class="field">
				<p class="control has-icons-left has-icons-right">
					<input class="input" type="email" v-model="input.email" placeholder="Email">
					<span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
				</p>
			</div>
			<div class="field">
				<p class="control has-icons-left">
					<input class="input" type="password" v-model="input.password" placeholder="Password">
					<span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
				</p>
			</div>
			<div class="field">
				<p class="control">
					<button v-on:click="login()" class="button is-success">Login</button>
				</p>
			</div>
		</section>
		<section v-else>
			<div class="field">
				<p class="control">
					<button v-on:click="logout()" class="button is-success">Logout</button>
				</p>
			</div>
		</section>
		<hr>
		<pre>{{ message }}</pre>
	</div>
</template>

<script>
module.exports = {
	data: function () {
		return {
			input: {
				email: "plgs@example.com",
				password: "plgs"
			},
			message: "",
			loggedIn: false,
		}
	},
	methods: {
		login: async function () {
			this.message = ""
			try {
				if(this.input.username != "" && this.input.password != "") {
					const credentials = Object.assign({ strategy: 'local' }, this.input)
					let resp = await client.authenticate(credentials)
					let payload = await client.passport.verifyJWT(resp.accessToken)
					console.log(payload)
					let info = await client.service('api/users').get(payload.userId)
					console.log(info)
					this.message = JSON.stringify(info, null, "  ")
					this.loggedIn = true
				} else {
					// await client.authenticate()
				}
			} catch (error) {
				this.message = error.message
			}
		},
		logout: async function () {
			await client.logout()
			this.message = ""
			this.loggedIn = false
		},
	},
	mounted: async function () {
		let resp = await client.authenticate()
		console.log(resp)
		let payload = await client.passport.verifyJWT(resp.accessToken)
		let info = await client.service('api/users').get(payload.userId)
		this.message = JSON.stringify(info, null, "  ")
		this.loggedIn = true
    },
}
</script>

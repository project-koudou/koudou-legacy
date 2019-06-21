const socket = io()

const client = feathers()
client.configure(feathers.socketio(socket))
client.configure(feathers.authentication({　storage: window.localStorage　}))

Vue.component('app-login', {
	data: function () {
		return {
			input: {
				email: "plgs@example.com",
				password: "plgs"
			},
			message: "",
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
				} else {
					// await client.authenticate()
				}
			} catch (error) {
				this.message = error.message
			}
		}
	},
	template: `
	<div class="box" style="width: 400px;">
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
		<pre>{{ message }}</pre>
	</div>
	`
})

Vue.component('app-logout', {
	data: function () {
		return {}
	},
	methods: {
		logout: function () {
			client.logout()
		}
	},
	template: `
	<div class="box" style="width: 400px;">
		<div class="field">
			<p class="control">
				<button v-on:click="logout()" class="button is-success">Logout</button>
			</p>
		</div>
	</div>
	`
})

const Users = {
	template: `
	<div>
		<app-login></app-login>
		<app-logout></app-logout>
	</div>
	`
}

const routes = [
  { path: '/users', component: Users },
]

const router = new VueRouter({
  routes
})

const app = new Vue({
	router,
	el: '#app',
	data: {
	}
})

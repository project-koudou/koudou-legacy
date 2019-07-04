const socket = io()

const client = feathers()
client.configure(feathers.socketio(socket))
client.configure(feathers.authentication({　storage: window.localStorage　}))

// /* UsersProfile */
// Vue.component('app-users-profile', {
// 	data: function () {
// 		return {
// 			"message": ""
// 		}
// 	},
// 	methods: {
// 		login: async function () {
// 			this.message = ""
// 		}
// 	},
// 	mounted: async function () {
// 		let resp = await client.authenticate()
// 		let payload = await client.passport.verifyJWT(resp.accessToken)
// 		let info = await client.service('api/users').get(payload.userId)
// 		this.message = JSON.stringify(info, null, "  ")
// 	},
// 	template: `
// 	<div class="box" style="width: 400px;">
// 		<pre>{{ message }}</pre>
// 		<hr>
// 		<div class="field">
// 			<p class="control">
// 				<button v-on:click="logout()" class="button is-success">Logout</button>
// 			</p>
// 		</div>
// 	</div>
// 	`
// })

// const UsersProfile = {
// 	template: `
// 	<div>
// 		<app-users-profile></app-users-profile>
// 	</div>
// 	`
// }

UsersAuth = window.httpVueLoader('/components/UsersAuth.vue')
Person = window.httpVueLoader('/components/Person.vue')
Item = window.httpVueLoader('/components/Item.vue')
FlowList = window.httpVueLoader('/components/FlowList.vue')
Flow = window.httpVueLoader('/components/Flow.vue')
FlowEdit = window.httpVueLoader('/components/FlowEdit.vue')

const routes = [
	{ path: '/users-auth', component: UsersAuth },
	// { path: '/users-profile', component: UsersProfile },
	{ path: '/person', component: Person },
	{ path: '/item', component: Item },
	{ path: '/flow-list', component: FlowList },
	{ path: '/flow', component: Flow },
	{ path: '/flow-edit', component: FlowEdit },
]

const router = new VueRouter({
  routes
})

const app = new Vue({
	router,
	el: '#app',
	data: {
	},
	components: {
		'app-users-auth': UsersAuth
	},
})

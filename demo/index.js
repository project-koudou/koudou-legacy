const socket = io()

const client = feathers()
client.configure(feathers.socketio(socket))
client.configure(feathers.authentication({　storage: window.localStorage　}))

UsersAuth = window.httpVueLoader('/components/UsersAuth.vue')
UsersProfile = window.httpVueLoader('/components/UsersProfile.vue')
Person = window.httpVueLoader('/components/Person.vue')
Item = window.httpVueLoader('/components/Item.vue')
FlowList = window.httpVueLoader('/components/FlowList.vue')
Flow = window.httpVueLoader('/components/Flow.vue')
FlowEdit = window.httpVueLoader('/components/FlowEdit.vue')
Dashboard = window.httpVueLoader('/components/Dashboard.vue')

const routes = [
	{ path: '/users-auth', component: UsersAuth },
	{ path: '/users-profile', component: UsersProfile },
	{ path: '/person', component: Person },
	{ path: '/item', component: Item },
	{ path: '/flow-list', component: FlowList },
	{ path: '/flow', component: Flow },
	{ path: '/flow-edit', component: FlowEdit },
	{ path: '/dashboard', component: Dashboard },
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
		'app-users-auth': UsersAuth,
	},
})

Vue.component('app-flow-list', FlowList)
Vue.component('app-users-profile', UsersProfile)

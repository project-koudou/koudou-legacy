const socket = io()

const client = feathers()
client.configure(feathers.socketio(socket))
client.configure(feathers.authentication({　storage: window.localStorage　}))

/* UsersAuth */
Vue.component('app-users-auth', {
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
	template: `
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
	`
})

const UsersAuth = {
	template: `
	<div>
		<app-users-auth></app-users-auth>
	</div>
	`
}

/* UsersProfile */
Vue.component('app-users-profile', {
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
	template: `
	<div class="box" style="width: 400px;">
		<pre>{{ message }}</pre>
		<hr>
		<div class="field">
			<p class="control">
				<button v-on:click="logout()" class="button is-success">Logout</button>
			</p>
		</div>
	</div>
	`
})

const UsersProfile = {
	template: `
	<div>
		<app-users-profile></app-users-profile>
	</div>
	`
}

/* Person */
Vue.component('app-person', {
	data: function () {
		return {
			items: [],
		}
	},
	methods: {
		find: function (ev) {
		}
	},
	mounted: async function () {
		let items = await client.service('api/person').find()
		this.items = items.data
	},
	template: `<div>
	<div class="box">
	<div class="field is-grouped">
	<p class="control is-expanded">
		<input class="input" type="text" placeholder="Email...">
	</p>
	<p class="control">
			<a class="button is-primary">
				<span class="icon">
					<i class="fas fa-plus"></i>
				</span>
				<span>Add Friend</span>
			</a>
		</p>
	</div>
	</div>
	<div class="box">
	<div class="field is-grouped">
			<p class="control is-expanded">
			<input class="input" type="text" placeholder="Filter...">
			</p>
			<p class="control">
			<button v-on:click="find()" class="button is-success">Find</button>
			</p>
		</div>
		<table class="table is-fullwidth">
		<thead>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
		<tr v-for="(item, index) in items">
			<th scope="row">{{ index+1 }}</th>
			<td>{{ item.name }}</td>
			<td>{{ item.status }}</td>
		</tr>
		</tbody>
		</table>
	</div>
	</div>`
})

const Person = {
	template: `
	<div>
		<app-person></app-person>
	</div>
	`
}

/* Item */
Vue.component('app-item', {
	data: function () {
		return {
			items: [],
		}
	},
	methods: {
		find: function (ev) {
		}
	},
	mounted: async function () {
		let items = await client.service('api/item').find()
		this.items = items.data
	},
	template: `
	<div class="box">
		<div class="field is-grouped">
			<p class="control is-expanded">
			<input class="input" type="text" placeholder="Filter...">
			</p>
			<p class="control">
			<button v-on:click="find()" class="button is-success">Find</button>
			</p>
		</div>
		<table class="table is-fullwidth">
		<thead>
			<tr>
				<th>Item Name</th>
				<th>#</th>
				<th>Location</th>
				<th>Tags</th>
			</tr>
		</thead>
		<tbody>
		<tr v-for="(item, index) in items">
			<td>{{ item.itemName }}</td>
			<td>{{ item.count }}</td>
			<td>{{ item.location }}</td>
			<td>
				<div class="tags are-small">
					<a href="#" class="tag" v-for="(tag, index) in item.tags">{{ tag }}</a>
				</div>
			</td>
		</tr>
		</tbody>
		</table>
	</div>
	`
})

const Item = {
	template: `
	<div>
		<app-item></app-item>
	</div>
	`
}

/* FlowList */
Vue.component('app-flow-list', {
	data: function () {
		return {
			items: [],
		}
	},
	methods: {
		find: function (ev) {
		}
	},
	mounted: async function () {
		let items = await client.service('api/item').find()
		this.items = items.data
	},
	template: `
	<div class="box tile is-vertical is-ancestor">
	<div class="tile is-child card">
		<div class="card-content">
			<p class="title">
				Earthquake Flow (For Student)
			</p>
		</div>
		<div class="card-content">
			<nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
				<ul>
					<li><a href="#">Preparation</a></li>
					<li><a href="#">Trigger</a></li>
					<li><a href="#">Immediately After</a></li>
					<li><a href="#">Evacuation</a></li>
				</ul>
			</nav>
		</div>
	</div>
	<div class="tile is-child card">
		<div class="card-content">
			<p class="title">
				Earthquake Flow (For Staff)
			</p>
		</div>
		<div class="card-content">
		</div>
	</div>
	<div class="tile is-child card">
		<div class="card-content">
			<p class="title">
				Typhoon Flow (For Student)
			</p>
		</div>
		<div class="card-content">
		</div>
	</div>
	</div>
	`
})

const FlowList = {
	template: `
	<div>
		<app-flow-list></app-flow-list>
	</div>
	`
}

/* Flow */
Vue.component('app-flow', {
	data: function () {
		return {
			items: [],
		}
	},
	methods: {
		find: function (ev) {
		}
	},
	mounted: async function () {
		let items = await client.service('api/item').find()
		this.items = items.data
	},
	template: `
	<div class="box tile is-vertical is-ancestor">
	<div class="tile is-child card">
		<div class="card-content">
			<p class="title">
				Earthquake Flow (For Student)
			</p>
			<p class="content">震災時のワークフロー (学生) です。</p>
			<div class="field is-grouped">
			<p class="control">
			<router-link tag="button" to="/flow-edit" class="button is-info">編集</router-link>
			</p>
			<p class="control">
			<button v-on:click="" class="button is-info">PDFとして出力</button>
			</p>
			<p class="control">
			<button v-on:click="" class="button is-info">Webページとして公開</button>
			</p>
			</div>
		</div>
		<div class="card-content">
			<nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
				<ul>
					<li><a href="#">Preparation</a></li>
					<li><a href="#">Trigger Events</a></li>
					<li><a href="#">Immediately After</a></li>
					<li><a href="#">Evacuation</a></li>
					<li><a href="#">Evacuation Life</a></li>
					<li><a href="#">Rebuilding Life</a></li>
				</ul>
			</nav>
			<section class="section">
			<p class="title is-5">Trigger Events</p>
			<article class="message is-danger">
				<div class="message-body">
				<p class="title is-5">緊急地震速報</p>
				<p>現在地で震度5以上</p>
				</div>
			</article>
			</section>
			<section class="section">
			<p class="title is-5">Immedeiately After</p>
			<article class="message is-warning">
				<div class="message-body">
				<p class="title is-5">安否確認</p>
				<p class="subtitle is-6"><b>慶應義塾大学</b>により自動追加 (編集不可)</p>
				<ul class="">
				<li>ページのリンクをメールで受け取る</li>
				</ul>
				</div>
			</article>
			<article class="message">
				<div class="message-body">
				<p class="title is-5">安否確認</p>
				<ul class="">
				<li>登録した人物の安否をプッシュ通知で受け取る</li>
				<li>自分の安否をTwitter/Facebookに自動投稿する</li>
				</ul>
				</div>
			</article>
			<article class="message">
				<div class="message-body">
				<p class="title is-5">最寄りの避難所</p>
				<ul class="">
				<li>地図のリンクを受け取る</li>
				</ul>
				</div>
			</article>
			<article class="message">
				<div class="message-body">
				<p class="title is-5">防災マニュアル</p>
				<p>PDFをメールで受け取る</p>
				</div>
			</article>
			</section>
			<section class="section">
			<p class="title is-5">Evacuation</p>
			<article class="message">
				<div class="message-body">
				<p class="title is-5">現在地からの避難経路</p>
				<p>地図のリンクを受け取る</p>
				</div>
			</article>
			<article class="message">
				<div class="message-body">
				<p class="title is-5">天気予報</p>
				<p>雨の場合プッシュ通知を受け取る</p>
				</div>
			</article>
			</section>
			<section class="section">
			<p class="title is-5">Evacuation Life</p>
			<article class="message">
				<div class="message-body">
				<p class="title is-5">健康チェック</p>
				<p>家族と自分に送信する</p>
				</div>
			</article>
			<article class="message">
				<div class="message-body">
				<p class="title is-5">物品リスト</p>
				<p>リンクを送信</p>
				</div>
			</article>
			</section>
			</div>
	</div>
	</div>
	`
})

const Flow = {
	template: `
	<div>
		<app-flow></app-flow>
	</div>
	`
}

/* FlowEdit */
Vue.component('app-flow-edit', {
	data: function () {
		return {
			flow: [],
			blocks: [],
		}
	},
	methods: {
		find: function (ev) {
		},
		removeAt: function (step, idx) {
			step.blocks.splice(idx, 1)
		},
		toggleModal: function (ev) {
			let el = ev.target.parentElement.closest(".message")
			el = el.getElementsByClassName("modal")[0]
			// console.log(el)
			el.classList.toggle("is-active")
		}
	},
	mounted: async function () {
		let resp = await fetch("/blocks.json")
		this.blocks = await resp.json()
		resp = await fetch("/flow1.json")
		this.flow = await resp.json()
	},
	template: `
	<div class="box columns">
		<div class="column is-narrow">
		<div class="card" style="position: sticky; top: 10px; width: 400px; height: 90vh; display: flex;">
			<div class="card-content" style="display: flex; flex-direction: column;">
				<p class="title is-4">
					Action Blocks
				</p>
				<div class="field">
				<p class="control">
					<input class="input" type="text" placeholder="Filter...">
				</p>
				<hr/>
				</div>
				<draggable style="overflow-y: auto;" :list="blocks" :sort="false" :group="{ name: 'blocks', pull: 'clone', put: false }">
				<div v-for="block in blocks" v-bind:class="[block.style, 'message', 'item']">
					<div class="message-body">
						<p class="title is-6">{{ block.name }}</p>
						<p class="subtitle is-7">{{ block.type }}</p>
					</div>
				</div>
				</draggable>
			</div>
		</div>
		</div>
		<div class="column">
		<div class="card">
			<div class="card-content">
				<p class="title">
					Earthquake Flow (For Student)
				</p>
				<div class="field is-grouped">
				<p class="control">
				<button v-on:click="" class="button is-success">Test flow</button>
				</p>
				<p class="control">
				<button v-on:click="" class="button is-info">Save</button>
				</p>
				</div>
				<div class="field">
				<p class="control">
				<textarea class="textarea">An example workflow.</textarea>
				</p>
				</div>
			</div>
			<div class="card-content">
				<nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
					<ul>
						<li><a href="#">Preparation</a></li>
						<li><a href="#">Trigger Events</a></li>
						<li><a href="#">Immediately After</a></li>
						<li><a href="#">Evacuation</a></li>
						<li><a href="#">Evacuation Life</a></li>
						<li><a href="#">Rebuilding Life</a></li>
					</ul>
				</nav>
				<section class="section step" v-for="step in flow">
				<p class="title is-5" style="position: sticky; top: 0; z-index: 9; padding: 20px 0 40px 0; border-bottom: 1px solid #e3e3e3; height: 50px; display: block; background: #fff;">{{ step.name }}</p>
				<draggable class="block-list" :list="step.blocks" :sort="false" draggable=".item" group="blocks">
				<div v-for="(block, idx) in step.blocks" :key="block.id" v-bind:class="['message', 'item', block.style]">
					<div class="message-body">
						<div class="message-header" style="margin-bottom: -33px;">
							<!--<p>{{ block.name }}</p>-->
							<p>&nbsp;</p>
							<button class="delete" aria-label="delete" @click="removeAt(step, idx)"></button>
						</div>
						<p class="title is-5">{{ block.name }}</p>
						<p v-if="block.always" class="subtitle is-6">{{ block.always }}</p>
						<p class="content">{{ block.message }}</p>
						<div class="field">
							<p class="control">
								<button class="button" @click="toggleModal">Edit</button>
							</p>
						</div>
					</div>
					<div class="modal">
					<div class="modal-background"></div>
					<div class="modal-content">
						<div class="box">
						設定画面
						</div>
					</div>
					<button class="modal-close is-large" aria-label="close" @click="toggleModal"></button>
					</div>
				</div>
				<!--<div slot="footer" key="footer" style="height: 100px; background: #e3e3e3; text-align: center;"></div>-->
				</draggable>
				</section>
			</div>
		</div>
		</div>
	</div>
	`
})

const FlowEdit = {
	template: `
	<div class="flow-edit">
		<app-flow-edit></app-flow-edit>
	</div>
	`
}

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
	}
})

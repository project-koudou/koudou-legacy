<template>
    <div>
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
	</div>
</template>

<script>
module.exports = {
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
}
</script>
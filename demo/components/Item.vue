<template>
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
		let items = await client.service('api/item').find()
		this.items = items.data
	},
}
</script>

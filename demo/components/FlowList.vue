<template>
	<div class="box tile is-vertical is-ancestor">
        <h4 class="title is-4">Ongoing response flows</h4>
        <div class="tile is-child card">
            <div class="card-content">
                <p class="title is-4">
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
        <h4 class="title is-4">Manage response flows</h4>
        <div class="tile is-child card">
            <div class="card-content">
                <p class="title is-4">
                    Earthquake Flow (For Staff)
                </p>
            </div>
            <div class="card-content">
            </div>
        </div>
        <div class="tile is-child card">
            <div class="card-content">
                <p class="title is-4">
                    Typhoon Flow (For Student)
                </p>
            </div>
            <div class="card-content">
            </div>
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
		let items = await client.service('api/item').find()
		this.items = items.data
	},
}
</script>

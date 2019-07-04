<template>
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
</template>

<script>
module.exports = {
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
}
</script>

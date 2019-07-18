<template>
	<div>
		<div class="columns">
			<div class="column is-12">
				<div class="card">
					<div class="card-content">
						<p class="title" style="margin-bottom: 15px;">
							{{ name }}
						</p>
						<p class="content">{{ description }}</p>
						<div class="field is-grouped">
							<p class="control">
							<button v-on:click="" class="button is-primary">Simulate Plan</button>
							</p>
							<p class="control">
							<button v-on:click="save" class="button is-link">Save</button>
							</p>
							<p class="control">
							<button v-on:click="" class="button is-text">Cancel</button>
							</p>
						</div>
					</div>
					<!-- <footer class="card-footer">
						<a href="#" class="card-footer-item">Test flow</a>
						<a href="#" class="card-footer-item">Save</a>
					</footer> -->
				</div>
			</div>
		</div>
		<div class="columns">
			<div class="column is-12">
				<div style="padding: 50px;">
					<ul class="steps has-content-centered">
						<li class="steps-segment">
							<span class="steps-marker"></span>
							<div class="steps-content">
							<p class="is-size-5">Preparation</p>
							<p></p>
							</div>
						</li>
						<li class="steps-segment is-active">
							<span class="steps-marker"></span>
							<div class="steps-content">
							<p class="is-size-5">Alarm Events</p>
							<p></p>
							</div>
						</li>
						<li class="steps-segment">
							<span class="steps-marker"></span>
							<div class="steps-content">
							<p class="is-size-5">Immediately After</p>
							<p></p>
							</div>
						</li>
						<li class="steps-segment">
							<span class="steps-marker"></span>
							<div class="steps-content">
							<p class="is-size-5">Evacuation</p>
							<p></p>
							</div>
						</li>
						<li class="steps-segment">
							<span class="steps-marker"></span>
							<div class="steps-content">
							<p class="is-size-5">Evacuation Life</p>
							<p></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="columns">
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
						<draggable style="overflow-y: auto; padding: 10px 0; padding-right: 20px;" :list="blocks" :sort="false" :group="{ name: 'blocks', pull: 'clone', put: false }">
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
			<div class="box" style="border: none; box-shadow: none;">
				<div class="">
					<section class="section step" v-for="step in flow">
					<p class="title is-5 phase-title">{{ step.name }}</p>
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
	</div>
</template>

<script>
module.exports = {
	data: function () {
		return {
            name: "",
            description: "",
            flow: [],
			blocks: [],
		}
	},
	methods: {
		save: function (ev) {
			this.$router.push("/flow")
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
		let resp = await fetch("/api/_plan/blocks")
		this.blocks = await resp.json()
        resp = await fetch("/api/_plan/plan1")
        let flow1 = await resp.json()
        this.name = flow1.name
        this.description = flow1.description
		this.flow = flow1.flow
	},
}
</script>

<style>
.item {
  cursor: grab;
}
.item:active {
  cursor: grabbing;
}
.message {
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
}
.phase-title {
	position: sticky;
	top: -1px;
	z-index: 9;
	padding: 20px 0 40px 0;
	border-bottom: 1px solid #e3e3e3;
	height: 50px;
	display: block;
	background: #fff;
}
.phase-title:nth-of-type(1) {
	padding-top: 0px;
}
</style>

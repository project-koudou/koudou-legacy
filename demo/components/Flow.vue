<template>
	<div class="box is-shadowless tile is-vertical is-ancestor">
	<div class="tile is-child card">
		<div class="card-content">
			<p class="title">
				{{ name }}
			</p>
			<p class="content">{{ description }}</p>
			<div class="field is-grouped">
            <p class="control">
            <button v-on:click="testflow" class="button is-primary">Test-run flow</button>
            </p>
			<p class="control">
			<router-link tag="button" to="/flow-edit" class="button is-link">Edit</router-link>
			</p>
			<p class="control">
			<button v-on:click="" class="button is-link">Export as PDF</button>
			</p>
			<p class="control">
			<button v-on:click="" class="button is-link">Publish online</button>
			</p>
			</div>
		</div>
		<div class="card-content">
            <!-- <ul class="steps has-content-centered">
                <li class="steps-segment" v-for="step in flow">
                    <span class="steps-marker"></span>
                    <div class="steps-content">
                    <p class="is-size-4">{{ step.name }}</p>
                    <p></p>
                    </div>
                </li>
            </ul> -->
            <ul class="steps has-content-centered is-vertical">
                <li class="steps-segment" v-for="step in flow">
                    <span class="steps-marker"></span>
                    <div class="steps-content">
                        <p class="is-size-4">{{ step.name }}</p>
                        <div style="margin: 10px 0px;">
                            <div v-for="(block, idx) in step.blocks" :key="block.id" v-bind:class="['message', 'item', block.style]">
                                <div class="message-body">
                                    <div class="message-header" style="margin-bottom: -33px;">
                                        <!--<p>{{ block.name }}</p>-->
                                    </div>
                                    <p class="title is-5">{{ block.name }}</p>
                                    <p v-if="block.always" class="subtitle is-6">{{ block.always }}</p>
                                    <p class="content">{{ block.message }}</p>
                                </div>
                            </div>
                        </p>
                    </div>
                </li>
            </ul>
            <!-- <section class="section step" v-for="step in flow">
            <p class="title is-5" style="position: sticky; top: 0; z-index: 9; padding: 20px 0 40px 0; border-bottom: 1px solid #e3e3e3; height: 50px; display: block; background: #fff;">{{ step.name }}</p>
                <div v-for="(block, idx) in step.blocks" :key="block.id" v-bind:class="['message', 'item', block.style]">
                    <div class="message-body">
                        <div class="message-header" style="margin-bottom: -33px;">
                            <!--<p>{{ block.name }}</p>--
                        </div>
                        <p class="title is-5">{{ block.name }}</p>
                        <p v-if="block.always" class="subtitle is-6">{{ block.always }}</p>
                        <p class="content">{{ block.message }}</p>
                    </div>
                </div>
            <!--<div slot="footer" key="footer" style="height: 100px; background: #e3e3e3; text-align: center;"></div>--
            </section> -->
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
            testTrigger: "",
            flow: [],
		}
	},
	methods: {
		find: function (ev) {
        },
        testflow: function () {
            fetch(this.testTrigger)
        }
	},
	mounted: async function () {
        resp = await fetch("/flow1.json")
        let flow1 = await resp.json()
        this.name = flow1.name
        this.description = flow1.description
        this.testTrigger = flow1.testTrigger
		this.flow = flow1.flow
	},
}
</script>

<style>
.message {
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
  cursor: default;
}
</style>

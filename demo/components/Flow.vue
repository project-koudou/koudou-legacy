<template>
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
            <section class="section step" v-for="step in flow">
            <p class="title is-5" style="position: sticky; top: 0; z-index: 9; padding: 20px 0 40px 0; border-bottom: 1px solid #e3e3e3; height: 50px; display: block; background: #fff;">{{ step.name }}</p>
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
            <!--<div slot="footer" key="footer" style="height: 100px; background: #e3e3e3; text-align: center;"></div>-->
            </section>
		</div>
	</div>
	</div>
</template>

<script>
module.exports = {
	data: function () {
		return {
			flow: [],
		}
	},
	methods: {
		find: function (ev) {
		}
	},
	mounted: async function () {
		resp = await fetch("/flow1.json")
		this.flow = await resp.json()
	},
}
</script>

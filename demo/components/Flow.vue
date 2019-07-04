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

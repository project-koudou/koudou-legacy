<template>
	<div class="card is-shadowless" style="border: none;">
		<div class="card-content">
			<div class="media">
				<div class="media-left">
					<figure class="image is-48x48">
					<img src="../assets/96x96.png" alt="Placeholder image">
					</figure>
				</div>
				<div class="media-content">
					<p class="title is-4">{{ info.name }}</p>
					<p class="subtitle is-6">{{ info.email }}</p>
				</div>
			</div>
			<div class="has-text-right">
			<a href="#" v-on:click="logout()" class="button is-text"><span class="icon"><i class="fas fa-sliders-h"></i></span></a>
			<a href="#" v-on:click="logout()" class="button is-light">Logout</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      info: {},
    }
  },
  methods: {
    async login() {
      this.message = ''
    },
    async logout() {
      await $client.logout()
      this.message = ''
      this.loggedIn = false
      this.$router.push('/login')
    },
  },
  async mounted() {
    const resp = await $client.authenticate()
    const payload = await $client.passport.verifyJWT(resp.accessToken)
    const info = await $client.service('api/users').get(payload.userId)
    this.message = JSON.stringify(info, null, '  ')
    this.info = info
  },
}
</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="text" v-model="input.name" placeholder="Name" />
          <span class="icon is-small is-left">
            <i class="fas fa-signature"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="text" v-model="input.organization" placeholder="Organization" />
          <span class="icon is-small is-left">
            <i class="fas fa-sitemap"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="text" v-model="input.role" placeholder="Role" />
          <span class="icon is-small is-left">
            <i class="fas fa-id-badge"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="email" v-model="input.email" placeholder="Email" />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" v-model="input.password" placeholder="Password" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button v-on:click="register()" class="button is-success is-fullwidth">Register</button>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <a class="button is-text is-fullwidth" href="/login">Cancel</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-register",
  data() {
    return {
      input: {
        email: "",
        password: "",
        name: "",
        organization: "",
        role: ""
      }
    };
  },
  methods: {
    async register() {
      console.log(this.input);
      try {
        if (
          this.input.email !== "" &&
          this.input.password !== "" &&
          this.input.name !== "" &&
          this.input.organization !== "" &&
          this.input.role !== ""
        ) {
          const info = await $client
            .service("api/users")
            .create(this.input);
          console.log(info);
          this.$router.push("/login");
        }
      } catch (error) {
        alert(error.message);
      }
    }
  },
  async mounted() {}
};
</script>

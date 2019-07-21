<template>
  <div>
    <h4 class="title is-4">Plan Description</h4>
    <div class="columns">
      <div class="column is-12">
        <div class="card">
          <div class="card-content">
            <div class="field">
              <label class="label">Name</label>
              <div class="control is-large">
                <input class="input is-large" type="text" :placeholder="name" :value="name" />
              </div>
            </div>
            <div class="field">
              <label class="label">Description (Optional)</label>
              <p class="control">
                <textarea class="textarea" rows="2">{{ description }}</textarea>
              </p>
            </div>
            <div class="field is-grouped">
              <p class="control">
                <button v-on:click="toNext" class="button is-link">Next</button>
              </p>
              <p class="control">
                <button v-on:click class="button is-text">Cancel</button>
              </p>
            </div>
          </div>
          <!-- <div style="padding: 50px;">
						<ul class="steps has-content-centered">
							<li class="steps-segment">
								<span class="steps-marker"></span>
								<div class="steps-content">
								<p class="is-size-5">Preparation</p>
								<p></p>
								</div>
							</li>
							<li class="steps-segment">
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
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      description: '',
      flow: [],
    };
  },
  methods: {
    toNext() {
      if (this.$router.currentRoute.path.startsWith('/plan-wizard/')) {
        this.$router.push('/plan-wizard/edit');
      } else {
        this.$router.push('/plan-edit');
      }
    },
  },
  async mounted() {
    const resp = await fetch('//localhost:3030/api/_plan/plan1');
    const flow1 = await resp.json();
    this.name = flow1.name;
    this.description = flow1.description;
    this.flow = flow1.flow;
  },
};
</script>

<style scoped>
.item {
  cursor: grab;
}
.item:active {
  cursor: grabbing;
}
.message {
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
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

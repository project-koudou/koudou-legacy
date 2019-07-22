<template>
  <div class="box is-shadowless">
    <div class="box is-shadowless tile is-vertical is-ancestor">
      <h4 class="title is-4">Ongoing</h4>
      <div
        class="has-text-centered has-text-grey"
        v-if="plans.filter(x => x._meta.status > 0).length === 0"
      >No ongoing plans</div>
      <router-link
        v-for="plan in plans.filter(x => x._meta.status > 0)"
        :key="plan.id"
        :to="getUrlToPlan(plan.id)"
        tag="div"
        class="tile is-child card flow"
      >
        <div class="card-header is-shadowless">
          <p class="card-header-title">{{ plan.name }}</p>
        </div>
        <div class="card-content">
          <ul class="steps is-thin has-content-centered">
            <li
              v-for="(phase, idx) in plan.phases"
              :key="idx"
              class="steps-segment"
              :class="{ 'is-active': idx === plan._meta.status }"
            >
              <span class="steps-marker"></span>
              <div class="steps-content">
                <p class="is-size-6">{{ phase.name }}</p>
                <p></p>
              </div>
            </li>
          </ul>
        </div>
      </router-link>
    </div>
    <div class="box is-shadowless tile is-vertical is-ancestor">
      <h4 class="title is-4">In Preparation</h4>
      <div
        class="has-text-centered has-text-grey"
        v-if="plans.filter(x => x._meta.status === 0).length === 0"
      >No plans in preparation</div>
      <router-link
        v-for="plan in plans.filter(x => x._meta.status === 0)"
        :key="plan.id"
        :to="getUrlToPlan(plan.id)"
        tag="div"
        class="tile is-child card flow"
      >
        <div class="card-header is-shadowless">
          <p class="card-header-title">{{ plan.name }}</p>
        </div>
        <div class="card-content">
          <ul class="steps is-thin has-content-centered">
            <li
              v-for="(phase, idx) in plan.phases"
              :key="idx"
              class="steps-segment"
              :class="{ 'is-active': idx === plan._meta.status }"
            >
              <span class="steps-marker"></span>
              <div class="steps-content">
                <p class="is-size-6">{{ phase.name }}</p>
                <p></p>
              </div>
            </li>
          </ul>
        </div>
      </router-link>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      plans: [],
    };
  },
  methods: {
    getUrlToPlan(id) {
      return `/plan/${id}`;
    },
  },
  async mounted() {
    const plans = await $client.service('api/plan').find();
    this.plans = plans.data;
    $client.service('api/plan').on('patched', (msg) => {
      console.log(msg);
      $client.service('api/plan').find().then((plans) => {
        this.plans = plans.data;
      });
    });
  },
};
</script>


<style scoped>
.card.flow:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}
</style>

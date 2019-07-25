<template>
  <div>
    <div class="box">
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input class="input" type="text" placeholder="Filter..." />
        </p>
        <p class="control">
          <button v-on:click="find()" class="button is-primary">Find</button>
        </p>
      </div>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <th scope="row">{{ index+1 }}</th>
            <td>{{ item.name }}</td>
            <td>{{ item.status }}</td>
            <td><span v-if="item.location"><i class="fas fa-map-marker-alt"></i></span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    find() {
    },
  },
  async mounted() {
    const items = await $client.service('api/person').find();
    console.log(items.data);
    this.items = items.data;
  },
};
</script>

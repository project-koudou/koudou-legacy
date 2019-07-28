<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link to="/">
            <span class="icon">
              <i class="fas fa-bars"></i>
            </span>Back to List
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="box">
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input class="input" type="text" v-model="keyword" placeholder="Filter..." />
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
          <tr v-for="(item, index) in filteredItems" :key="index">
            <th scope="row">{{ index+1 }}</th>
            <td>{{ item.name }}</td>
            <td>
              <span v-html="item.status"></span>
            </td>
            <td>
              <span v-if="item.location">
                <router-link to="/map">
                  <i class="fas fa-map-marker-alt"></i>
                </router-link>
              </span>
            </td>
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
      keyword: "",
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(x => x.name.toLowerCase().includes(this.keyword.toLowerCase()));
    }
  },
  methods: {
  },
  async mounted() {
    const items = await $client.service("api/person").find();
    console.log(items.data);
    this.items = items.data;
  }
};
</script>

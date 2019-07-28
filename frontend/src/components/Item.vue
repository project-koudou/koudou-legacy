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
          <input class="input" type="text" placeholder="Filter..." />
        </p>
      </div>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Requested Item Name</th>
            <th>#</th>
            <th>Location</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items">
            <td>{{ item.itemName }}</td>
            <td>{{ item.count }}</td>
            <td>{{ item.location.placeName }}</td>
            <td>
              <div class="tags are-small">
                <a href="#" class="tag" v-for="(tag, index) in item.tags">{{ tag }}</a>
              </div>
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
      items: []
    };
  },
  methods: {
    find() {}
  },
  async mounted() {
    const items = await $client.service("api/item").find();
    this.items = items.data;
  }
};
</script>

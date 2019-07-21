<template>
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
          <th>Document Title</th>
          <th>UID</th>
          <th>Location</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items">
          <td>{{ item.title }}</td>
          <td>{{ item.uid }}</td>
          <td>
            <a :href="item.location">{{ item.location }}</a>
          </td>
          <td>
            <div class="tags are-small">
              <a href="#" class="tag" v-for="(tag, index) in item.tags">{{ tag }}</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Disaster Assitance Manual',
          uid: 'disasiter-assistance-manual',
          location: 'https://anpi.keio.ac.jp/bcp/link/m/index.html',
          tags: ['manual', 'official'],
        },
      ],
    };
  },
  methods: {
    find(ev) {},
  },
  async mounted() {
    // let items = await client.service('api/item').find()
    // this.items = items.data
  },
};
</script>

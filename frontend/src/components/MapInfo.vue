<template>
  <div id="map-info">
    <b-card-group deck>
      <b-card
        v-bind:header="header"
        v-bind:title="title"
      >
        <b-card-text>{{text}}</b-card-text>
        <b-button @click="timeline" variant="primary">タイムラインを追う</b-button>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'MapInfo',
  props: {
    header: {
      type: String
    },
    title: {
      type: String
    },
    text: {
      type: String
    }
  },
  methods: {
    timeline: function (e) {
      this.$emit('timeline')
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#map-info {
  bottom: 0;
  width: 100%;
}

</style>

<template>
  <div>
    <div class="box">
      <div class="field is-grouped" style="margin-bottom: 30px;">
        <p class="control is-expanded">
          <input class="input" type="text" placeholder="Filter..." />
        </p>
        <p class="control">
          <button v-on:click="find()" class="button is-success">Find</button>
        </p>
      </div>
      <article class="media" v-for="message in feed.slice().reverse()">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="/assets/128x128.png" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ message.name }}</strong>
              <br />
              <span v-html="message.content"></span>
              <br />
              <small>
                <a>Respond</a>
                  · {{ message.date }}
              </small>
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
module.exports = {
  data: function() {
    return {
      feed: [
        {
          name: "",
          title: "",
          content: "",
          date: ""
        },
      ]
    };
  },
  methods: {
    find: function(ev) {},
    addMessage: function(data) {
      console.log(data)
      this.feed.push(data);
    }
  },
  mounted: async function() {
    let resp = await client.authenticate()
    let payload = await client.passport.verifyJWT(resp.accessToken)
    let info = await client.service('api/users').get(payload.userId)
    this.message = JSON.stringify(info, null, "  ")
    this.info = info
    client.service("api/feed").on("created", this.addMessage);
    let feed = await client.service("api/feed").find();
    this.feed = feed.data;
  }
};
</script>
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
      <div class="field is-grouped" style="margin-bottom: 30px;">
        <p class="control is-expanded">
          <input class="input" type="text" v-model="keyword" placeholder="Filter..." />
        </p>
      </div>
      <article class="media" v-for="message in filteredFeed">
        <!-- <figure class="media-left">
        <p class="image is-32x32" style="margin-top: 3px;">-->
        <!-- <img src="../assets/128x128.png" /> -->
        <!-- <span class="icon is-large">
            <i class="fas fa-3x fa-user"></i>
        </span>-->
        <!-- <jazzicon :address="seed(message.clientId)" :diameter="32" />
          </p>
        </figure>-->
        <div class="media-content">
          <div class="content">
            <p>
              <strong class="is-size-5">
                <span class="icon">
                  <!-- <i class="fas fa-user"></i> -->
                  <jazzicon :address="seed(message.clientId)" :diameter="20" />
                </span>
                {{ message.name }}
              </strong>
              <br />
              <span v-html="message.content"></span>
              <br />
              <small>
                <!-- <a>Respond</a> ·  -->
                {{ message.date }}
              </small>
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import crypto from "crypto";
import Jazzicon from "vue-jazzicon";

export default {
  components: {
    [Jazzicon.name]: Jazzicon
  },
  data() {
    return {
      feed: [
        {
          name: "",
          title: "",
          content: "",
          date: ""
        }
      ],
      keyword: ""
    };
  },
  computed: {
    filteredFeed() {
      return this.feed
        .slice()
        .reverse()
        .filter(
          x =>
            x.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
            x.content.toLowerCase().includes(this.keyword.toLowerCase())
        );
    }
  },
  methods: {
    seed(id) {
      return crypto
        .createHash("sha1")
        .update(id)
        .digest("hex");
    },
    find(ev) {},
    async addMessage(data) {
      console.log(data);
      // TODO: Fix
      const feed = await $client.service("api/feed").find({
        query: {
          clientId: data.clientId,
          date: data.date,
          $sort: { date: -1 }
        }
      });
      if (feed.data) {
        this.feed.push(feed.data[0]);
      }
    }
  },
  async mounted() {
    $client.service("api/feed").on("created", this.addMessage);
    const feed = await $client
      .service("api/feed")
      .find({ query: { $sort: { date: -1 }, $limit: 9999 } });
    this.feed = feed.data.slice().reverse();
  }
};
</script>

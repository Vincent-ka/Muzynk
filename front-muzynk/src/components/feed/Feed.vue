<template>
  <section class="sectionFeed">
    <article>
      <div class="feedbox" >
        <p class="post" v-for="(post, index) in id_postsFeed" :key="index">
          {{post.content}}
        </p>
      </div>
      <form class="feedform" @submit.prevent="postContent">
        <div>
          <input class="feed-input" type="text" v-model="post"/>
        </div>
        <button type="submit" class="feed-submit">Send</button>
      </form>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      post: "",
      id_postsFeed: []
    }
  },
  methods: {
    // Fonction pour faire apparaitre le feed de l'utilisateur
    async getFeed() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/feeds/5f46ada43ae36925306f3934"
      );
      this.id_postsFeed = apiRes.data.id_postsFeed
    },
    // Fonction pour poster un nouveau post 
    async postContent() {
      const apiRes = await axios.post(
        process.env.VUE_APP_BACKEND_URL + "/postsFeed/", {
          content: this.post,
          date_published: Date.now()
        }
      );
      this.post = ""
      this.patchFeed(apiRes.data._id)
    },
    // Fonction pour modifier le feed et y ajouter le post posté
    async patchFeed(id) {
      this.id_postsFeed.push(id);
      const { id_postsFeed } = this.$data;
      try {
        const apiRes = await axios.patch(
          process.env.VUE_APP_BACKEND_URL + "/feeds/5f46ada43ae36925306f3934",
          {
            id_postsFeed
          }
        );
        console.log("resultat du patch", apiRes)
      } catch(apiErr) {
        console.error(apiErr)
      };
      this.getFeed()
    }
  },
  // Faire aparaitre le feed à la création de la page
  created() {
    try {
      this.getFeed();
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionFeed {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (min-width: 980px) {
  .sectionFeed {
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.sectionFeed > article {
  width: 90%;
  height: 90%;
  position: relative;
}

.feedbox {
  background: red;
  width: 100%;
  height: 90%;
  background: white;
  overflow-y: auto;
  border: 2px solid black;
}

.feedform {
  display: flex;
  position: absolute;
  bottom: 0;
  border-top: 1px solid;
  height: 10%;
  width: 100%;
  background: gray;
  justify-content: center;
  border: 2px solid black;
  border-top: none;
}

.feed-submit {
  width: 50px;
  height: 100%;
  align-self: center;
  margin-left: auto;
}

.feedform div {
  align-self: center;
}

.feed-input {
  margin-left: 10px
}

.post {
  border-bottom: 1px solid;
}
</style>
<template>
  <section class="sectionFeedAmi">
    <div class="amiInfos">
      <div class="amiInfosPhoto"></div>
      <p>{{this.prenom}} {{this.nom}}</p>
    </div>
    <article>
      <div class="feedamibox">
        <p class="post" v-for="(post, index) in id_postsFeed" :key="index">{{post.content}}</p>
      </div>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id_postsFeed: [],
      fil: "",
      prenom: "",
      nom: ""
    };
  },
  methods: {
    // Fonction pour recuprer l'ami sur lequel on a cliqué
    async getAmi() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/" + this.$route.params.id
      );
      this.fil = apiRes.data.fil;
      this.prenom = apiRes.data.firstname;
      this.nom = apiRes.data.lastname
      this.getFeedAmi();
    },
    // Fonction pour récuperer le feed de l'ami cliqué
    async getFeedAmi() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/feeds/" + this.fil
      );
      this.id_postsFeed = apiRes.data.id_postsFeed;
    }
  },
  created() {
    try {
      this.getAmi();
      // this.getFeed();
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionFeedAmi {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .amiInfos {
    display: none;
  }
}
@media screen and (min-width: 980px) {
  .sectionFeedAmi {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .amiInfos {
    width: 30%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .amiInfosPhoto {
    width: 200px;
    height: 200px;
    border: 1px solid black;
    border-radius: 50%;
    margin-top: 30%;
  }
  .amiInfos > p {
    margin-top: 50px;
    font-weight: bold;
    font-size: 25px;
  }
}
.sectionFeedAmi > article {
  width: 90%;
  height: 90%;
  position: relative;
}
.feedamibox {
  background: red;
  width: 100%;
  height: 100%;
  background: white;
  overflow-y: auto;
  border: 2px solid black;
}
</style>
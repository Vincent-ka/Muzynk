<template>
  <section class="sectionFeedAmi">
    <div class="amiInfos">
      <figure>
      <img class="displayImgAmi" :src="this.avatar" alt="avatar de l'utilisateur connecté">
      </figure>
      <p>{{this.prenom}} {{this.nom}}</p>
    </div>
    <article>
      <div class="feedamibox">
        <p class="emptyFeedAmi" v-if="this.id_postsFeed.length === 0">Votre ami n'a encore rien posté dans son fil d'actualité.</p>
        <p class="post" v-for="(post, index) in id_postsFeed.slice().reverse()" :key="index">{{post.content}}
          <span class="supp-sujet" @click="deletePost(post._id)" v-if="currentUser.role === 'admin'">x</span>
        </p>
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
      nom: "",
      avatar: ""
    };
  },
  computed: {
    // Recuperer le user connecté
    currentUser() {
      const userInfos = this.$store.getters["user/current"];// récupère l'user connecté depuis le store/user
      return userInfos; // retourne les infos, desormais accessible dans le component sous le nom currentUser
    }
  },
  methods: {
    // Fonction pour recuprer l'ami sur lequel on a cliqué
    async getAmi() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/" + this.$route.params.id
      );
      this.fil = apiRes.data.fil;
      this.prenom = apiRes.data.firstname;
      this.nom = apiRes.data.lastname;
      this.avatar = apiRes.data.avatar
      this.getFeedAmi();
    },
    // Fonction pour récuperer le feed de l'ami cliqué
    async getFeedAmi() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/feeds/" + this.fil
      );
      this.id_postsFeed = apiRes.data.id_postsFeed;
    },
    // Supprimer a post du feed d'un utilisateur en tant qu'admin
    async deletePost(id) {
      if (confirm("Etes vous sûr de bien vouloir supprimer le post ?")) {
        await axios.delete(
          process.env.VUE_APP_BACKEND_URL + "/postsFeed/" + id
        );
        this.getFeedAmi()
      }
    },
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
.emptyFeedAmi {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  padding: 20px;
}
.amiInfos>figure {
    margin-top: 30%;
    margin-left: 10px;
    text-align: center;
}
.displayImgAmi {
  width: 80%;
  height: 80%;
  border-radius: 50%;
}
</style>
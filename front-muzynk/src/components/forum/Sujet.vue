<template>
  <section class="sectionSujet">
    <article>
      <div class="sujetbox">
        <p
          class="postSujetContent"
          v-for="(post, index) in id_postsForum"
          :key="index"
        >{{post.content}} - {{post.id_author}}</p>
      </div>
      <form class="sujetform" @submit.prevent="postContent">
        <div>
          <input class="sujet-input" type="text" placeholder="Créer un post" v-model="content" />
        </div>
        <button class="sujet-submit">Send</button>
      </form>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      content: "",
      id_postsForum: [],
      author: ""
    };
  },
  methods: {
    // Fonction pour faire apparaitre le sujet
    async getSubject() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/subjects/" + this.$route.params.id
      );
      this.id_postsForum = apiRes.data.id_postsForum;
    },
    // Fonction pour poster un nouveau sujet
    async postContent() {
      const apiRes = await axios.post(
        process.env.VUE_APP_BACKEND_URL + "/postsForum/",
        {
          content: this.content
        }
      );
      this.content = "";
      this.patchSubject(apiRes.data._id);
    },
    // Fonction pour modifier le feed et y ajouter le post posté
    async patchSubject(id) {
      this.id_postsForum.push(id);
      const { id_postsForum } = this.$data;
      try {
        const apiRes = await axios.patch(
          process.env.VUE_APP_BACKEND_URL +
            "/subjects/" +
            this.$route.params.id,
          {
            id_postsForum
          }
        );
        console.log("resultat du patch", apiRes);
      } catch (apiErr) {
        console.error(apiErr);
      }
      this.getSubject();
    }
  },
  created() {
    try {
      this.getSubject();
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionSujet {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (min-width: 980px) {
  .sectionSujet {
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.sectionSujet > article {
  width: 90%;
  height: 90%;
  position: relative;
}

.sujetbox {
  background: red;
  width: 100%;
  height: 90%;
  background: white;
  overflow-y: auto;
  border: 2px solid black;
}

.sujetform {
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

.sujet-submit {
  width: 50px;
  height: 100%;
  align-self: center;
  margin-left: auto;
}

.sujetform div {
  align-self: center;
}

.sujet-input {
  margin-left: 10px;
}

.postSujetContent {
  border-bottom: 1px solid;
}
</style>
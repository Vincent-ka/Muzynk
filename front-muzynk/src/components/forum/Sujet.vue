<template>
  <section class="sectionSujet">
    <article>
      <div class="sujetbox">
        <div class="postSujetContent" v-for="(post, index) in id_postsForum" :key="index">
          <div class="sujetAuteur">
            <router-link :to="'/ajout-amis/' + post.id_author">
              <figure class="author-photo">
                <img class="postDisplayImg" :src="post.avatar" alt="avatar de l'utilisateur ayant posté le post">
              </figure>
            </router-link>
            <router-link class="link-author" :to="'/ajout-amis/' + post.id_author">{{post.prenom}}</router-link>
          </div>
          <div class="contenuMessage">
          <p >{{post.content}}</p>
          <p class="date-supp">
          <span class="date-post-forum">{{ moment(post.date_published).format('lll') }}</span>
          <span class="supp-post" @click="deleteMessage(post._id)" v-if="currentUser._id === post.id_author || currentUser.role === 'admin'">x</span>
          </p>
          
          </div>
        </div>
      </div>
      <form class="sujetform" @submit.prevent="postContent">
        <input class="sujet-input" type="text" placeholder="Créer un post" v-model="content" />
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
      prenom: "",
      avatar: "",
      date_published: ""
    };
  },
  computed: {
    currentUser() {
      const userInfos = this.$store.getters["user/current"]; // récupère l'user connecté depuis le store/user
      return userInfos; // retourne les infos, desormais accessible dans le component sous le nom currentUser
    }
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
          content: this.content,
          id_author: this.currentUser._id,
          prenom: this.currentUser.firstname,
          avatar: this.currentUser.avatar,
          date_published: Date.now()
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
    },
    async deleteMessage(id) {
      if (confirm("Etes vous sûr de bien vouloir supprimer votre message ?")) {
        await axios.delete(
          process.env.VUE_APP_BACKEND_URL + "/postsForum/" + id
        );
        this.getSubject()
      }
    },
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
  .author-photo {
    margin: auto;
  }
  .postDisplayImg {
    width: 90%;
    border-radius: 50%;
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
  .author-photo {
    margin: auto;
  }
  .postDisplayImg {
    width: 50%;
    border-radius: 50%;
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
  height: 95%;
  background: white;
  overflow-y: auto;
  border: 2px solid black;
}

.sujetform {
  display: flex;
  position: absolute;
  bottom: 0;
  border-top: 1px solid;
  height: 5%;
  width: 100%;
  background: gray;
  justify-content: center;
  border-top: none;
}

.sujet-submit {
  width: 50px;
  height: 100%;
  align-self: center;
  margin-left: auto;
}

.sujet-input {
  width: 100%;
}

.postSujetContent {
  border-bottom: 1px solid;
  display: flex;
}

.sujetAuteur {
  width: 20%;
  background: #698880;
  text-align: center;
  padding: 10px;
  border-right: 1px solid black;
  font-size: 10px;
}

.link-author {
  text-decoration: none;
  color: black;
}

.link-author:hover {
  text-decoration: underline;
}

.contenuMessage {
  width: 80%;
  background: #b1c1c0;
  padding: 10px;
}
.supp-post {
    
    background: #B1C1C0;
    cursor: pointer;
    padding: 5px;
  }
  .date-post-forum {
    font-size: 10px;
  }
  .date-supp {
    float: right;
  }
</style>
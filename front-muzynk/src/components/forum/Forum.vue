<template>
  <section class="sectionForum">
    <article>
      <div class="forumbox">
        <div class="postSujet" v-for="(sujet, index) in id_subjects" :key="index">
          <h2 class="titre-sujet">
            <router-link :to="'/forum/sujet/' + sujet._id" class="link-sujet">{{sujet.title}}</router-link>
            <span class="supp-sujet" @click="deleteMessage(sujet._id)" v-if="currentUser._id === sujet.id_creator || currentUser.role === 'admin'">x</span>
          </h2>
          <p class="creator-media"> Auteur : 
            <router-link :to="'/ajout-amis/' + sujet.id_creator" class="link-creator-media">{{sujet.prenom}}</router-link>
          </p>

          <router-link :to="'/ajout-amis/' + sujet.id_creator" class="link-creator">
            <p class="creator">{{sujet.prenom}}</p>
          </router-link>
        </div>
      </div>
      <form class="forumform" @submit.prevent="postSubject">
        <input class="forum-input" type="text" placeholder="Créer un nouveau sujet" v-model="title" />
        <button class="forum-submit">Send</button>
      </form>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      id_subjects: [],
      prenom: ""
    };
  },
  computed: {
    // REcuperer le user connecté
    currentUser() {
      const userInfos = this.$store.getters["user/current"];// récupère l'user connecté depuis le store/user
      return userInfos; // retourne les infos, desormais accessible dans le component sous le nom currentUser
    }
  },
  methods: {
    // Recuperer le nom du user
    async getUser() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/" + this.currentUser._id
      );
      this.prenom = apiRes.data.firstname;
    },
    // Fonction pour faire apparaitre le forum
    async getForum() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/forums/5f3a7be4a9a37d200c17dddd"
      );
      this.id_subjects = apiRes.data.id_subjects;
      console.log("lol", apiRes.data)
    },
    // Fonction pour poster un nouveau sujet
    async postSubject() {
      if (this.title.length != 0) {
        const apiRes = await axios.post(
          process.env.VUE_APP_BACKEND_URL + "/subjects/",
          {
            title: this.title,
            id_creator: this.currentUser._id,
            prenom: this.prenom,
            id_postsForum: []
          }
        );
        this.title = "";
        this.patchForum(apiRes.data._id);
      }
    },
    // Fonction pour modifier le forum et y ajouter le sujet posté
    async patchForum(id) {
      this.id_subjects.push(id);
      const { id_subjects } = this.$data;
      try {
        const apiRes = await axios.patch(
          process.env.VUE_APP_BACKEND_URL + "/forums/5f3a7be4a9a37d200c17dddd",
          {
            id_subjects
          }
        );
        console.log("resultat du patch", apiRes);
      } catch (apiErr) {
        console.error(apiErr);
      }
      this.getForum();
    },
    async deleteMessage(id) {
      if (confirm("Etes vous sûr de bien vouloir supprimer votre sujet ?")) {
        await axios.delete(
          process.env.VUE_APP_BACKEND_URL + "/subjects/" + id
        );
        this.getForum()
      }
    },
  },
  created() {
    try {
      this.getUser()
      this.getForum();
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionForum {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .titre-sujet {
    width: 100%;
    background: #698880;
    padding: 20px;
    text-align: center;
  }
  .link-sujet {
    color: black;
    text-decoration: none;
    font-weight: bold;
    width: 100%;
  }
  .link-creator {
    display: none;
  }
  .creator-media {
    display: block;
    width: 100%;
    background: #698880;
    padding: 20px;
    text-align: center;
  }
  .postSujet {
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid black;
  }
}
@media screen and (min-width: 980px) {
  .sectionForum {
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .titre-sujet {
    width: 70%;
    background: #698880;
    padding: 20px;
  }
  .link-sujet {
    color: black;
    text-decoration: none;
    font-weight: bold;
    width: 60%;
  }
  .creator-media {
    display: none;
  }
  .postSujet {
    border-bottom: 3px solid black;
    display: flex;
    justify-content: space-between;
  }
}
.sectionForum > article {
  width: 90%;
  height: 90%;
  position: relative;
}
.forumbox {
  width: 100%;
  height: 95%;
  background: #b1c1c0;
  overflow-y: auto;
  border: 2px solid black;
}
.forumform {
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
.forum-submit {
  width: 50px;
  height: 100%;
  align-self: center;
  margin-left: auto;
}
.forum-input {
  width: 100%;
}
.link-creator {
  color: black;
  text-decoration: none;
  padding: 5px;
  font-size: 10px;
  align-self: flex-end;

}
.link-creator-media {
  color: black;
  text-decoration: none;
}
.link-sujet:hover,
.link-creator:hover {
  text-decoration: underline;
}
.titre-sujet {
  font-size: 20px;
}
.supp-sujet {
    float: right;
    cursor: pointer;
  }
</style>
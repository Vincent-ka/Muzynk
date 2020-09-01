<template>
  <section class="sectionForum">
    <article>
      <div class="forumbox">
        <div class="postSujet" v-for="(sujet, index) in id_subjects" :key="index">
          <router-link :to="'/forum/sujet/' + sujet._id" class="link-sujet">
            <p class="titre-sujet">{{sujet.title}}</p>
          </router-link>
          <p class="creator">{{sujet.id_creator}}</p>
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
    };
  },
  methods: {
    // Fonction pour faire apparaitre le forum
    async getForum() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/forums/5f3a7be4a9a37d200c17dddd"
      );
      this.id_subjects = apiRes.data.id_subjects;
    },
    // Fonction pour poster un nouveau sujet
    async postSubject() {
      if (this.title.length != 0) {
      const apiRes = await axios.post(
        process.env.VUE_APP_BACKEND_URL + "/subjects/",
        {
          title: this.title,
          id_creator: "5f3e335e2a1d9f2bc0f8a6a8",
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
    }
  },
  created() {
    try {
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

  .creator {
    display: none;
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
    width: 100%;
    background: #698880;
    padding: 20px;
  }

  .link-sujet {
  color: black;
  text-decoration: none;
  font-weight: bold;
  width: 60%;
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

.postSujet {
  border-bottom: 3px solid black;
  display: flex;
  justify-content: space-between;
}

.link-sujet:hover {
  text-decoration: underline;
}

.creator {
  padding: 5px;
  font-size: 10px;
  align-self: flex-end;
}
</style>
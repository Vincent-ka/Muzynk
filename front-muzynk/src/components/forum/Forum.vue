<template>
  <section class="sectionForum">
    <article>
      <div class="forumbox">
        <div class="postSujet" v-for="(sujet, index) in id_subjects" :key="index">
          <router-link :to="'/forum/sujet/' + sujet._id" class="link-sujet">
          <p>{{sujet.title}} -- {{sujet.id_creator.firstname}}</p>
          </router-link>
        </div>
      </div>
      <form class="forumform" @submit.prevent="postSubject">
        <div>
          <input class="forum-input" type="text" v-model="title"/>
        </div>
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
    }
  },
  methods: {
    // Fonction pour faire apparaitre le forum
    async getForum() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/forums/5f3a7be4a9a37d200c17dddd"
      );
      this.id_subjects = apiRes.data.id_subjects
    },
    // Fonction pour poster un nouveau sujet 
    async postSubject() {
      const apiRes = await axios.post(
        process.env.VUE_APP_BACKEND_URL + "/subjects/", {
          title: this.title,
          id_creator: "5f3e335e2a1d9f2bc0f8a6a8",
          id_postsForum: [],
        }
      );
      this.title = "";
      this.patchForum(apiRes.data._id) 
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
        console.log("resultat du patch", apiRes)
      } catch(apiErr) {
        console.error(apiErr)
      };
      this.getForum()
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
}

.sectionForum > article {
  width: 90%;
  height: 90%;
  position: relative;
}

.forumbox {
  background: red;
  width: 100%;
  height: 90%;
  background: white;
  overflow-y: auto;
  border: 2px solid black;
}

.forumform {
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

.forum-submit {
  width: 50px;
  height: 100%;
  align-self: center;
  margin-left: auto;
}

.forumform div {
  align-self: center;
}

.forum-input {
  margin-left: 10px
}

.postSujet {
  border-bottom: 1px solid;
}

.link-sujet {
  color: black;
  text-decoration: none;
  font-weight: bold;
}

.link-sujet:hover {
  text-decoration: underline;
}
</style>
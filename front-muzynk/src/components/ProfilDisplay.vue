<template>
  <section class="sectionNom">
    <article>
      <figure>
        <img class="displayImg" :src="currentUser.avatar" alt="avatar de l'utilisateur connecté">
      </figure>
      <router-link to="/profil" class="display-lien-profil">
      <p>{{ this.firstname }} {{ this.lastname }}</p>
      </router-link>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      firstname: "",
      lastname: ""
    }
  },
  computed: {
    currentUser() {
      const userInfos = this.$store.getters["user/current"];// récupère l'user connecté depuis le store/user
      return userInfos; // retourne les infos, desormais accessible dans le component sous le nom currentUser
    }
  },
  methods: {
    async getUser() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/" + this.currentUser._id
      );
      this.firstname = apiRes.data.firstname;
      this.lastname = apiRes.data.lastname;
    },
  },
  created() {
    try {
      this.getUser();
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style scoped>
@media screen and (min-width:320px) and (max-width:979px) {
    .sectionNom {
        display: none;
    }
}

.sectionNom {
    width: 20%;
    height: 100%;
}

.sectionNom >article {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sectionNom >article>figure {
    margin-top: 35%;
    margin-left: 10px;
    text-align: center;
}

.displayImg {
  width: 80%;
  height: 80%;
  border-radius: 50%;
}

.sectionNom >article>.display-lien-profil {
    margin-top: 30px;
    font-weight: bold;
    font-size: 25px;
    text-align: center;
    text-decoration: none;
    color: black;
}
</style>
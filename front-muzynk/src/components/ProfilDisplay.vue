<template>
  <section class="sectionName">
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
    // Function to get the current user
    currentUser() {
      const userInfos = this.$store.getters["user/current"]; // Get the current user from the store
      return userInfos; // Return the infotmations available under the name "currentUser"
    }
  },
  methods: {
    // Function to get the connected user
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
    .sectionName {
        display: none;
    }
}

.sectionName {
    width: 20%;
    height: 100%;
}

.sectionName >article {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sectionName >article>figure {
    margin-top: 35%;
    margin-left: 10px;
    text-align: center;
}

.displayImg {
  width: 80%;
  height: 80%;
  border-radius: 50%;
}

.sectionName >article>.display-lien-profil {
    margin-top: 30px;
    font-weight: bold;
    font-size: 25px;
    text-align: center;
    text-decoration: none;
    color: black;
}
</style>
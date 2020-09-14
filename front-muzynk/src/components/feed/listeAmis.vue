<template>
  <section class="sectionListeAmis">
    <h1>Liste des amis</h1>
    <article>
      <p class="consigne-ami">Cliquez sur le nom d'un ami afin de voir son fil d'actualité</p>
      <ul class="amisListe">
        <li v-for="(ami, index) in amisNoms" :key="index">
          <router-link :to="'/feedAmi/' + ami.id" class="lien-ami">{{ami.prenom}} {{ami.nom}}</router-link>
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      amisId: "",
      amisNoms: [{ prenom: "", nom: "", id: "" }]
    };
  },
  computed: {
    // Recuperer le user connecté
    currentUser() {
      const userInfos = this.$store.getters["user/current"]; // récupère l'user connecté depuis le store/user
      return userInfos; // retourne les infos, desormais accessible dans le component sous le nom currentUser
    }
  },
  methods: {
    // Fonction pour recuprer les id de la liste d'amis
    async getFriends() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/" + this.currentUser._id
      );
      this.amisId = apiRes.data.friendlist;
      console.log("les amis id", this.amisId);
      this.getFriendsName();
    },
    // Fonction pour recuperer les noms de la liste d'amis
    async getFriendsName() {
      for (let i = 0; i < this.amisId.length; i++) {
        const apiRes = await axios.get(
          process.env.VUE_APP_BACKEND_URL + "/users/" + this.amisId[i]
        );
        this.amisNoms.push({
          prenom: apiRes.data.firstname,
          nom: apiRes.data.lastname,
          id: apiRes.data._id
        });
      }
    }
  },
  created() {
    try {
      this.getFriends();
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionListeAmis {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .sectionListeAmis > article {
    height: 90%;
    width: 80%;
    border: 1px solid black;
    padding: 20px;
    background: #b1c1c0;
    border-radius: 10px;
    overflow-y: auto;
  }
}
@media screen and (min-width: 980px) {
  .sectionListeAmis {
    height: 100%;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
  }
  .sectionListeAmis > article {
    height: 90%;
    width: 90%;
    border: 1px solid black;
    padding: 20px;
    background: #b1c1c0;
    border-radius: 10px;
  }
}

.amisListe {
  list-style: none;
}
.amisListe > li {
  margin-bottom: 15px;
}

.lien-ami {
  text-decoration: none;
  color: black;
  font-size: 20px;
}
.consigne-ami {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
}
</style>
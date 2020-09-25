<template>
  <section class="sectionProfil">
    <article>
      <form action="#" class="form-profil" @submit.prevent="patchUser">
        <h3>Bonjour {{this.currentUser.firstname}}. Voulez vous mettre votre profil à jour ?</h3>
        <label for="input-firstname" class="is-clickable">Prénom</label>
        <input
          id="input-firstname"
          type="text"
          class="input"
          name="firstname"
          value
          v-model="firstname"
        />

        <label for="input-lastname" class="is-clickable">Nom de famille</label>
        <input id="input-lastname" type="text" class="input" name="lastname" v-model="lastname" />

        <label for="input-email" class="is-clickable">Email</label>
        <input id="input-email" type="email" class="input" name="email" v-model="email" />

        <label for="input-avatar" class="is-clickable">Avatar</label>
        <input
          id="input-avatar"
          type="file"
          class="input-file"
          name="avatar"
          @change="handleAvatar"
          accept="image/*"
        />
        <button class="btn">ok</button>
      </form>
    </article>

    <article>
      <form action="#" class="form-profil" @submit.prevent="patchPassword">
        <h3>Mettre a jour votre mot de passe</h3>
        <!-- <label for="input-oldpassword" class="is-clickable">Ancien mot de passe</label>
        <input
          id="input-oldpassword"
          type="password"
          class="input"
          name="oldpassword"
          autocomplete="on"
        />-->

        <label for="input-newpassword" class="is-clickable">Nouveau mot de passe</label>
        <input
          id="input-newpassword"
          type="password"
          class="input"
          name="password"
          autocomplete="on"
          v-model="password"
        />
        <button class="btn">ok</button>
      </form>
    </article>

    <article class="gerer">
      <button class="gerer-profil" @click="signout">Déconnexion</button>
      <p class="gerer-profil" @click="deleteUser">Effacer son profil</p>
    </article>
  </section>
</template>

<script>
import axios from "axios";
import auth from "@/auth/";
export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      tmpURL: null
    };
  },
  computed: {
    currentUser() {
      const userInfos = this.$store.getters["user/current"]; // récupère l'user connecté depuis le store/user
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
      this.email = apiRes.data.email;
    },
    async patchUser() {
      const { firstname, lastname, email } = this.$data;
      try {
        const apiRes = await axios.patch(
          process.env.VUE_APP_BACKEND_URL + "/users/" + this.currentUser._id,
          {
            firstname,
            lastname,
            email
          }
        );
        console.log(apiRes);
      } catch (apiErr) {
        console.error(apiErr);
      }
      alert("Les informations ont bien été changées");
    },

    async patchPassword() {
      const { password } = this.$data;
      try {
        const apiRes = await axios.patch(
          process.env.VUE_APP_BACKEND_URL +
            "/users/password/" +
            this.currentUser._id,
          {
            password
          }
        );
        console.log(apiRes);
      } catch (apiErr) {
        console.error(apiErr);
      }
      alert("Le mot de passe bien été changées");
    },

    handleAvatar(e) {
      const fileObject = e.target.files[0];
      this.tmpURL = URL.createObjectURL(fileObject);

      const fd = new FormData();
      fd.append("avatar", fileObject);
      this.$store.dispatch("user/updateAvatar", fd);
    },

    async deleteUser() {
      if (confirm("Etes vous sûr de bien vouloir supprimer votre compte ?")) {
        await axios.delete(
          process.env.VUE_APP_BACKEND_URL + "/users/" + this.currentUser._id
        );
        this.signout();
      }
    },
    signout() {
      auth.signout(this); //  on passe l'instance de vue à la fonction de déconnection
      this.$router.push("/");
    }
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
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionProfil {
    overflow-y: auto;
    height: 100%;
    width: 100%;
  }

  .sectionProfil > article {
    display: flex;
    justify-content: center;
  }

  article.gerer {
    display: flex;
    justify-content: space-around;
    border-top: 2px solid black;
  }

  .form-profil:first-of-type {
    margin-top: 20px;
    margin-bottom: 40px;
  }
}

@media screen and (min-width: 980px) {
  .sectionProfil {
    display: flex;
    justify-content: space-around;
    width: 80%;
    height: 100%;
  }

  .sectionProfil > article {
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  article.gerer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20%;
  }
}

.form-profil {
  display: flex;
  flex-direction: column;
  max-width: 320px;
  padding: 20px;
  border: 2px solid #4f7f88;
  border-radius: 10px;
  background: #7d928d;
  max-width: 300px;
}

.form-profil .label {
  cursor: pointer;
  margin-bottom: 6px;
}

.form-profil .input {
  padding: 7px 0 7px 20px;
  margin-bottom: 10px;
  height: 32px;
  width: 100%;
}

.form-profil .input:last-of-type {
  margin-bottom: 20px;
}

.form-profil .input,
.form-profil .btn {
  border: 1px solid;
  border-radius: 0.3rem;
}

.form-profil .btn {
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 32px;
  max-width: 120px;
  margin-bottom: 20px;
}

.link-deco {
  color: black;
  text-decoration: none;
}

.gerer-profil {
  border: 1px solid;
  border-radius: 0.3rem;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 10px;
  background: #efefef;
  cursor: pointer;
}
.gerer-profil:hover {
  background: #7d928d;
}
form > h3 {
  margin-bottom: 10px;
}
.input-file {
  margin-top: 5px;
  margin-bottom: 15px;
}
</style>
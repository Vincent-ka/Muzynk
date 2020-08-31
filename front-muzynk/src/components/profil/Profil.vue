<template>
  <section class="sectionProfil">
    <article>
      <form action="#" class="form-profil" @submit.prevent="patchUser">
        <h2>Mettre à jour votre profil</h2>
        <label for="input-firstname" class="is-clickable">Prénom</label>
        <input id="input-firtname" type="text" class="input" name="firstname" v-model="firstname" />

        <label for="input-lastname" class="is-clickable">Nom de famille</label>
        <input id="input-lastname" type="text" class="input" name="lastname" v-model="lastname"/>

        <label for="input-email" class="is-clickable">Email</label>
        <input id="input-emailname" type="email" class="input" name="email" v-model="email"/>
        <button class="btn">ok</button>
      </form>
    </article>

    <article>
      <form action="#" class="form-profil">
        <h2>Mettre a jour votre mdp</h2>
        <label for="input-oldpassword" class="is-clickable">Ancien mot de passe</label>
        <input id="input-oldpassword" type="password" class="input" name="oldpassword" autocomplete="on"/>

        <label for="input-newpassword" class="is-clickable">Nouveau mot de passe</label>
        <input id="input-newpassword" type="password" class="input" name="newpassword" autocomplete="on"/>
        <button class="btn">ok</button>
      </form>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: ''
    };
  },
  methods: {
    async getUser() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/5f3e335e2a1d9f2bc0f8a6a8" 
      );
      this.firstname = apiRes.data.firstname,
      this.lastname = apiRes.data.lastname,
      this.email = apiRes.data.email
    },
    async patchUser() {
      const { firstname, lastname, email } = this.$data;
      try {
        const apiRes = await axios.patch(
          process.env.VUE_APP_BACKEND_URL + "/users/5f3e335e2a1d9f2bc0f8a6a8",
          {
            firstname,
            lastname,
            email
          }
        );
        console.log(apiRes)
      } catch(apiErr) {
        console.error(apiErr)
      }
      alert("Les informations ont bien été changées")
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

<style>
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
}

@media screen and (min-width: 980px) {
  .sectionProfil {
    display: flex;
    justify-content: space-around;
    width: 80%;
    height: 100%;
  }

  .sectionProfil > article {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.form-profil {
  display: flex;
  flex-direction: column;
  max-width: 320px;
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
</style>
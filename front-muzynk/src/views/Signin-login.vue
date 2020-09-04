<template>
  <main class="main-log">
    <h1 class="titreGeneral">Bienvenue sur muzink</h1>
    <section class="sectionLog">
      <article class="formPres">
        <form action="#" class="form-log">
          <h3>Connectez-vous</h3>

          <label for="input-email-log" class="is-clickable">Email</label>
          <input id="input-email-log" type="emil" class="input" name="email" />

          <label for="input-password-log" class="is-clickable">Mot de passe</label>
          <input id="input-password-log" type="password" class="input" name="password" />
          <button class="btn">ok</button>
        </form>
      </article>

      <article class="presentation">
        <p>Muzynk est un réseau social destiné aux passionnés de musique</p>
        <p>Essayez son forum afin de pouvoir rencontrer des personnes partageant vos goût musicaux.</p>
      </article>

      <article class="formPres">
        <form class="form-log" @submit.prevent="postUser">
          <h3>Inscrivez vous</h3>

          <label for="input-firstname" class="is-clickable">Prénom</label>
          <input id="input-firtname" type="text" class="input" name="firstname" v-model="firstname" />

          <label for="input-lastname" class="is-clickable">Nom de famille</label>
          <input id="input-lastname" type="text" class="input" name="lastname" v-model="lastname"/>

          <label for="input-email-sign" class="is-clickable">Email</label>
          <input id="input-email-sign" type="email" class="input" name="email" v-model="email"/>

          <label for="input-password-sign" class="is-clickable">Mot de passe</label>
          <input id="input-password-sign" type="password" class="input" name="password" v-model="password"/>

          <label for="input-checkpassword" class="is-clickable">Confirmation mot de passe</label>
          <input id="input-checkpassword" type="password" class="input" name="checkpassword" />
          <button class="btn">ok</button>
        </form>
      </article>
    </section>
  </main>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    }
  },
  methods: {
    async postUser() {
      const apiRes = await axios.post(
        process.env.VUE_APP_BACKEND_URL + "/users/",
        {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password
        }
      );
      console.log(apiRes.data)
      location.href = "/";
    }
  }
};
</script>

<style>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .main-log {
    overflow-y: auto;
  }

  .sectionLog > article {
    width: 100%;
    display: flex;
    justify-content: center;
    /* align-items: center; */
  }
}

@media screen and (min-width: 980px) {
  .sectionLog {
    display: flex;
    justify-content: space-around;
  }

  .sectionLog > article.presentation {
    border: 1px solid black;
    height: 50%;
    align-self: center;
    width: 20%;
  }

  .sectionLog > article.formPres {
    width: 40%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
  }
}

.main-log {
  height: 84vh;
  background: #426859;
}

.sectionLog {
  width: 100%;
  height: 100%;
}

.form-log {
  display: flex;
  flex-direction: column;
  max-width: 320px;
}

.form-log .label {
  cursor: pointer;
  margin-bottom: 6px;
}

.form-log .input {
  padding: 7px 0 7px 20px;
  margin-bottom: 10px;
  height: 32px;
  width: 100%;
}

.form-log .input:last-of-type {
  margin-bottom: 20px;
}

.form-log .input,
.form-log .btn {
  border: 1px solid;
  border-radius: 0.3rem;
}

.form-log .btn {
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 32px;
  max-width: 120px;
  margin-bottom: 20px;
}

.presentation{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.titreGeneral {
  text-align: center;
}
</style>
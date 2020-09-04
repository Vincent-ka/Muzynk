<template>
  <section class="sectionDashEdit">
    <article>
      <form action="#" class="form-dashEdit" @submit.prevent="patchUser">
        <h3>Mettre à jour le profil</h3>
        <label for="input-role" class="is-clickable">Role</label>
        <input id="input-role" type="text" class="input" name="role" v-model="role" />
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
      role: ""
    };
  },
  methods: {
    //Fonction pour afficher les détails de l'user selectioné
    async getUser() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/" + this.$route.params.id
      );
      this.role = apiRes.data.role;
    },
    // Fonction pour modifier les informations de l'utilisateur
    async patchUser() {
      const { role } = this.$data;
      try {
        const apiRes = await axios.patch(
          process.env.VUE_APP_BACKEND_URL + "/users/" + this.$route.params.id,
          {
            role
          }
        );
        console.log(apiRes);
      } catch (apiErr) {
        console.error(apiErr);
      }
      location.href = "/dashboard";
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
.sectionDashEdit {
  width: 80%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-dashEdit {
  display: flex;
  flex-direction: column;
  max-width: 320px;
}

.form-dashEdit .label {
  cursor: pointer;
  margin-bottom: 6px;
}

.form-dashEdit .input {
  padding: 7px 0 7px 20px;
  margin-bottom: 10px;
  height: 32px;
  width: 100%;
}

.form-dashEdit .input:last-of-type {
  margin-bottom: 20px;
}

.form-dashEdit .input,
.form-dashEdit .btn {
  border: 1px solid;
  border-radius: 0.3rem;
}

.form-dashEdit .btn {
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 32px;
  max-width: 120px;
  margin-bottom: 20px;
}
</style>
<template>
  <section class="sectionDashEdit">
    <article>
      <form action="#" class="form-dashEdit" @submit.prevent="patchUser">
        <h2>Mettre à jour le profil</h2>
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
    async getUser() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/" + this.$route.params.id
      );
      this.role = apiRes.data.role
    },
    async patchUser() {
      const { role } = this.$data;
      try {
        const apiRes = await axios.patch(
          process.env.VUE_APP_BACKEND_URL + "/users/" + this.$route.params.id,
          {
            role
          }
        );
        console.log(apiRes)
      } catch (apiErr) {
        console.error(apiErr)
      }
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
</style>
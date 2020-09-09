<template>
  <section class="sectionAjoutAmis">
    <article>
      <p class="demande">Voulez vous ajouter {{this.firstname}} {{this.lastname}} en amis ?</p>
      <div>
      <button @click="addFriend" class="btn">oui</button>
      <button class="btn">
        <router-link :to="'/'" class="link">non</router-link>
      </button>
      </div>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      friendlist: []
    };
  },
  methods: {
    async getUser() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/" + this.$route.params.id
      );
      this.firstname = apiRes.data.firstname;
      this.lastname = apiRes.data.lastname;
    },
    async getUserConnected() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/5f55e31c8687133234677935"
      );
      this.friendlist = apiRes.data.friendlist;
    },
    async addFriend() {
      this.friendlist.push(this.$route.params.id);
      const { friendlist } = this.$data;
      try {
        const apiRes = await axios.patch(
          process.env.VUE_APP_BACKEND_URL + "/users/5f55e31c8687133234677935",
          {
            friendlist
          }
        );
        console.log(apiRes);
      } catch (apiErr) {
        console.error(apiErr);
      }
      location.href = "/";
    }
  },
  created() {
    try {
      this.getUser();
      this.getUserConnected();
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style>
@media screen and (min-width: 320px) and (max-width: 979px) {
    .sectionAjoutAmis {
    height: 100%;
    width: 100%;
  }

  .sectionAjoutAmis > article {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
@media screen and (min-width: 980px) {
.sectionAjoutAmis {
    display: flex;
    justify-content: space-around;
    width: 80%;
    height: 100%;
}

.sectionAjoutAmis > article {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.btn {
  border: 1px solid;
  border-radius: 0.3rem;
  align-items: center;
  cursor: pointer;
  height: 100%;
  width: 80px;
  margin-bottom: 20px;
  margin-right: 15px;
}
.link {
  color: black;
  text-decoration: none;
}

.demande {
    margin-bottom: 20px;
    font-size: 25px;
    text-align: center;
}
</style>
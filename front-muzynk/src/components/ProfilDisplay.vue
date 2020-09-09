<template>
  <section class="sectionNom">
    <article>
      <div></div>
      <p>{{firstname}} {{lastname}}</p>
    </article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      firstname: '',
      lastname: ''
    }
  },
  methods: {
    sendPost(e) {
      e.preventDefault();
      this.posts.push(this.post);
      this.post = ""

    },
    async getUser() {
      const apiRes = await axios.get(
        process.env.VUE_APP_BACKEND_URL + "/users/5f55e31c8687133234677935"
      );
      this.firstname = apiRes.data.firstname,
      this.lastname = apiRes.data.lastname
    }
  },
  created() {
    try {
      this.getUser();
    } catch(err) {
      console.error(err)
    }
  }
};
</script>

<style>
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

.sectionNom >article>div {
    width: 200px;
    height: 200px;
    border: 1px solid black;
    border-radius: 50%;
    margin-top: 30%;
}

.sectionNom >article>p {
    margin-top: 50px;
    font-weight: bold;
    font-size: 25px;
}
</style>
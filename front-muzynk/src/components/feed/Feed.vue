<template>
  <section class="sectionFeed">
    <article>
      <div class="feedbox" >
        <p v-for="(post, index) in posts" :key="index">
          {{post}}
        </p>
      </div>
      <form class="feedform" @submit.prevent="sendPost">
        <div>
          <input class="feed-input" type="text" v-model="post"/>
        </div>
        <button type="submit" class="feed-submit">Send</button>
      </form>
    </article>
  </section>
</template>

<script>
export default {
  data() {
    return {
      post: "",
      posts: []
    }
  },
  methods: {
    sendPost(e) {
      e.preventDefault();
      this.posts.push(this.post);
      this.post = ""

    }
  }
};
</script>

<style>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionFeed {
    height: 100%;
    width: 900%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (min-width: 980px) {
  .sectionFeed {
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.sectionFeed > article {
  width: 90%;
  height: 90%;
  position: relative;
}

.feedbox {
  background: red;
  width: 100%;
  height: 90%;
  background: white;
  overflow-y: auto;
  border: 2px solid black;
}

.feedform {
  display: flex;
  position: absolute;
  bottom: 0;
  border-top: 1px solid;
  height: 10%;
  width: 100%;
  background: gray;
  justify-content: center;
  border: 2px solid black;
  border-top: none;
}

.feed-submit {
  width: 50px;
  height: 100%;
  align-self: center;
  margin-left: auto;
}

.feedform div {
  align-self: center;
}

.feed-input {
  margin-left: 10px
}
</style>
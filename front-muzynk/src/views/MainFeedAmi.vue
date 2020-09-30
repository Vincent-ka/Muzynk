<template>
  <main class="main-feedFriend">
      <FeedAmi />
      <Navigation />
  </main>
</template>

<script>
import FeedAmi from './../components/feed/FeedAmi'
import Navigation from './../components/nav/Navigation'
export default {
    components: {
        FeedAmi,
        Navigation
    },
};
</script>

<style scoped>
.main-feedFriend {
  height: 84vh;
  background: #426859;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
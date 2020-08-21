<template>
  <main class="main-profil">
      <Feed />
      <Navigation />
  </main>
</template>

<script>
import Feed from './../components/profil/Profil';
import Navigation from './../components/nav/Navigation'
export default {
    components: {
        Feed,
        Navigation
    }
};
</script>

<style>
.main-profil {
  height: 84vh;
  background: #426859;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
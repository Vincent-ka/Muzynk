<template>
  <main class="main-listamis">
      <ListeAmis />
      <Navigation />
  </main>
</template>

<script>
import ListeAmis from './../components/feed/listeAmis'
import Navigation from './../components/nav/Navigation'
export default {
    components: {
        ListeAmis,
        Navigation
    }
};
</script>

<style>
.main-listamis {
  height: 84vh;
  background: #426859;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
<template>
  <main class="main-addFriends">
      <AjoutAmis />
      <Navigation />
  </main>
</template>

<script>
import AjoutAmis from "./../components/amis/AjoutAmis";
import Navigation from "./../components/nav/Navigation";
export default {
    components: {
        AjoutAmis,
        Navigation
    }
}
</script>

<style scoped>
.main-addFriends {
  height: 84vh;
  background: #426859;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
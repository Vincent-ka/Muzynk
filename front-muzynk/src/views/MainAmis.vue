<template>
  <div class="main-amis">
      <Amis />
      <Navigation />
  </div>
</template>

<script>
import Amis from "./../components/amis/Amis";
import Navigation from "./../components/nav/Navigation"
export default {
    components: {
        Amis,
        Navigation
    }
};
</script>

<style>
.main-amis {
  height: 84vh;
  background: #426859;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
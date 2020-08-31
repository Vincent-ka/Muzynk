<template>
  <main class="main-sujet">
    <ProfilDisplay />
    <Sujet />
    <Navigation />
  </main>
</template>

<script>
import ProfilDisplay from './../components/ProfilDisplay'
import Sujet from './../components/forum/Sujet'
import Navigation from './../components/nav/Navigation'
export default {
    components: {
        ProfilDisplay,
        Sujet,
        Navigation
    }
}
</script>

<style>
.main-sujet {
    height: 84vh;
    background: #426859;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>

import Header from './views/Header';
import Footer from './views/Footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow-x: hidden;
  overflow-y: hidden;
  font-family: 'Open Sans', sans-serif;
}
</style>

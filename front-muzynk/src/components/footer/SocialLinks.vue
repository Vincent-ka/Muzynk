<template>
  <ul>
    <li>
      <img src="./../../assets/facebook.png" alt="logo de facebook" />
    </li>
    <li>
      <img src="./../../assets/twitter.png" alt="logo de twitter" />
    </li>
    <li>
      <img src="./../../assets/instagram.png" alt="logo d'instagram" />
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style scoped>
@media screen and (max-width: 320px) {
  .footer > ul > li > img {
    width: 24px;
  }
}

@media screen and (min-width: 320px) and (max-width: 979px) {
  .footer > ul {
    margin: auto;
  }
}

.footer > ul {
  display: flex;
  list-style: none;
  margin-left: 20px;
}

.footer > ul > li {
  margin-right: 20px;
}
</style>
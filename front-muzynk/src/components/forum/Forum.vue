<template>
  <section class="sectionForum">
    <article>
      <div>Forum</div>
    </article>
  </section>
</template>

<script>
export default {};
</script>

<style>
@media screen and (min-width: 320px) and (max-width: 979px) {
  .sectionForum {
    height: 100%;
    width: 100%;
  }
}

@media screen and (min-width: 980px) {
  .sectionForum {
    width: 60%;
    height: 100%;
  }
}

.sectionForum > article {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sectionForum > article > div {
  width: 90%;
  height: 90%;
  border: 2px solid black;
}
</style>
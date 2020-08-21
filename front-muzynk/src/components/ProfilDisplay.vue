<template>
  <section class="sectionNom">
    <article>
      <div></div>
      <p>Vincent Katalinski</p>
    </article>
  </section>
</template>

<script>
export default {};
</script>

<style>
@media screen and (min-width:320px) and (max-width:979px) {
    .sectionNom {
        display: none;
    }
}

.sectionNom {
    width: 20%;
    height: 100%;
}

.sectionNom >article {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sectionNom >article>div {
    width: 200px;
    height: 200px;
    border: 1px solid black;
    border-radius: 50%;
    margin-top: 30%;
}

.sectionNom >article>p {
    margin-top: 50px;
    font-weight: bold;
    font-size: 25px;
}
</style>
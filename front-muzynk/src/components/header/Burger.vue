<template>
  <div id="burger" @click="toggleNav">
    <hr class="barreBurger" />
    <hr class="barreBurger" />
    <hr class="barreBurger" />
  </div>
</template>

<script>
export default {
  methods: {
    toggleNav() {
      this.$ebus.$emit("toggle-nav")
    }
  }
};
</script>

<style>
@media screen and (min-width: 320px) and (max-width: 979px) {
  hr {
    width: 35px;
    height: 5px;
    background: white;
    margin-top: 6px;
    border-radius: 10px;
  }
}

@media screen and (min-width: 980px) {
  hr {
    display: none;
    height: 0;
    width: 0;
  }
}

#burger {
  cursor: pointer;
}
</style>
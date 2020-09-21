import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import createPersistedState from "vuex-persistedstate";
// import product from "./product";

// READ THE DOC !!!
// https://vuex.vuejs.org/fr/api/
// https://vuex.vuejs.org/fr/api/#modules

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // product,
    user
  },
  //Pour ne pas perdre les infos du current users lorsqu'on recharge la page manuellement
  plugins: [createPersistedState()]
});

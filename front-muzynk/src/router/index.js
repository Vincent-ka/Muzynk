import Vue from "vue";
import VueRouter from "vue-router";
import auth from "@/auth/";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainForum.vue")
  },
  {
    path: "/forum/sujet/:id",
    name: "Sujet",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SujetForum.vue")
  },
  {
    path: "/feed",
    name: "Feed",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainFeed.vue")
  },
  {
    path: "/ajout-amis/:id",
    name: "AjoutAmis",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainAjoutAmis.vue")
  },
  {
    path: "/profil",
    name: "Profil",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainProfil.vue")
  },
  {
    path: "/chat",
    name: "Chat",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainChat.vue")
  },
  {
    path: "/signin-login",
    name: "Signin-Login",
    beforeEnter: (to, from, next) => {
      // on vérifie l'état de connexion:
      if (auth.getLocalAuthToken()) next("/profil");
      // un utilisateur déjà connecté sera redirigé vers le dashboard...
      else next();
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signin-login.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainDashboard.vue")
  },
  {
    path: "/dashboard/edit/:id",
    name: "DashboardEdit",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DashEdit.vue")
  },
  {
    path: "*",
    name: "Not Found",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;

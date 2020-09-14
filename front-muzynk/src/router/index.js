import Vue from "vue";
import VueRouter from "vue-router";
import auth from "@/auth/";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
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
    path: "/forum",
    name: "Forum",
    beforeEnter: (to, from, next) => {
      // on vérifie l'état de connexion:
      if (!auth.getLocalAuthToken()) next("/");
      // un utilisateur déjà connecté sera redirigé vers le dashboard...
      else next();
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainForum.vue")
  },
  {
    path: "/forum/sujet/:id",
    name: "Sujet",
    beforeEnter: (to, from, next) => {
      // on vérifie l'état de connexion:
      if (!auth.getLocalAuthToken()) next("/");
      // un utilisateur déjà connecté sera redirigé vers le dashboard...
      else next();
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SujetForum.vue")
  },
  {
    path: "/feed",
    name: "Feed",
    beforeEnter: (to, from, next) => {
      // on vérifie l'état de connexion:
      if (!auth.getLocalAuthToken()) next("/");
      // un utilisateur déjà connecté sera redirigé vers le dashboard...
      else next();
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainFeed.vue")
  },
  {
    path: "/listeAmis",
    name: "ListeAmis",
    beforeEnter: (to, from, next) => {
      // on vérifie l'état de connexion:
      if (!auth.getLocalAuthToken()) next("/");
      // un utilisateur déjà connecté sera redirigé vers le dashboard...
      else next();
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainListeAmis.vue")
  },
  {
    path: "/feedAmi/:id",
    name: "FeedAmi",
    beforeEnter: (to, from, next) => {
      // on vérifie l'état de connexion:
      if (!auth.getLocalAuthToken()) next("/");
      // un utilisateur déjà connecté sera redirigé vers le dashboard...
      else next();
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainFeedAmi.vue")
  },
  {
    path: "/ajout-amis/:id",
    name: "AjoutAmis",
    beforeEnter: (to, from, next) => {
      // on vérifie l'état de connexion:
      if (!auth.getLocalAuthToken()) next("/");
      // un utilisateur déjà connecté sera redirigé vers le dashboard...
      else next();
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainAjoutAmis.vue")
  },
  {
    path: "/profil",
    name: "Profil",
    beforeEnter: (to, from, next) => {
      // on vérifie l'état de connexion:
      if (!auth.getLocalAuthToken()) next("/");
      // un utilisateur déjà connecté sera redirigé vers le dashboard...
      else next();
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainProfil.vue")
  },
  {
    path: "/chat",
    name: "Chat",
    beforeEnter: (to, from, next) => {
      // on vérifie l'état de connexion:
      if (!auth.getLocalAuthToken()) next("/");
      // un utilisateur déjà connecté sera redirigé vers le dashboard...
      else next();
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainChat.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    beforeEnter: (to, from, next) => {
      // on vérifie l'état de connexion:
      if (!auth.getLocalAuthToken()) next("/");
      // un utilisateur déjà connecté sera redirigé vers le dashboard...
      else next();
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainDashboard.vue")
  },
  {
    path: "/dashboard/edit/:id",
    name: "DashboardEdit",
    beforeEnter: (to, from, next) => {
      // on vérifie l'état de connexion:
      if (!auth.getLocalAuthToken()) next("/");
      // un utilisateur déjà connecté sera redirigé vers le dashboard...
      else next();
    },
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

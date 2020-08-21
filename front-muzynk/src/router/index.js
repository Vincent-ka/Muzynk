import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainForum.vue")
  },
  {
    path: "/feed",
    name: "Feed",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainFeed.vue")
  },
  {
    path: "/profil",
    name: "Profil",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainProfil.vue")
  },
  {
    path: "/amis",
    name: "Amis",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainAmis.vue")
  },
  {
    path: "/signin-login",
    name: "Signin-Login",
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

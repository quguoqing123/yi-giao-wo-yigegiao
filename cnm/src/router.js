import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Loglin.vue";
import zsgc from "./views/zsgc.vue";
import home from "./views/Home.vue";
import userlist from "./components/user.vue";
import hy from "./components/hy.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/zsgc",
      name: "zsgc",
      component: zsgc
    },
    {
      path: "/home",
      component: home,
      children: [
        {
          path: "",
          component: home,
          redirect: "welcome"
        },
        {
          path: "welcome",
          component: hy
        },
        {
          path: "userlist",
          component: userlist
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const Login = () => import("../views/login/index.vue");
const Console = () => import("../views/Console/index.vue");
const ConsoleIndex = () => import("../views/Console/index.vue");
const infoIndex = () => import("../views/info/index.vue");
const Category =  () => import("../views/info/category.vue");
const User = () => import("../views/user/index.vue");
const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页",
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    hidden: true,
    meta:{
      name: "登录"
    }
  },
  /**
   * 控制台
   */
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    component: Console,
    meta: {
      name: "控制台",
      icon: "el-icon-s-home"
    },
    children: [
      {
        path: "/index",
        name: "Index",
        component: ConsoleIndex,
        meta: {
          name: "首页"
        }
      }
    ]
  },
  /**
   * 信息管理
   */
  {
    path: "/info",
    name: "Info",
    component: Console,
    meta: {
      name: "信息管理",
      icon: "el-icon-info"
    },
    children: [
      {
        path: "/infoIndex",
        name: "infoIndex",
        component: infoIndex,
        meta: {
          name: "信息列表"
        }
      },
      {
        path: "/category",
        name: "Category",
        component: Category,
        meta: {
          name: "信息分类"
        }
      }
    ]
  },
  /**
   * 用户管理
   */
  {
    path: "/user",
    name: "User",
    component: Console,
    meta: {
      name: "用户管理",
      icon: "el-icon-s-custom"
    },
    children: [
      {
        path: "/user",
        name: "User",
        component: User,
        meta: {
          name: "用户列表"
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

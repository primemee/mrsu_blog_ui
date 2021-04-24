import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const blogName = " |" + " Mr.Su的个人博客";

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home/Home"),
    meta: {
      title: "主页" + blogName
    }
  },
  // {
  //   path: "/categories",
  //   name: "Categories",
  //   component: () => import("@/views/categories/Categories"),
  //   meta: {
  //     title: "分类" + blogName
  //   }
  // },
  {
    path: "/tag",
    name: "Tag",
    component: () => import("@/views/tag/Tag"),
    meta: {
      title: "标签" + blogName
    }
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/search/Search"),
    meta: {
      title: "搜索" + blogName
    }
  },
  {
    path: "/timeLine",
    name: "TimeLine",
    component: () => import("@/views/timeLine/TimeLine"),
    meta: {
      title: "时间轴" + blogName
    }
  },
  {
    path: "/aboutMe",
    name: "AboutMe",
    component: () => import("@/views/aboutMe/AboutMe"),
    meta: {
      title: "关于我" + blogName
    }
  },
  {
    path: "/messageBoard",
    name: "MessageBoard",
    component: () => import("@/views/messageBoard/MessageBoard"),
    meta: {
      title: "留言板" + blogName
    }
  },
  {
    path: "/article/:id",
    name: "Article",
    component: () => import("@/components/common/Article"),
    meta: {
      title: "文章详情" + blogName
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

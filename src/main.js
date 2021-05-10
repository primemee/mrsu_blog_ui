import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import APlayer from "@moefe/vue-aplayer";

// Vue.use(APlayer, {
//   defaultCover: "https://github.com/u3u.png",
//   productionTip: true
// });

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: "small", zIndex: 3000 });

//路由导航前置守卫
router.beforeEach((to, from, next) => {
  //进度条开启
  NProgress.start();
  window.document.title = to.meta.title;
  next();
});

router.afterEach(() => {
  //进度条关闭
  NProgress.done();
  //页面回到顶部
  window.scrollTo(0, 0);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

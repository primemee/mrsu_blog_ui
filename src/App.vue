<template>
  <div id="app">
    <!-- 背景粒子效果 -->
    <!-- <div id="particles"></div> -->
    <!-- 导航栏 -->
    <NavBar />

    <router-view />

    <!-- 鼠标点击波纹效果 -->
    <!-- <Waves /> -->
    <!-- 回到顶部按钮 -->
    <transition name="plus-icon">
      <div
        class="back-to-ceiling"
        @click="goToTop"
        v-show="gotop"
        style=""
        data-v-c6073ba8=""
      >
        <svg
          t="1574745035067"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5404"
          class="icon"
          data-v-c6073ba8=""
        >
          <path
            d="M526.60727968 10.90185116a27.675 27.675 0 0 0-29.21455937 0c-131.36607665 82.28402758-218.69155461 228.01873535-218.69155402 394.07834331a462.20625001 462.20625001 0 0 0 5.36959153 69.94390903c1.00431239 6.55289093-0.34802892 13.13561351-3.76865779 18.80351572-32.63518765 54.11355614-51.75690182 118.55860487-51.7569018 187.94566865a371.06718723 371.06718723 0 0 0 11.50484808 91.98906777c6.53300375 25.50556257 41.68394495 28.14064038 52.69160883 4.22606766 17.37162448-37.73630017 42.14135425-72.50938081 72.80769204-103.21549295 2.18761121 3.04276886 4.15646224 6.24463696 6.40373557 9.22774369a1871.4375 1871.4375 0 0 0 140.04691725 5.34970492 1866.36093723 1866.36093723 0 0 0 140.04691723-5.34970492c2.24727335-2.98310674 4.21612437-6.18497483 6.3937923-9.2178004 30.66633723 30.70611158 55.4360664 65.4791928 72.80769147 103.21549355 11.00766384 23.91457269 46.15860503 21.27949489 52.69160879-4.22606768a371.15156223 371.15156223 0 0 0 11.514792-91.99901164c0-69.36717486-19.13165746-133.82216804-51.75690182-187.92578088-3.42062944-5.66790279-4.76302748-12.26056868-3.76865837-18.80351632a462.20625001 462.20625001 0 0 0 5.36959269-69.943909c-0.00994388-166.08943902-87.32547796-311.81420293-218.6915546-394.09823051zM605.93803103 357.87693858a93.93749974 93.93749974 0 1 1-187.89594924 6.1e-7 93.93749974 93.93749974 0 0 1 187.89594924-6.1e-7z"
            p-id="5405"
            data-v-c6073ba8=""
          ></path>
          <path
            d="M429.50777625 765.63860547C429.50777625 803.39355007 466.44236686 1000.39046097 512.00932183 1000.39046097c45.56695499 0 82.4922232-197.00623328 82.5015456-234.7518555 0-37.75494459-36.9345906-68.35043303-82.4922232-68.34111062-45.57627738-0.00932239-82.52019037 30.59548842-82.51086798 68.34111062z"
            p-id="5406"
            data-v-c6073ba8=""
          ></path>
        </svg>
      </div>
    </transition>
  </div>
</template>

<script>
// import Waves from "./components/theme/Waves";
import NavBar from "@/components/common/NavBar";
// import APlayer from '@/components/common/APlayer'
// import particlesJson from "../public/particles.json";
export default {
  data() {
    return {
      //是否回到顶部
      gotop: false
    };
  },
  methods: {
    handleScroll() {
      let scrolltop =
        document.documentElement.scrollTop || document.body.scrollTop;
      scrolltop > 150 ? (this.gotop = true) : (this.gotop = false);
    },
    //回到顶部
    goToTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 定时器实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    }
  },
  components: {
    // Waves,
    NavBar
  },
  created() {
    //看板娘
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: "../live2dw/",
        pluginJsPath: "lib/",
        pluginModelPath: "live2d-widget-model-haru_2/assets/", //中间这个haru_2就是你的老婆,想换个老婆,换这个就可以了
        tagMode: false,
        debug: false,
        model: {
          jsonPath:
            "../live2dw/live2d-widget-model-haru_2/assets/haru02.model.json"
        },
        display: { position: "right", width: 110, height: 300 }, //调整大小,和位置
        mobile: { show: true }, //要不要盯着你的鼠标看
        log: false
      });
    }, 500);
  },
  mounted() {
    // 此处true需要加上，不加滚动事件可能绑定不成功
    window.addEventListener("scroll", this.handleScroll, true);
    // require("particles.js");
    // // eslint-disable-next-line no-undef
    // particlesJS("particles", particlesJson);
  }
  //异步加载，先加载出player再使用
};
</script>

<style lang="scss">
body,
p,
h1,
h2,
h3 {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.back-to-ceiling {
  position: fixed;
  display: inline-block;
  text-align: center;
  right: 8rem;
  bottom: 3rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  line-height: 2.5rem;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  .icon {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 26px;
    height: 26px;
    fill: #409eff;
  }
}
.plus-icon-enter-active {
  transition: opacity 1s;
}
.plus-icon-enter {
  opacity: 0;
}
.plus-icon-leave-active {
  transition: opacity 1s;
}
.plus-icon-leave-to {
  opacity: 0;
}

.vwrap,
.vsys,
.vcontent {
  background: #f3f4f4;
}
.vcontent {
  border-radius: 0.25rem;
  margin: 0 0.3rem;
  padding: 8px;
}
#particles {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(135, 183, 255);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}

::-webkit-scrollbar-track {
  --webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  // border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  // border-radius: 5px;
  background: #409eff;
  --webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 0, 0, 0.4);
}
</style>

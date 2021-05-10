<template>
  <div class="aboutMe">
    <!-- 粒子背景特效 -->
    <div id="particles"></div>
    <el-container>
      <el-main>
        <div class="aboutMeContent">
          <!-- <div class="leftContent"></div> -->
          <div class="Content">
            <el-card>
              <div class="baseInfo" id="baseInfo">
                <h3>基本信息</h3>
                <ul>
                  <li>{{ baseForm.nickname }}</li>
                  <li>{{ baseForm.email }}</li>
                  <li>{{ baseContent1 }}</li>
                  <li>{{ baseContent2 }}</li>
                </ul>
              </div>
            </el-card>

            <el-card class="workInfo" id="workInfo">
              <div>
                <h3>工作经历</h3>
                <h4>2020.11~今 中电福富信息科技有限公司</h4>
                <p>前端开发工程师实习生</p>
              </div>
            </el-card>
            <el-card class="projectInfo" id="projectInfo">
              <div>
                <h3>项目经历</h3>
                <h4>电商后台管理系统</h4>
                <p>
                  1. 项目简介：本项目基于 vue 和 element-ui
                  实现，使用网络视频课程中提供的数据接口完成了电商后台管理的基
                  本页面（登录页、后台管理页，数据的增删改查等）
                </p>
                <p>2. 项目亮点：</p>
                <ul>
                  <li>
                    使用了大量 Element UI 组件快速构建页面，如：Layout
                    布局、Icon 图标、Form 表单、Message 消息提示、 Container
                    布局容器、Input 输入框、NavMenu 导航菜单等
                  </li>
                  <li>使用了 Vue Router 进行前端路由跳转，登录路由导航等</li>
                  <li>使用了 sessionStorage 存储用户登录的 token</li>
                  <li>使用 axios 配置网络数据请求接口</li>
                </ul>
                <p>3.涉及技术：Vue、Vue Router、axios、Element 等</p>
              </div>
            </el-card>
            <el-card class="projectInfo">
              <div>
                <h4>仿网易云音乐</h4>
                <p>
                  1. 项目简介：本项目是本人在自学完成小撩买菜 APP
                  后进行的练手项目，使用 vue 组件化思想，网易云音乐提供
                  的数据接口完成了仿网易云音乐的基本页面（真实手机号密码或验证码登录、发现页、我的、电台、视频、搜索）
                </p>
                <p>2. 项目亮点：</p>
                <ul>
                  <li>
                    使用了大量 Vant UI 组件快速构建页面，如：Layout 布局、Icon
                    图标、Search 搜索、Grid 宫格、Cell 单元格、 Field
                    输入框、Tab 标签页、Sticky 粘性布局、Progress 进度条、Toast
                    提示等
                  </li>
                  <li>使用了 Vue Router 进行前端路由跳转，登录路由导航等</li>
                  <li>使用了 localStorage 存储用户登录的 token</li>
                  <li>使用 Vuex 完成用户信息的添加、删除</li>
                  <li>
                    使用了封装思想，封装 axios
                    网络数据请求接口；封装其他主页面可复用的顶部导航栏、单首歌曲、歌单详情、
                    播放歌曲页、视频列表等组件，易于使用和维护
                  </li>
                  <li>使用 Vant-Loading 页面加载，Lazyload 图片懒加载</li>
                </ul>
                <p>3.涉及技术：Vue、Vue Router、Vuex、axios、Vant、Swiper 等</p>
              </div>
            </el-card>
          </div>
          <!-- 右侧卡片 -->
          <userInfo />
        </div>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import userInfo from "../../components/common/UserInfo";
import particlesJson from "../../../public/particles.json";
import { getUserInfoById } from "@/api/index.js";
export default {
  data() {
    return {
      //个人基本信息
      baseForm: {},
      //个人简介
      baseContent1: "",
      baseContent2: ""
    };
  },
  components: {
    userInfo
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    //请求个人信息数据
    async getUserInfo() {
      const { data: res } = await getUserInfoById(2);
      this.baseForm = res.result_data;
      this.baseContent1 = this.baseForm.content.slice(0, 12);
      this.baseContent2 = this.baseForm.content.slice(13);
    }
  },
  mounted() {
    //粒子背景特效配置
    require("particles.js");
    // eslint-disable-next-line no-undef
    particlesJS("particles", particlesJson);
  }
};
</script>

<style lang="scss" scoped>
.aboutMe {
  position: absolute;
  top: 3.6rem;
  width: 100%;
  // height: 100%;
  left: 0;
  .el-main {
    padding: 0;
  }
  .aboutMeContent {
    transition: all 0.25s ease-in-out 0.16s;
    transform: translateY(0px);
    opacity: 1;
    display: flex;
    align-items: flex-start;
    margin: 20px auto 0;
    padding: 0 20px;
    max-width: 900px;
    // .leftContent {
    //   flex: 0 0 200px;
    //   width: 0;
    //   height: 100%;
    // }
    .Content {
      flex: auto;
      width: 0;
      .workInfo,
      .projectInfo {
        margin-top: 20px;
      }
    }
  }
  .el-card {
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
    }
  }
  p {
    margin: 10px;
  }
  .el-timeline {
    position: fixed;
    top: 20%;
    left: 18%;
    z-index: 999;
  }
}
#particles {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(135, 183, 255);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
</style>

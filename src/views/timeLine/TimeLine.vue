<template>
  <div class="timeLine">
    <div id="particles"></div>
    <el-container>
      <el-main>
        <!-- 时间流 -->
        <div class="timeLineContent">
          <el-timeline>
            <el-timeline-item
              v-for="item in blogBaseList"
              :key="item.id"
              :timestamp="(parseInt(item.create_time) * 1000) | formatDate"
              placement="top"
              @click.native="goArticle(item)"
            >
              <el-card>
                <a>{{ item.title }}</a>
                <!-- <el-divider></el-divider> -->
                <!-- <p>{{ item.classify }}</p> -->
              </el-card>
            </el-timeline-item>
          </el-timeline>
          <userInfo />
        </div>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import { getArticleList } from "../../api/articles.js";
import userInfo from "../../components/common/UserInfo";
import particlesJson from "../../../public/particles.json";
export default {
  data() {
    return {
      //文章列表
      blogBaseList: []
    };
  },
  components: {
    userInfo
  },
  methods: {
    //获取文章列表数据
    async getArticleList() {
      const { data: res } = await getArticleList();
      this.blogBaseList = res.result_data.items;
    },
    //点击前往详情页
    goArticle(item) {
      this.$router.push(`/article/${item.id}`);
    }
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  created() {
    this.getArticleList();
  },
  mounted() {
    //粒子特效配置
    require("particles.js");
    // eslint-disable-next-line no-undef
    particlesJS("particles", particlesJson);
  }
};
</script>

<style lang="scss" scoped>
.timeLine {
  position: absolute;
  top: 3.6rem;
  width: 100%;
  // height: 100%;
  left: 0;
  .el-main {
    padding: 0;
  }
  .timeLineContent {
    transition: all 0.25s ease-in-out 0.16s;
    transform: translateY(0px);
    opacity: 1;
    display: flex;
    align-items: flex-start;
    margin: 20px auto 0;
    padding: 0 20px;
    max-width: 930px;
    .el-timeline {
      flex: auto;
      width: 0;
    }
  }
  .el-card {
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
      cursor: pointer;
      color: #409eff;
    }
  }
}
::v-deep .el-timeline-item__timestamp {
  color: #000;
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

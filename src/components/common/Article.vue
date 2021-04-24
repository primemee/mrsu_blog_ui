<template>
  <div class="article">
    <div id="particles"></div>
    <el-container>
      <el-main>
        <div class="articleContent">
          <div class="content1">
            <div class="articleHead">
              <h3>{{ articleDetail.title }}</h3>
              <div class="articleBaseInfo">
                <i class="el-icon-user-solid"></i>
                <p>Mr.Su</p>
                <i class="el-icon-time"></i>
                <p>
                  {{
                    (parseInt(articleDetail.update_time) * 1000) | formatDate
                  }}
                </p>
                <i class="el-icon-price-tag" style="marginRight:10px"></i>
                <div
                  v-for="(item, index) in classify"
                  type="primary"
                  :key="index"
                  style="marginRight:10px"
                >
                  {{ item }}
                </div>
                <i
                  class="el-icon-view"
                  style="marginLeft:5px;marginRight:5px"
                ></i>
                <p>{{ articleDetail.number }}</p>
                <!-- <el-tag type="primary">{{ articleDetail.classify }}</el-tag> -->
                <!-- <p></p> -->
              </div>
            </div>
            <div class="content">
              <div class="quill-editor ql-container ql-snow ">
                <div class="ql-editor" v-html="articleDetail.content"></div>
              </div>
            </div>
            <recomArticle />
          </div>
          <userInfo />
        </div>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import { getArticleListById, articleNumUpd } from "../../api/articles.js";
import userInfo from "./UserInfo";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import recomArticle from "../common/RecoArticle";
import particlesJson from "../../../public/particles.json";

export default {
  data() {
    return {
      articleDetail: {},
      classify: []
    };
  },
  components: {
    userInfo,
    recomArticle
  },
  methods: {
    async getArticleListById() {
      let that = this;
      const { data: res } = await getArticleListById(this.$route.params.id);
      that.articleDetail = res.result_data;
      that.classify = that.articleDetail.classify.split(",");
      // console.log(that.classify);
      setTimeout(function() {
        articleNumUpd({
          id: that.articleDetail.id,
          number: that.articleDetail.number + 1
        }).then(() => {
          // console.log(res);
        });
      }, 5000);
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
    this.getArticleListById();
  },
  mounted() {
    this.getArticleListById(this.$route.query.q);
    require("particles.js");
    // eslint-disable-next-line no-undef
    particlesJS("particles", particlesJson);
  },
  watch: {
    $route(v) {
      this.getArticleListById(v.query.q);
    }
  }
};
</script>

<style lang="scss" scoped>
.article {
  position: absolute;
  top: 3.6rem;
  left: 0;
  width: 100%;
  // height: 100%;
  .el-main {
    padding: 0;
  }
  .articleContent {
    transition: all 0.25s ease-in-out 0.16s;
    transform: translateY(0px);
    opacity: 1;
    display: flex;
    align-items: flex-start;
    margin: 20px auto 0;
    padding: 0 20px;
    max-width: 1100px;
    .content1 {
      // margin: 20px auto 0;
      // padding: 0 20px;
      // max-width: 800px;
      // min-width: 750px;
      flex: auto;
      width: 0;
      .ql-container.ql-snow {
        border: 0px solid #ccc;
      }
      .articleHead {
        margin-top: 10px;
        // margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        color: #000;
        h3 {
          font-size: 1.6rem;
        }
        .articleBaseInfo {
          margin-top: 5px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          height: 40px;
          .el-icon-time,
          .el-icon-price-tag {
            padding-left: 10px;
          }
          p {
            padding-left: 8px;
          }
        }
      }
    }
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

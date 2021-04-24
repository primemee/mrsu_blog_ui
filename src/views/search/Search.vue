<template>
  <div class="search">
    <div id="particles"></div>
    <el-container>
      <el-main>
        <div class="searchContent">
          <!-- 博客列表 -->
          <div class="blogList" v-if="isSearchResult">
            <div style="marginTop:20px">
              <h4>
                搜索结果:
              </h4>
            </div>
            <el-card
              class="blogBaseInfo"
              v-for="(item, index) in blogBaseList"
              :key="'info1-' + index"
              @click.native="toArticleDetail(item.id)"
            >
              <div>
                <div class="aTitle">
                  <a>{{ item.title }}</a>
                  <p>阅读量:{{ item.number }}</p>
                </div>
                <div class="blogUser">
                  <i class="el-icon-user-solid"></i>
                  <p>Mr.Su</p>
                  <i class="el-icon-time"></i>
                  <p>{{ (parseInt(item.update_time) * 1000) | formatDate }}</p>
                  <i class="el-icon-price-tag"></i>
                  <div
                    v-for="(item1, index1) in item.classify.split(',')"
                    type="text"
                    :key="'info2-' + index1"
                    style="marginRight:10px"
                  >
                    {{ item1 }}
                  </div>
                </div>
              </div>
            </el-card>
            <!-- 分页 -->
            <el-pagination
              style="text-align:center"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="PageSize"
              layout="total, prev, pager, next, jumper"
              :total="articleNum"
              background
            >
            </el-pagination>
            <el-divider></el-divider>
            <div style="marginTop:20px">
              <h4>
                其他博文推荐:
              </h4>
            </div>
            <el-card
              class="blogRecomList"
              v-for="(item, index) in blogRecomList"
              :key="'info3-' + index"
              @click.native="toArticleDetail(item.id)"
            >
              <div>
                <div class="recTitle">
                  <a>{{ item.title }}</a>
                  <p>阅读量:{{ item.number }}</p>
                </div>
                <div class="user">
                  <i class="el-icon-user-solid"></i>
                  <p>Mr.Su</p>
                  <i class="el-icon-time"></i>
                  <p>
                    {{ (parseInt(item.update_time) * 1000) | formatDate }}
                  </p>
                  <i class="el-icon-price-tag" style="marginRight:10px"></i>
                  <div
                    v-for="(item1, index1) in item.classify.split(',')"
                    type="text"
                    :key="'info4-' + index1"
                    style="marginRight:10px"
                  >
                    {{ item1 }}
                  </div>
                </div>
              </div>
            </el-card>
          </div>
          <div class="blogList" v-else>
            <el-card style="lineHeight:5">
              <h1 style="textAlign:center">
                抱歉! 没有你想要的结果！ 小二 又在偷懒了 (ー`´ー)
              </h1>
            </el-card>
            <el-card style="marginTop:20px">
              <h1 style="textAlign:center">
                👇其他博文推荐👇
              </h1>
            </el-card>
            <el-card
              class="blogRecomList"
              v-for="(item, index) in blogRecomList"
              :key="'info5-' + index"
              @click.native="toArticleDetail(item.id)"
            >
              <div>
                <div class="recTitle">
                  <a>{{ item.title }}</a>
                  <p>阅读量:{{ item.number }}</p>
                </div>
                <div class="user">
                  <i class="el-icon-user-solid"></i>
                  <p>Mr.Su</p>
                  <i class="el-icon-time"></i>
                  <p>
                    {{ (parseInt(item.update_time) * 1000) | formatDate }}
                  </p>
                  <i class="el-icon-price-tag" style="marginRight:10px"></i>
                  <div
                    v-for="(item1, index1) in item.classify.split(',')"
                    type="text"
                    :key="'info6-' + index1"
                    style="marginRight:10px"
                  >
                    {{ item1 }}
                  </div>
                </div>
              </div>
            </el-card>
          </div>
          <userInfo />
        </div>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import { articleSearchByTitle, getArticleList } from "../../api/articles.js";
import userInfo from "../../components/common/UserInfo";
import particlesJson from "../../../public/particles.json";
export default {
  data() {
    return {
      blogBaseList: [],
      blogRecomList: [],
      //页码
      currentPage: 1,
      PageSize: 5,
      row_start_number: 0,
      articleNum: 0,
      isSearchResult: true
    };
  },
  components: {
    userInfo
  },
  methods: {
    handleCurrentChange(value) {
      this.currentPage = value;
      this.row_start_number = (value - 1) * this.PageSize;
      this.searchArticle();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    toArticleDetail(id) {
      this.$router.push(`/article/${id}`);
    },
    async searchArticle() {
      const { data: res } = await articleSearchByTitle({
        keyword: this.$route.query.q,
        type: 0,
        status: 0,
        row_count: this.PageSize,
        row_start: this.row_start_number
      });
      this.blogBaseList = res.result_data.items;
      this.articleNum = res.total_row;
      if (this.articleNum === 0) {
        this.isSearchResult = false;
      } else {
        this.isSearchResult = true;
      }
      const { data: res1 } = await getArticleList({
        type: 0,
        status: 0,
        row_count: 5,
        row_start: 0
      });
      this.blogRecomList = res1.result_data.items;
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
  mounted() {
    this.searchArticle(this.$route.query.q);
    require("particles.js");
    // eslint-disable-next-line no-undef
    particlesJS("particles", particlesJson);
  },
  watch: {
    $route(v) {
      this.searchArticle(v.query.q);
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  position: absolute;
  top: 3.6rem;
  width: 100%;
  // height: 100%;
  left: 0;
  .el-main {
    padding: 0;
  }
  .searchContent {
    transition: all 0.25s ease-in-out 0.16s;
    transform: translateY(0px);
    opacity: 1;
    display: flex;
    align-items: flex-start;
    margin: 20px auto 0;
    padding: 0 20px;
    max-width: 996px;
  }
  .blogList {
    flex: auto;
    width: 0;
    .blogBaseInfo {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      margin: 0 auto 20px;
      color: #535353;
      width: 100%;
      overflow: hidden;
      transition: all 0.3s;
      .blogUser {
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
      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
      }
    }
    .aTitle {
      position: relative;
      height: 31px;
      a {
        font-size: 1.28rem;
        color: #000;
        font-weight: 500;
        margin: 0 !important;
        float: left;
        &:hover {
          border-bottom: 3px solid #409eff;
          color: #409eff;
        }
      }
      p {
        font-size: 14px;
        position: absolute;
        left: 85%;
      }
    }
  }
  .blogRecomList {
    margin-top: 20px;
    .recTitle {
      display: flex;
      position: relative;
      height: 30px;
      a {
        font-size: 1.28rem;
        color: #000;
        font-weight: 500;
        margin: 0 !important;
        float: left;
        &:hover {
          border-bottom: 3px solid #409eff;
          color: #409eff;
        }
      }
      p {
        font-size: 14px;
        position: absolute;
        left: 85%;
      }
    }
    .user {
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

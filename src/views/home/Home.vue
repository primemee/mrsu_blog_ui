<template>
  <!-- 主页 -->
  <div class="home">
    <el-container>
      <el-main>
        <!-- 图片及标语 -->
        <div class="blogImg">
          <div class="blogImgFont">
            <h1>Always believe that something wonderful is about to happen</h1>
            <p>永远相信美好的事情即将发生</p>
          </div>
        </div>
        <div id="particles"></div>
        <div class="Contain">
          <transition name="blogLoading">
            <!-- 博客列表 -->
            <div class="blogList">
              <el-card
                class="blogBaseInfo"
                v-for="(item, index) in blogBaseList"
                :key="index"
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
                    <p>
                      {{ (parseInt(item.update_time) * 1000) | formatDate }}
                    </p>
                    <i class="el-icon-price-tag" style="marginRight:10px"></i>
                    <div
                      v-for="(item1, index) in item.classify.split(',')"
                      type="text"
                      :key="index"
                      style="marginRight:10px"
                    >
                      {{ item1 }}
                    </div>
                  </div>
                </div>
              </el-card>
              <!-- 分页 -->
              <el-pagination
                style="text-align:center;"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="PageSize"
                layout="total, prev, pager, next, jumper"
                :total="articleNum"
                background
              >
              </el-pagination>
            </div>
          </transition>
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
import particlesJson from "../../../public/particles.json"; // 这是我自己的文件路径哈
export default {
  data() {
    return {
      //博文列表
      blogBaseList: [],
      //当前页码
      currentPage: 1,
      PageSize: 8,
      row_start_number: 0,
      articleNum: 0
    };
  },
  components: {
    userInfo
  },
  methods: {
    async getArticleList() {
      const { data: res } = await getArticleList({
        status: 0,
        type: 0,
        row_count: this.PageSize,
        row_start: this.row_start_number
      });
      this.blogBaseList = res.result_data.items;
      this.articleNum = res.total_row;
    },
    handleCurrentChange(value) {
      this.currentPage = value;
      this.row_start_number = (value - 1) * this.PageSize;
      this.getArticleList();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    toArticleDetail(id) {
      this.$router.push(`/article/${id}`);
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
    require("particles.js");
    // eslint-disable-next-line no-undef
    particlesJS("particles", particlesJson);
  }
};
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  top: 3.6rem;
  width: 100%;
  // height: 100%;
  left: 0;
  .el-main {
    padding: 0;
  }
  .blogImg {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 25rem;
    background: url("../../assets/images/bg.jpg") right center / cover no-repeat;
  }
  .blogImgFont {
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 1.6rem;
    }
  }
  .Contain {
    transition: all 0.25s ease-in-out 0.16s;
    transform: translateY(0px);
    opacity: 1;
    display: flex;
    align-items: flex-start;
    margin: 20px auto 0;
    padding: 0 20px;
    max-width: 996px;
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
  }
}
#particles {
  position: absolute;
  width: 100%;
  height: 80%;
  background-color: rgb(135, 183, 255);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
</style>

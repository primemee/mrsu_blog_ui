<template>
  <div class="recoArticle">
    <el-divider></el-divider>
    <div style="marginTop:20px">
      <h4>
        其他博文推荐:
      </h4>
    </div>
    <!-- <el-divider></el-divider> -->
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
          <i class="el-icon-price-tag"></i>
          <p>{{ item.classify }}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getArticleList } from "@/api/articles.js";
export default {
  data() {
    return {
      //博文列表
      blogBaseList: []
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    //请求文章列表数据
    async getArticleList() {
      const { data: res } = await getArticleList({
        type: 0,
        status: 0,
        row_count: 5,
        row_start: 0
      });
      this.blogBaseList = res.result_data.items;
    },
    //文章详情页
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
  }
};
</script>

<style lang="scss" scoped>
.recoArticle {
  margin-top: 30px;
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
</style>

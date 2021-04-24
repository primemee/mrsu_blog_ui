<template>
  <div class="tag">
    <div class="tagContent">
      <div class="tagList">
        <el-tag> 1431313</el-tag>
        <el-tag> 1431313</el-tag>
        <el-tag> 1431313</el-tag>
        <el-tag> 1431313</el-tag>
        <el-tag> 1431313</el-tag>
        <el-tag> 1431313</el-tag>
        <el-tag> 1431313</el-tag>
        <el-tag> 1431313</el-tag>
        <el-tag> 1431313</el-tag>
        <el-tag> 1431313</el-tag>
        <el-tag> 1431313</el-tag>
        <el-tag> 1431313</el-tag>
        <el-tag> 1431313</el-tag>
        <el-tag> 1431313</el-tag>
        <el-tag> 1431313</el-tag>
        <el-tag> 1431313</el-tag>
        <el-tag> 1431313</el-tag>
        <el-tag> 1431313</el-tag>
      </div>
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
              <a>{{ item.blogName }}</a>
            </div>
            <div class="blogUser">
              <i class="el-icon-user-solid"></i>
              <p>{{ item.userName }}</p>
              <i class="el-icon-time"></i>
              <p>2021-01-03 21:19:00</p>
              <i class="el-icon-price-tag"></i>
              <p>{{ item.tag }}</p>
            </div>
          </div>
        </el-card>
        <!-- 分页 -->
        <el-pagination
          style="text-align:center"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="100"
          layout="total, prev, pager, next, jumper"
          :total="400"
          background
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogBaseList: [
        {
          blogName: "GitHubsddwdwwdwwddwwad",
          userName: "Su",
          tag: "Life",
          id: 1
        },
        {
          blogName: "GitHubsdwad",
          userName: "Su",
          tag: "Life",
          id: 2
        },
        {
          blogName: "GitHubsdwad",
          userName: "Su",
          tag: "Life",
          id: 3
        },
        {
          blogName: "GitHubsdwad",
          userName: "Su",
          tag: "Life",
          id: 4
        }
      ],
      //页码
      currentPage: 1
    };
  },
  methods: {
    handleCurrentChange() {},
    toArticleDetail(id) {
      this.$router.push(`/article/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.tag {
  position: absolute;
  top: 3.6rem;
  left: 0;
  width: 100%;
  .tagContent {
    margin: 20px auto 0;
    padding: 0 20px;
    max-width: 800px;
    .tagList .el-tag--small {
      margin: 6px;
      &:hover {
        transform: scale(1.2);
        transition: all 0.5s;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
  .blogList {
    margin-top: 20px;
    margin-bottom: 20px;
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
        &:hover {
          border-bottom: 3px solid #409eff;
          color: #409eff;
        }
      }
    }
  }
}
</style>

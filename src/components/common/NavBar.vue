<template>
  <!-- 顶部导航栏 -->
  <el-header height="3.6rem" class="navBar">
    <el-row justify="start" :gutter="20" align="middle">
      <el-col :span="4">
        <router-link to="/home">
          <div class="userPicName">
            <img
              src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2855204159,1294025145&fm=26&gp=0.jpg"
              alt=""
            />
            <span class="blogName">{{ baseForm.nickname }}的个人博客</span>
          </div>
        </router-link>
      </el-col>
      <el-col :span="4" :offset="11">
        <el-input
          placeholder="请输入文章名称"
          prefix-icon="el-icon-search"
          v-model="inputSearch"
          style="width:100%"
          @change="searchByTitle"
          clearable
          maxlength="11"
        >
        </el-input>
      </el-col>
      <el-col :span="1">
        <router-link to="/timeLine">
          <div class="navItem">
            <i class="el-icon-time"></i>
            <span class="navFont">时间轴</span>
          </div>
        </router-link>
      </el-col>
      <el-col :span="1">
        <router-link to="/messageBoard">
          <div class="navItem">
            <i class="el-icon-s-comment"></i>
            <span class="navFont">留言板</span>
          </div>
        </router-link>
      </el-col>
      <el-col :span="1">
        <router-link to="/aboutMe">
          <div class="navItem">
            <i class="el-icon-menu"></i>
            <span class="navFont">关于我</span>
          </div>
        </router-link>
      </el-col>
      <el-col :span="2">
        <!-- <router-link to="/messageBoard"> -->
        <!-- <div class="navItem">
            <i class="el-icon-s-promotion"></i>
            <span class="navFont">更多</span>
          </div> -->
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-s-promotion"></i>
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>GitHub地址</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- </router-link> -->
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
// import { articleSearchByTitle } from "../../api/articles.js";
import { getUserInfoById } from "../../api/index.js";
export default {
  data() {
    return {
      inputSearch: "",
      baseForm: {}
    };
  },
  methods: {
    async getUserInfo() {
      const { data: res } = await getUserInfoById(2);
      this.baseForm = res.result_data;
    },
    searchByTitle() {
      // const { data: res } = await articleSearchByTitle({
      //   keyword: this.inputSearch,
      //   status: 0,
      // });
      this.$router.push({
        path: "/search",
        query: {
          q: this.inputSearch
        }
      });
    }
  },
  created() {
    this.getUserInfo();
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  right: 0;
  height: 3.6rem;
  background-color: #fff;
  padding: 0.7rem 1.5rem;
  line-height: 2.2rem;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
}
a {
  text-decoration: none;
}
.userPicName {
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .blogName {
    padding-left: 10px;
    font-size: 1.2rem;
    font-weight: 600;
    color: #232321;
    position: relative;
  }
}

.navItem {
  // display: flex;
  // align-items: center;
  height: 2.5rem;
  color: #535353;
  line-height: 2.5rem;
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
  .navFont {
    font-size: 0.8rem;
    height: 2rem;
    line-height: 2rem;
    margin-left: 0.075rem;
    position: absolute;
    top: 10%;
  }
}
.router-link-exact-active > .navItem {
  color: #409eff;
}
.el-dropdown-link {
  cursor: pointer;
  font-size: 0.8rem;
  &:hover {
    color: #409eff;
  }
}
.el-icon-arrow-down {
  font-size: 0.8rem;
}
</style>

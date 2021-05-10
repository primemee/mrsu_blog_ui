<template>
  <!-- 用户信息 -->
  <div class="userInfo">
    <el-card>
      <div class="user">
        <div class="userPic" @click="clickToMe">
          <img
            src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2855204159,1294025145&fm=26&gp=0.jpg"
            alt=""
          />
        </div>
        <p @click="clickToMe">{{ baseForm.nickname }}</p>
      </div>
      <!-- TOP 5 -->
      <div class="category">
        <div class="cateHead">
          <i class="el-icon-menu"></i>
          <span class="navFont">TOP 5</span>
        </div>
        <el-card class="cateList" v-for="item in articleList" :key="item.id">
          <a @click="goArticle(item)">{{ item.title }}</a>
          <i class="el-icon-view">
            <p>{{ item.number }}</p>
          </i>
        </el-card>
      </div>
      <!-- 标签 -->
      <div class="tag">
        <div class="tagHead">
          <i class="el-icon-price-tag"></i>
          <span class="navFont">Tag</span>
        </div>
        <div id="tagscloud">
          <a
            v-for="item in tagList"
            :key="item.id"
            :style="{ background: randomColor() }"
            @click="getSearch(item)"
            >{{ item.title }}</a
          >
        </div>
      </div>
      <!-- 友情链接 -->
      <div class="friendLink">
        <div class="friendLinkHead">
          <i class="el-icon-link"></i>
          <span class="navFont">Friend Link</span>
        </div>
        <div class="friendLinkList">
          <el-popover
            class="popover"
            placement="top"
            title="vuepress-theme-reco"
            width="200"
            trigger="hover"
            content="A simple and beautiful vuepress Blog & Doc theme."
          >
            <el-button slot="reference" @click="friendLinkTo"
              >vuepress-theme-reco</el-button
            >
          </el-popover>
          <el-popover
            class="popover"
            placement="top"
            title="vuepress-theme-reco"
            width="200"
            trigger="hover"
            content="A simple and beautiful vuepress Blog & Doc theme."
          >
            <el-button slot="reference" @click="friendLinkTo"
              >me-reco</el-button
            >
          </el-popover>
          <el-popover
            class="popover"
            placement="top"
            title="vuepress-theme-reco"
            width="200"
            trigger="hover"
            content="A simple and beautiful vuepress Blog & Doc theme."
          >
            <el-button slot="reference" @click="friendLinkTo"
              >vuepreso</el-button
            >
          </el-popover>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getArticleList } from "../../api/articles.js";
import { getUserInfoById } from "../../api/index.js";
import coldTag from "../../utils/coldTag";
export default {
  data() {
    return {
      tagList: [
        {
          title: "ES6",
          id: 1
        },
        {
          title: "vue",
          id: 2
        },
        {
          title: "nodejs",
          id: 3
        },
        {
          title: "java",
          id: 4
        },
        {
          title: "webpack",
          id: 5
        },
        {
          title: "mysql",
          id: 6
        },
        {
          title: "linux",
          id: 7
        },
        {
          title: "jenkins",
          id: 8
        },
        {
          title: "nginx",
          id: 9
        },
        {
          title: "css",
          id: 10
        }
      ],
      //tag颜色数组
      colorList: [
        "494ca2",
        "0075f6",
        "1d1919",
        "421b9b",
        "8293ff",
        "302387",
        "e88a1a",
        "6d70c6",
        "78b0a0",
        "f8d0b0",
        "ebebe3",
        "74b49b",
        "509aaf",
        "12e6c8",
        "573697",
        "ca431d",
        "f7aa00",
        "4ab8b8",
        "1a2c5b",
        "5628b4"
      ],
      //博文数量
      articleNum: 0,
      //文章列表
      articleList: [],
      //个人基本信息
      baseForm: {}
    };
  },
  methods: {
    //获取文章列表数据
    async getArticleList() {
      const { data: res } = await getArticleList({
        status: 0,
        row_start: 0,
        row_count: 5,
        order_key: [["number", "DESC"]]
      });
      this.articleList = res.result_data.items;
    },
    //获取个人信息数据
    async getUserInfo() {
      const { data: res } = await getUserInfoById(2);
      this.baseForm = res.result_data;
    },
    //点击友情链接
    friendLinkTo() {
      window.open("https://vuepress-theme-reco.recoluan.com/");
    },
    /**
     * 产生随机整数，包含下限值，包括上限值
     * @param {Number} lower 下限
     * @param {Number} upper 上限
     * @return {Number} 返回在下限到上限之间的一个随机整数
     */
    random(lower, upper) {
      return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    },
    randomColor() {
      // 随机生成 rgb 值，每个颜色值在 0 - 255 之间
      /*				var r = this.random(0, 256),
									g = this.random(0, 256),
									b = this.random(0, 256);
								var result = "rgb(" + r + "," + g + "," + b + ")";*/
      let max = this.colorList.length;
      this.colorList[this.random(0, max)];
      return "#" + this.colorList[this.random(0, max)];
    },
    //触发搜索
    getSearch(item) {
      this.$router.push({
        path: "/search",
        query: {
          q: item.title
        }
      });
    },
    //文章详情
    goArticle(item) {
      this.$router.push(`/article/${item.id}`);
    },
    //关于我
    clickToMe() {
      this.$router.push("/aboutMe");
    }
  },
  created() {
    this.getArticleList();
    this.getUserInfo();
  },
  mounted() {
    //在下次 DOM 更新循环结束之后执行延迟回调  当数据更新了，在dom中渲染后，自动执行该函数
    this.$nextTick(() => {
      coldTag.winOnload();
    });
  }
};
</script>

<style lang="scss" scoped>
.userInfo {
  flex: 0 0 300px;
  padding: 0 15px;
  margin-left: 0.1875rem;
  .user {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    border-bottom: 1px solid #eaecef;
    .userPic {
      width: 80px;
      height: 80px;
      margin: 0 0 0 5.5rem;
      text-align: center;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    p {
      cursor: pointer;
      text-align: center;
      font-size: 14px;
      margin-top: 1.125rem;
    }
    .articleTagNum {
      margin-top: 1.125rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 50%;
      .articleNum,
      .tagNum {
        text-align: center;
        width: 50%;
        p {
          font-size: 12px;
        }
      }
      .articleNum {
        border-right: 1px solid #000;
      }
    }
  }
  .category {
    margin-top: 20px;
    border-bottom: 1px solid #eaecef;
    padding-bottom: 20px;
    .cateHead {
      .navFont {
        padding-left: 5px;
        font-size: 15px;
      }
    }
    .cateList {
      position: relative;
      margin-top: 10px;
      .cateTag {
        position: absolute;
        right: 10px;
      }
      &:hover {
        transform: scale(1.1);
        transition: all 0.5s;
        color: #409eff;
      }
      a {
        width: 100%;
        height: 100%;
      }
      i {
        font-size: 13px;
        position: absolute;
        left: 80%;
        display: flex;
        p {
          padding-left: 8px;
        }
      }
    }
  }
  .tag {
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eaecef;
    .tagHead {
      .navFont {
        padding-left: 5px;
        font-size: 15px;
      }
    }
    .tagList {
      margin-top: 20px;
    }
  }
  .friendLink {
    margin-top: 20px;
    padding-bottom: 20px;
    .friendLinkHead {
      .navFont {
        padding-left: 5px;
        font-size: 15px;
      }
    }
    .friendLinkList {
      margin-top: 20px;
    }
  }
}

#tagscloud {
  height: 260px;
  position: relative;
  text-align: center;
  z-index: 1;
}

#tagscloud a {
  color: #fff;
  position: absolute;
  top: 0px;
  left: 0px;
  text-decoration: none;
  margin: 0 10px 15px 0;
  line-height: 18px;
  padding: 1px 5px;
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
}

#tagscloud a:hover {
  background: #2f4bff !important;
}
</style>
<style lang="scss">
.blogBaseInfo .el-card__body {
  padding: 20px 0 10px 20px;
}
.userInfo .el-card {
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
  }
}
.cateList .el-card__body {
  padding: 10px 0 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.tagList .el-tag--small {
  margin: 6px 4px 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transform: scale(1.2);
    transition: all 0.5s;
  }
}
.friendLinkList .el-button--small {
  margin: 6px 4px 10px;
}
</style>

<template>
  <div class="messageBoard">
    <div id="particles"></div>
    <div class="messageBoardContent">
      <div class="messageBoardTip">
        <h3>留言板</h3>
        <div class="userName">
          <i class="el-icon-user-solid"></i>
          <p>Mr.Su</p>
        </div>
      </div>
      <div id="vcomments"></div>
    </div>
  </div>
</template>

<script>
import particlesJson from "../../../public/particles.json";
export default {
  data() {
    return {
      Valine: ""
    };
  },
  methods: {
    //初始化Valine留言板及配置
    init() {
      new this.Valine({
        el: "#vcomments",
        appId: "b0ldHK3FgjGVVjSKHelxO3Ux-gzGzoHsz",
        appKey: "9BzkUEUXyIiNnflLJqhprwTA",
        serverURLs: "https://b0ldhk3f.lc-cn-n1-shared.com",
        pageSize: 10,
        ACL: {
          "*": {
            read: true,
            write: true
          }
        },
        visitor: true,
        placeholder: "留下你想说的话吧"
      });
    }
  },
  mounted() {
    import("valine").then(res => {
      this.Valine = res.default;
      this.init();
    });
    //；粒子特效配置
    require("particles.js");
    // eslint-disable-next-line no-undef
    particlesJS("particles", particlesJson);
  }
};
</script>

<style lang="scss" scoped>
.messageBoard {
  position: absolute;
  top: 3.6rem;
  left: 0;
  width: 100%;
  height: 100%;
  .messageBoardContent {
    margin: 20px auto 0;
    padding: 0 20px;
    max-width: 800px;
    .messageBoardTip {
      margin-top: 10px;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      color: #000;
      h3 {
        font-size: 1.6rem;
        z-index: 99;
      }
      .userName {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        z-index: 99;
        p {
          margin-left: 5px;
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
.v {
  position: relative;
}
</style>
<style lang="scss">
.messageBoard .vtime {
  color: #000 !important;
}
</style>

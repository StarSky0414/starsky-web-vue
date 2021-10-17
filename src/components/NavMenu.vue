<template>
  <el-menu v-if="test()"
           router
           :default-active="activeIndex2"
           class="el-menu-demo"
           mode="horizontal"
           @select="handleSelect"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b">

    <el-menu-item index="/">首页</el-menu-item>
<!--    <el-sub-menu index="">-->
<!--      <template #title>工具</template>-->
<!--      <el-menu-item index="/MakeBean">生成bean</el-menu-item>-->
<!--    </el-sub-menu>-->
<!--    <el-menu-item index="/changeMarkDown">编辑MarkDown</el-menu-item>-->
<!--    <el-menu-item index="/showMakrDownFile">展示MarkDown</el-menu-item>-->
    <el-menu-item index="/showArticleList">展示MarkDown列表</el-menu-item>
    <el-menu-item  v-if="userInfo"  index="/editorMakrDownFile">编辑MarkDown列表</el-menu-item>


    <!--    <el-menu-item index="3" disabled>消息中心</el-menu-item>-->
    <!--    <el-menu-item index="4">订单管理</el-menu-item>-->

    <div class="user-avtor">
      <el-row class="row-bg" style="width: 200px;align-items:center;height: 60px;">
        <el-col v-if="userInfo" :span="8" style="display:flex;">
          <el-avatar :size="50" :src="userInfo.headPortrait"></el-avatar>
        </el-col>
        <el-col v-if="!userInfo" :span="8" style="display:flex;"><a style="cursor:hand;color: #ffffff;"
                                                                    @click="jumpLogin">登入</a></el-col>
        <el-col v-if="!userInfo" :span="8" style="display:flex;"><a href="#" style="cursor:hand;color: #ffffff;"
                                                                    @click="jumpRegister">注册</a></el-col>
        <el-col v-if="userInfo" :span="8" style="display:flex;"><a  style="cursor:hand;color: #ffffff;"
                                                                   @click="jumLoginOut">退出</a></el-col>
      </el-row>
    </div>
  </el-menu>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "nav-menu",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      headImg: "/static/img/head.jpg",
      userInfo: null
    };
  },
  created() {
    let userInfoString = sessionStorage.getItem('user');
    this.userInfo = JSON.parse(userInfoString);
  },
  methods: {
    test(){
      let userInfoString = sessionStorage.getItem('user');
      this.userInfo = JSON.parse(userInfoString);
      return this.$route.path !=='/login';
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    jumpLogin() {
      this.$router.push({
        path: 'login',
      });
    },
    jumpRegister() {
      ElMessage({
        message: '注册暂未开放',
        type: 'error',
      })
    },
    jumLoginOut() {
      sessionStorage.removeItem('user');
      this.$router.push({
        path: 'login',
      });
    }
  }
}
</script>

<style scoped="scoped">
.user-avtor {
  display: flex;
  justify-content: flex-end;
  justify-items: center;
  text-align: center;
  vertical-align: middle;
}


</style>
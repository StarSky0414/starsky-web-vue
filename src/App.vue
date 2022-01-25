<template>
  <el-config-provider :locale="locale">

  <keep-alive include="a,b">
    <nav-menu></nav-menu>
  </keep-alive>
    <!--  <div id="nav">-->
    <!--    <router-link to="/">Home</router-link> |-->
    <!--    <router-link to="/about">About</router-link>-->
    <!--  </div>-->
    <router-view/>
  <el-footer class="footer">
    <a href="http://www.miitbeian.gov.cn">辽ICP备17005837号</a>
    <a>2021 LuoYunYuan CopyRight</a>
  </el-footer>
  </el-config-provider>

</template>

<style lang="stylus">
.ext-strict
  height 100%

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  height 100%

body
  margin 0
  height 100%

html
  margin 0
  height 87%


footer
  width: 100%;
  background-color: #545c64;
  display: flex;
  align-content: flex-start;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  a
    text-decoration: none;
    color white
    font-size: x-small;

</style>
<script>
import NavMenu from "./components/NavMenu";
import {ElConfigProvider} from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default {
  components: {
    NavMenu,
    [ElConfigProvider.name]:ElConfigProvider,//添加组件
  },
  data(){
    return {
      locale:zhCn,//给locale赋值
    }
  }

}

</script>
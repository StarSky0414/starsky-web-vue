<template>
  <el-menu
      router
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <el-menu-item index="/">首页</el-menu-item>
    <el-sub-menu index="" >
      <template #title>工具</template>
      <el-menu-item index="/MakeBean" >生成bean</el-menu-item>
<!--      <el-menu-item index="2-2">选项2</el-menu-item>-->
<!--      <el-menu-item index="2-3">选项3</el-menu-item>-->
<!--      <el-sub-menu index="2-4">-->
<!--        <template #title>选项4</template>-->
<!--        <el-menu-item index="2-4-1">选项1</el-menu-item>-->
<!--        <el-menu-item index="2-4-2">选项2</el-menu-item>-->
<!--        <el-menu-item index="2-4-3">选项3</el-menu-item>-->
<!--      </el-sub-menu>-->
    </el-sub-menu>
<!--    <el-menu-item index="3" disabled>消息中心</el-menu-item>-->
<!--    <el-menu-item index="4">订单管理</el-menu-item>-->
  </el-menu>
</template>

<script>
export default {
  name:"nav-menu",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
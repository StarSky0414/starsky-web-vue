<template>
  <el-container>
    <el-aside width="400px" id="aside">

      <div id="data-card">
        <span>日期</span>
        <link/>
        <el-calendar v-model="value">
          <template #dateCell="{ data }">

            <div  @click="queryDate(data.day,dateList.indexOf(data.day)<0)">
              {{ data.day.split('-').slice(2)[0] }}
              <span  v-if="dateList.indexOf(data.day)>=0" class="iconfont icon-el-icon-mp"></span>
            </div>
          </template>
        </el-calendar>
      </div>


      <!--      <el-card class="box-card">-->
      <!--        <template #header>-->
      <!--          <div class="card-header">-->
      <!--            <span>Card name</span>-->
      <!--          </div>-->
      <!--        </template>-->
      <!--&lt;!&ndash;        <el-tag>Default</el-tag>&ndash;&gt;-->


      <!--      </el-card>-->

    </el-aside>
    <el-main id="main">
      <el-card class="box-card" shadow="hover" v-for="o in 4" :key="o">
        <div>Test</div>
        <el-row :gutter="20">
          <el-col :span="2">
            <el-image style="width: 100px; height: 100px" fit="fill" src="/static/img/head.jpg"></el-image>
          </el-col>
          <el-col :span="22">
            <div class="mk-context">AbstractQueuedSynchronizer内部实现
              AQS（AbstractQueuedSynchronizer）是JAVA中众多锁以及并发工具的基础，其底层采用乐观锁，大量使用了CAS操作， 并且在冲突时，采用自旋方式重试，以实现轻量级和高效地获取锁。

              AQS虽然被定义为抽象类，但事实上它并不包含任何抽象方法。这是因为AQS是被设计来支持多种用途的，如果定义抽象方法，则子类在继承时必须要覆写所有的抽象方法，这显然是不合理的。所以AQS将一些需要子类覆写的方法都设计成protect方法，将其默认实现为抛出UnsupportedOperationException异常。如果子类使用到这些方法，但是没有覆写，则会抛出异常；如果子类没有使用到这些方法，则不需要做任何操作。

              AQS中实现了锁的获取框架，锁的实际获取逻
            </div>
          </el-col>
        </el-row>
        <div class="operation">
          <el-col :span="5" :offset="18">
            <el-row :gutter="20">
              <el-col :span="6">
                <span class="iconfont icon-chakan"><span style="margin-left: 5px">200</span></span>
              </el-col>
              <el-col :span="12">
                <span class="iconfont icon-shijian"><span style="margin-left: 5px">2021-03-21</span></span>
              </el-col>
              <el-col :span="6">
                <span class="iconfont icon-fenxiang"><span style="margin-left: 5px">150</span></span>
              </el-col>
            </el-row>
          </el-col>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import edit from '@element-plus/icons'
import { ElMessage } from 'element-plus'


export default {
  name: "ShowArticleList",
  data:function (){
    return{
      dateList:["2021-10-01","2021-11-01"]
    }
  },
  methods:{
    queryDate(date,isquery){
      if (isquery){
        ElMessage({
          message: '未获取到该时间数据',
          type: 'warning',
        })
        return;
      }
      alert(date);
    }
  }
}
</script>

<style scoped>
#aside {
  background-color: #00a8c6;
}

#main {
  background-color: #5a934a;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  margin-top: 20px;
}

.mk-context {
  text-align: left;
}

#data-card {
  height: 200px;
  width: 85%;
  padding: 20px;
}

#data-card div {
  --el-calendar-cell-width: none !important;
}


</style>
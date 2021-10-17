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

    </el-aside>
    <el-main id="main">
      <el-card class="box-card" shadow="hover"  v-for="tableDataItem in tableData" :key="tableDataItem.id" @click="jumpOnce(tableDataItem.id)">
          <div>{{ tableDataItem.title }}</div>
          <el-row :gutter="20">
            <el-col :span="2">
              <el-image style="width: 100px; height: 100px" fit="fill" src="{{tableDataItem.photoUrl}}"></el-image>
            </el-col>
            <el-col :span="22">
              <div class="mk-context">{{tableDataItem.generalize}}
              </div>
            </el-col>
          </el-row>
          <div class="operation" >
            <el-col :span="5" :offset="18">
              <el-row :gutter="20">
                <el-col :span="6">
                  <span class="iconfont icon-chakan"><span style="margin-left: 5px">200</span></span>
                </el-col>
                <el-col :span="12">
                  <span class="iconfont icon-shijian"><span style="margin-left: 5px">{{tableDataItem.updateTime.split(" ")[0]}}</span></span>
                </el-col>
                <el-col :span="6">
                  <span class="iconfont icon-fenxiang"><span style="margin-left: 5px">150</span></span>
                </el-col>
                <el-col v-if="userInfo" :span="6" @click.stop="jumpEditor(tableDataItem.id)">
                  <span class="iconfont icon-zhengshu"><span style="margin-left: 5px">编辑</span></span>
                </el-col>
              </el-row>
            </el-col>
          </div>
      </el-card>
      <div class="tabListPage">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="pageSizes"
                       :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
                       :total="totalCount">
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import edit from '@element-plus/icons'
import { ElMessage } from 'element-plus'
import axios from "axios";
import $ from "jquery";


export default {
  name: "ShowArticleList",
  data:function (){
    return{
      dateList:["2021-10-01","2021-11-01"],
      // 总数据
      tableData:[],
      // 默认显示第几页
      currentPage:1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount:1,
      // 个数选择器（可修改）
      pageSizes:[10],
      // 默认每页显示的条数（可修改）
      pageSize:10,
      userInfo:null
    }
  },
  created() {
    let userInfoString = sessionStorage.getItem('user');
    this.userInfo = JSON.parse(userInfoString);
    this.queryContextList(this.currentPage,this.pageSize);
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
    },
    queryContextList(currentPage,pageSize) {
      // if (!this.userInfo){
      //   ElMessage({
      //     message: "请先登录",
      //     type: 'error',
      //   });
      //   this.$router.back();
      // }
// 发起get请求
      axios.get('/api/article/queryList', {
        // get传递的query参数（传递的参数应与后台人员协商，本次模拟不做限制，不做判断）
        params: {
          userId: 1,
          current: currentPage,
          size: pageSize,
        }
      }).then((response) => {
        // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
        console.log(response);
        console.log(response.data);

        this.totalCount = response.data.total;
        this.tableData = response.data.result;

      }).catch((error) => {
        // catch 指请求出错的处理
        console.log(error);
      });
    },
    jumpOnce(id){
      console.log(id);
      this.$router.push({
        path: 'showMakrDownFile',
        query: {
          id: id,
        }
      });
    },
    jumpEditor(id){
      console.log(id);
      this.$router.push({
        path: 'editorMakrDownFile',
        query: {
          id: id,
        }
      });
    },
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageSize=val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage=1
      // 点击每页显示的条数时，显示第一页
      this.queryContextList(this.currentPage,this.pageSize)
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage=val
      // 切换页码时，要获取每页显示的条数
      this.queryContextList(this.currentPage,this.pageSize)
    },
  }
}
</script>

<style scoped>
/*#aside {*/
/*  background-color: #00a8c6;*/
/*}*/

/*#main {*/
/*  background-color: #5a934a;*/
/*}*/

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
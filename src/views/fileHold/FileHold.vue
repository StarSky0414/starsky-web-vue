<template>
  <el-container id="downFile">

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="方式">
        <el-select v-model="formInline.way" placeholder="Web">
          <el-option label="Web" value="Web"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="待提交网址" style="width: 70%">
        <el-input v-model="formInline.downFileUrl" placeholder="http:// 或是 https://"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitOnce(formInline.downFileUrl)">提交</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 90%" id="table">
      <el-table-column label="id" prop="id" width="50"/>
      <el-table-column label="文件名称" prop="fileName"/>

      <el-table-column label="下载进度" prop="fileNum">
        <template #default="scope">
          <el-progress :text-inside="true" :stroke-width="20"
                       :percentage="scope.row.fileNumFinsh*100/scope.row.fileNum"></el-progress>
        </template>
      </el-table-column>

      <el-table-column label="文件路径" prop="filePath"/>
      <el-table-column label="文件大小" prop="fileSize"/>
      <el-table-column label="下载文件路径" prop="fileUrl"/>
      <el-table-column label="创建时间" prop="fileCreateTime"/>
      <el-table-column label="完成时间" prop="fileFinshTime"/>


      <!--      <el-table-column label="下载状态" prop="fileName" width="180">-->
      <!--        <template #reference>-->
      <!--          <div class="name-wrapper">-->
      <!--            <el-tag size="medium">{{ scope.row.name }}</el-tag>-->
      <!--          </div>-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="mini" @click="downFile(scope.row)"
          >downFile
          </el-button
          >
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
          >Delete
          </el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
  name: "FileHold",
  data() {
    return {
      tableData: [

      ],
      search: '',
      formInline: {
      },
    }
  },
  mounted() {
    this.timer = setInterval(this.queryDownFile, 2000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    queryDownFile() {
      // 发起get请求
      axios.get('/api/downFile/queryList', {}).then((response) => {
        // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
        console.log(response);
        console.log(response.data);
        this.tableData = response.data.result
      }).catch((error) => {
        // catch 指请求出错的处理
        console.log(error);
      });
    },
    submitOnce(downFileUrl) {
      // 发起get请求
      axios.get('/api/downFile/submitOnce', {
        params: {downFileUrl: downFileUrl}
      }).then((response) => {
        // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
        console.log(response);
        console.log(response.data);
      }).catch((error) => {
        // catch 指请求出错的处理
        console.log(error);
      });
    },
    handleDelete(id) {
      // 发起get请求
      axios.get('/api/downFile/delete', {
        params: {id: id}
      }).then((response) => {
        // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
        console.log(response);
        console.log(response.data);
      }).catch((error) => {
        // catch 指请求出错的处理
        console.log(error);
      });
    },
// 下载文件
    downFile(item) {
      const link = document.createElement('a')
      console.log(item);
      console.log(item.filePath.split("/"));
      console.log((item.filePath.split("/"))[-2]);
      link.setAttribute("download", item.fileName) //下载的文件名
      link.href = "/image/down_file/"+item.fileName   //文件url
      link.click()
    }
  },
}
</script>

<style scoped>

#downFile {
  margin-top: 50px;
  height: inherit;
  flex-direction: column;
}

#table {
  margin: 50px 100px;
}

</style>
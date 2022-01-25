<template>


  <el-container id="downFile">

    <el-dialog

        title="分享设置"
        v-model="shareDalogVisible"
        :opend="creatQrCode('/api',tableDataItem.relativeUrl,tableDataItem.passWord)"
        width="30%"
        :before-close="handleClose">

      <el-form ref="form" :model="tableDataItem" label-width="80px">

        <el-form-item label="密码">
          <el-input show-password v-model="tableDataItem.passWord"></el-input>
        </el-form-item>
        <el-form-item label="截止时间">
          <el-date-picker
              v-model="tableDataItem.shareTime"
              type="datetime"
              placeholder="Select date and time"
              :shortcuts="shortcuts"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="二维码">
          <div class="qrcode" id="qrCodeUrl"></div>
        </el-form-item>
        <el-form-item label="链接地址">
          <a>{{thisUrl}}{{tableDataItem.relativeUrl}}/{{tableDataItem.passWord}}</a>
        </el-form-item>
      </el-form>


      <span slot="footer" class="dialog-footer">
        <el-button @click="shareDalogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveShare(tableDataItem,formShare)">确 定</el-button>
      </span>
    </el-dialog>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-dialog
          ref="upload"
          title="提示"
          v-model="dialogVisible"
          width="50%"
          :before-close="handleClose">
        <el-upload
            drag
            accept=".zip"
            ref="upload123"
            multiple
            action="/api/transientFile/uploadFile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :http-request="uploadFile"
            :auto-upload="false">
          <div style="margin-top: 10px">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 133px;" size="small" type="success" v-on:click.stop="submitUpload">上传到服务器
            </el-button>
          </div>
          <div slot="tip" class="el-upload__tip">只能上传xlsx文件，且不超过100m</div>
        </el-upload>


        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
      </el-dialog>

    </el-form>
    <div style="display: flex;justify-content: space-around;">
      <el-button @click="dialogVisible = true" style="width: 10% ;" type="primary">上传文件</el-button>
      <el-button @click="queryDownFile();" style="width: 10% ;">刷新</el-button>
    </div>

    <el-table :data="tableData" style="width: 90%" id="table">
      <el-table-column label="id" prop="id"/>
      <el-table-column label="文件名称" prop="fileName"/>
      <el-table-column label="文件大小" prop="fileSize" :formatter="formatData"/>
      <el-table-column label="创建时间" prop="createTime"/>
      <el-table-column label="下载次数" prop="downCount"/>
      <el-table-column label="是否存在密码" prop="passWord" :formatter="formatPassWord"/>
      <el-table-column label="分享截止时间" prop="shareTime">
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="mini" @click="shareDalogVisible = true ; tableDataItem = scope.row "
          >分享
          </el-button
          >
          <el-button
              size="mini"
              type="danger"
              @click="deleteFile(scope.row)"
          >删除
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="downFile(scope.row)"
          >下载
          </el-button>

        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
import axios from "axios";
import {ElPopover} from "element-plus";
import $ from "jquery";
import VueCookies from 'vue-cookies'
import QRCode from 'qrcodejs2'


const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]

export default {
  name: "FileHold",
  data() {
    return {
      uploadData: {
        fieldData: {
          id: '', // 机构id,
        }
      },
      fileData: '', // 文件上传数据（多文件合一）
      fileList: [],  // upload多文件数组
      tableDataItem: {},
      tableData: [],
      search: '',
      formInline: {},
      dialogVisible: false,
      shareDalogVisible: true,
      formShare: {delivery: null, date: null},
      thisUrl:"http://"+window.location.host+"/api"
    }
  },
  mounted() {
    this.queryDownFile()
    this.shareDalogVisible = false;
  },
  beforeDestroy() {
  },
  methods: {
    uploadFile(file) {
      this.fileData.append('file', file.file); // append增加数据
    }, // 上传到服务器
    submitUpload() {
      event.preventDefault();
      const isLt100M = this.fileList.every(file => file.size / 1024 / 1024 < 100);
      if (!isLt100M) {
        this.$message.error('请检查，上传文件大小不能超过100MB!');
      } else {
        this.fileData = new FormData(); // new formData对象
        this.$refs.upload123.submit(); // 提交调用uploadFile函数
        axios.post('/api/transientFile/uploadFile', this.fileData, {
          headers: {'token': VueCookies.get("token")}
        }).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              message: "上传成功",
              type: 'success'
            });
            this.fileList = [];
          } else {
            this.$message({
              message: response.data.desc,
              type: 'error'
            })
          }
        });
      }

    },

    //移除
    handleRemove(file, fileList) {
      this.fileList = fileList;
      // return this.$confirm(`确定移除 ${ file.name }？`);
    },

    // 选取文件超过数量提示
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

    //监控上传文件列表
    handleChange(file, fileList) {
      let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name);
      if (existFile) {
        this.$message.error('当前文件已经存在!');
        fileList.pop();
      }
      this.fileList = fileList;
    },

    open() {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          });
        }
      });
    },
    creatQrCode(urlPix, url,passWord) {
      if (!url) {
        return
      }
      url = urlPix + url + "/" + passWord;
      let elementsByClassName = document.getElementsByClassName("qrcode");
      for (let i = 0; i < elementsByClassName.length; i++) {
        elementsByClassName.item(i).innerHTML = "";
      }


      let elementById = document.getElementById("qrCodeUrl");
      var qrcode = new QRCode(elementById, {
        text: "http://" + window.location.host + url, // 需要转换为二维码的内容
        width: 100,
        height: 100,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    queryDownFile() {
      // 发起get请求
      axios.get('/api/transientFile/getList', {
        headers: {'token': VueCookies.get("token")}
      }).then((response) => {
        // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
        console.log(response);
        console.log(response.data);
        this.tableData = response.data.result.records
      }).catch((error) => {
        // catch 指请求出错的处理
        console.log(error);
      });
    },

    deleteFile(fileInfo) {
      // 发起get请求
      axios.get('/api/transientFile/deleteFile', {
        headers: {'token': VueCookies.get("token")},
        params: {fileId: fileInfo.id}
      }).then((response) => {
        // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
        console.log(response);
        console.log(response.data);
       this.tableData.splice( this.tableData.indexOf(fileInfo),1)
      }).catch((error) => {
        // catch 指请求出错的处理
        console.log(error);
      });
    },
// 下载文件
    downFile(item) {
      const link = document.createElement('a')
      console.log(item);

      axios.get("/api" + item.relativeUrl + "/" + item.passWord, {
        // responseType: 'blob',
        params: {test: true}
      }).then((response) => {
        // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
        console.log(response);
        console.log(response.data);

        if (response.data.code === 1) {
          this.$message({
            type: 'error',
            message: response.data.message
          });
          return;
        }

        let url = window.URL.createObjectURL(new Blob([response.data]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = "/api" + item.relativeUrl + "/" + item.passWord   //文件url
        link.setAttribute("download", item.fileName);

        document.body.appendChild(link);
        console.log(response.data);
        link.click();
        URL.revokeObjectURL(url) // 释放内存

      }).catch((error) => {
        // catch 指请求出错的处理
        console.log(error);
      });

    },
    saveShare(tableDataItem, form) {
      // 发起get请求
      axios.post('/api/transientFile/saveShare', {
        id: tableDataItem.id,
        passWord: tableDataItem.passWord,
        shareTime: tableDataItem.shareTime,
      }, {
        headers: {'token': VueCookies.get("token")}
      }).then((response) => {
        // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
        console.log(response);
        console.log(response.data);
        this.tableData = response.data.result.records
        this.queryDownFile();
        this.shareDalogVisible = false;
      }).catch((error) => {
        // catch 指请求出错的处理
        console.log(error);
      });
    },
    formatData(row, column, cellValue) {
      var size = row.fileSize;
      if (!size)
        return "";
      var num = 1024.00
      if (size < num)
        return size + "B";
      if (size < Math.pow(num, 2))
        return (size / num).toFixed(2) + "K"; //kb
      if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
      if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
      return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
    },
    formatPassWord(row, column, cellValue) {
      return row.passWord ? row.passWord.replace(new RegExp(/./, "gm"), "*") : ""
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

.qrcode {
  display: inline-block;
}

.qrcode > img {
  width: 132px;
  height: 132px;
  background-color: #fff;
  padding: 6px;
  box-sizing: border-box;
}

.el-date-editor.el-input {
  width: unset;
}

</style>
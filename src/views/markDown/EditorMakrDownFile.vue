<template>
  <div>

    <div :id="id" @change="autoSave">
    </div>

    <el-form ref="fileInfo" :inline="true" :model="fileInfo" class="demo-form-inline" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="fileInfo.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="标签分类" prop="tags">
        <el-select  placeholder="请选择标签" multiple v-model="fileInfo.tagsValue">
          <el-option v-for="item in tags" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="概述" prop="generalize" style="width: 1000px;">
        <el-input v-model="fileInfo.generalize" type="text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('fileInfo')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import $ from "jquery";
import uuid from "uuid/v4";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "EditorMakrDownFile",
  data: function () {
    return {
      tags: [
        {value: 'Linux',label: 'Linux'},
        {value: 'Java',label: 'Java'},
        {value: 'Python',label: 'Python'},
        {value: 'Sql',label: 'Sql'},
        {value: 'NoSql',label: 'NoSql'},
        {value: '硬件',label: '硬件'}
      ],
      rules: {
        title: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
          }
        ],
      },
      tagsValue:[],
      fileInfo: {
        title: '',
        tags: [],
        generalize: '',
      },
      makdownText: "",
      //最终生成的编辑器
      editor: null,
      //默认选项
      defaultOptions: {
        //width: "90%",
        height: "800",
        path: "/static/editormd/lib/",
        // theme : "dark",
        // previewTheme : "dark",
        // editorTheme : "pastel-on-dark",
        markdown : null,   //动态设置的markdown文本
        codeFold: true,
        syncScrolling : true,
        saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
        searchReplace: true,
        //watch : false,                // 关闭实时预览
        htmlDecode: "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
        //toolbar  : false,             //关闭工具栏
        //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
        emoji: true,
        taskList: true,
        tocm: true,         // Using [TOCM]
        tex: true,                   // 开启科学公式TeX语言支持，默认关闭
        flowChart: true,             // 开启流程图支持，默认关闭
        sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
        //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
        //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
        //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
        //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
        //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
        imageUpload: true,
        imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        imageUploadURL: "/api/uploadImage",
        onload: function () {
          console.log('onload',this);
          //this.fullscreen();
          //this.unwatch();
          // this.watch().fullscreen();
          //
          // this.setMarkdown(this.makdownText);
          //this.width("100%");
          //this.height(480);
          //this.resize("100%", 640);
          // this.queryContext();
        }
      }
    }
  },
  props: {
    /**
     * editormd挂载元素的id
     */
    id: {
      type: String,
      default: uuid()
    },
    /**
     * editormd的选项对象
     */
    options: {
      type: Object
    }
  },
  mounted() {
    let vm = this;
    //加载editormd
    this.requireEditor(function () {
      vm.editor = editormd(vm.id, vm.getOptions());
    })

  },
  created() {

    if (this.$route.query.id){
      setTimeout(this.queryContext(),1000)
    }else {
      let vm = this;
      //加载editormd
      this.requireEditor(function () {
        vm.editor = editormd(vm.id, vm.getOptions());
      })
    }
  },
  watch:{
    makdownText: {
      handler(newName, oldName) {
        console.log(newName);
        console.log(oldName);
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 异步加载editormd
     * callback 成功后的回调函数
     */
    requireEditor(callback) {
      let vm = this;
      //设置全局变量，因为editormd依赖jquery
      window.$ = window.jQuery = $;
      //异步加载并执行
      $.getScript("/static/editormd/editormd.js", function (script) {
        callback();
      })
      //加载css
      $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '/static/editormd/css/editormd.min.css'));
    },
    /**
     * 得到最终的options，组件属性上获得的选项覆盖此处的默认选项
     */
    getOptions() {
      return Object.assign(this.defaultOptions, this.options);
    },
    // getHtml() {
    //   console.log(this.editor.getMarkdown())
    //   // console.log(markdownToHTML.getMarkdown())
    //   this.makdownText = this.editor.getMarkdown();
    //   $("#show").empty()
    //   editormd.markdownToHTML("show", {markdown: this.makdownText, tocContainer: "#markDownToc"});
    // },
    //当编辑器内容改变时候，会触发该事件，并返回一个html和markdown文本
    autoSave(html, text) {

    },
    queryContext() {
      console.log(this.$route.query.id)
      this.fileId = this.$route.query.id;
      // 发起get请求
      axios.get('/api/article/queryOnce', {
        // get传递的query参数（传递的参数应与后台人员协商，本次模拟不做限制，不做判断）
        params: {
          articleId: this.$route.query.id,
        }
      }).then((response) => {
        // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
        console.log(response);
        console.log(response.data);
        this.defaultOptions.markdown = response.data.result.context;
        let vm = this;
        //加载editormd
        this.requireEditor(function () {
          vm.editor = editormd(vm.id, vm.getOptions());
        })
        this.$route.query.id = response.data.result.id;
        this.fileInfo.generalize = response.data.result.generalize;
        this.fileInfo.title = response.data.result.title;
        this.fileInfo.tagsValue= response.data.result.tag.split(",");
        // this.editor.setMarkdown(response.data.result.context);
      }).catch((error) => {
        // catch 指请求出错的处理
        console.log(error);
      });
    },
    saveContext() {
      console.log(this.$route.query.id)
      var queryData = {
        id: this.$route.query.id,
        generalize:this.fileInfo.generalize,
        title:this.fileInfo.title,
        context:this.editor.getMarkdown(),
        tag:this.fileInfo.tagsValue.join(","),
      }
      console.log('queryData {} ',queryData);

      // 发起get请求
      axios.post('/api/article/save', queryData).then((response) => {
        // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
        console.log(response);
        console.log(response.data.result);
            this.$router.push({
              path: 'editorMakrDownFile',
              query: {
                id: response.data.result,
              }})
      }).catch((error) => {
        // catch 指请求出错的处理
        console.log(error);
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveContext();
        } else {
          ElMessage({
            message: '表单未填写完全',
            type: 'warning',
          })
          return false
        }
      })
    },
  }
}
</script>
<style>

</style>
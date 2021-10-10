<template>


  <el-row :gutter="20" id="showMakeFile">
    <el-col :span="16" id="show" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="8" id="markDownToc">
      <div class="markdown-toc"></div>
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>
</template>

<script>
import $ from "jquery";
import axios from "axios";

export default {
  name: "ShowMakrDownFile",
  data: function () {
    return {
      makdownText: "#heee",
      //最终生成的编辑器
      editor: null,
      //默认选项
      defaultOptions: {
        //width: "90%",
        // height: 200,
        path: "/static/editormd/lib/",
        // theme : "dark",
        // previewTheme : "dark",
        // editorTheme : "pastel-on-dark",
        //markdown : md,   //动态设置的markdown文本
        codeFold: true,
        syncScrolling: true,
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
        imageUploadURL: "./php/upload.php",
        onload: function () {
          console.log('onload', this);
        }
      }
    }
  },
  created() {
    this.requireEditor(this.queryContext);
  },
  mounted() {
  },
  methods: {
    /**
     * 异步加载editormd
     * callback 成功后的回调函数
     */
    requireEditor(queryContext) {
      //设置全局变量，因为editormd依赖jquery
      window.$ = window.jQuery = $;
      //异步加载并执行
      $.getScript("/static/editormd/editormd.js", function (s) {
        $.getScript("/static/editormd/lib/marked.min.js", function (s) {
          queryContext();
        })
      })
      //加载css
      $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '/static/editormd/css/editormd.preview.min.css'));

    },
    queryContext() {
      console.log(this.$route.query.id)
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
        $("#show").empty()
        editormd.markdownToHTML("show", {markdown: response.data.result.context, tocContainer: "#markDownToc",theme:"dark"});
      }).catch((error) => {
        // catch 指请求出错的处理
        console.log(error);
      });
    }
  }

}
</script>

<style lang="stylus">
#showMakeFile
  height: 100%;
  margin: 25px !important;
</style>
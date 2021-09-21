<template>
<div>
  <el-button @click="getHtml()">获取信息</el-button>
  <el-button @click="add()">增加</el-button>
  <div :id="id">
  </div>
  {{makdownText}}
  <el-row :gutter="20">
    <el-col :span="16" id="show" ><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="8" id="markDownToc"> <div class="markdown-toc"></div> <div class="grid-content bg-purple"></div></el-col>
  </el-row>
</div>
</template>
<script>
import $ from "jquery";
import uuid from "uuid/v4";

export default {
  name:"MarkdownEditor",
  data:function(){
    return {
      makdownText:"#heee",
      //最终生成的编辑器
      editor:null,
      //默认选项
      defaultOptions:{
        //width: "90%",
        height: 200,
        path : "/static/editormd/lib/",
        // theme : "dark",
        // previewTheme : "dark",
        // editorTheme : "pastel-on-dark",
        //markdown : md,   //动态设置的markdown文本
        codeFold : true,
        //syncScrolling : false,
        saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
        searchReplace : true,
        //watch : false,                // 关闭实时预览
        htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启    
        //toolbar  : false,             //关闭工具栏
        //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
        emoji : true,
        taskList : true,
        tocm            : true,         // Using [TOCM]
        tex : true,                   // 开启科学公式TeX语言支持，默认关闭
        flowChart : true,             // 开启流程图支持，默认关闭
        sequenceDiagram : true,       // 开启时序/序列图支持，默认关闭,
        //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
        //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
        //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
        //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
        //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
        imageUpload : true,
        imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        imageUploadURL : "./php/upload.php",
        onload : function() {
          console.log('onload', this);
          //this.fullscreen();
          //this.unwatch();
          // this.watch().fullscreen();

          this.setMarkdown("#PHP\n" +
              "##PHP\n" +
              "[TOC]");
          //this.width("100%");
          //this.height(480);
          //this.resize("100%", 640);
        }
      }
    }
  },
  props:{
    /**
     * editormd挂载元素的id
     */
    id:{
      type:String,
      default:uuid()
    },
    /**
     * editormd的选项对象
     */
    options:{
      type:Object
    }
  },
  mounted(){
    let vm=this;
    //加载editormd
    this.requireEditor(function(){
      vm.editor=editormd(vm.id,vm.getOptions());
    })

  },
  methods:{
    /**
     * 异步加载editormd
     * callback 成功后的回调函数
     */
    requireEditor(callback){
      let vm=this;
      //设置全局变量，因为editormd依赖jquery
      window.$=window.jQuery=$;
      //异步加载并执行
      $.getScript("/static/editormd/editormd.js",function(script){
        callback();
      })
      //加载css
      $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', '/static/editormd/css/editormd.min.css') );
    },
    /**
     * 得到最终的options，组件属性上获得的选项覆盖此处的默认选项
     */
    getOptions(){
      return Object.assign(this.defaultOptions,this.options);
    },
    getHtml(){
      console.log(this.editor.getMarkdown())
      // console.log(markdownToHTML.getMarkdown())
      this.makdownText = this.editor.getMarkdown();
      $("#show").empty()
      editormd.markdownToHTML("show",{markdown:this.makdownText,tocContainer:"#markDownToc"});
    },
    add(){
      // console.log(markdownToHTML.getMarkdown())
      this.makdownText = 1;
      this.editor;
      // debugger
      this.editor.setMarkdown("##PHP\n" +
          "##PHP\n" +
          "[TOC]");

      $("#show").empty()
      editormd.markdownToHTML("show",{markdown:"Hello",tocContainer:"markDownToc"});
    }
  }
}
</script>
<style>

</style>
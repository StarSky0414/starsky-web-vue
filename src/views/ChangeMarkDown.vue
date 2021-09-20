<template>
  <div>
    <editor :content="content" @change="autoSave" type="editor"></editor>
  </div>
</template>

<script>
import Markdown from "../components/Editormd";
import Editor from "../components/Editormd";
export default {
  components: {Editor, Markdown},
  name: "ChangeMarkDown",
  data() {
    content:''//这里是初始化是编辑器回显内容
  },
  methods: {
    //当编辑器内容改变时候，会触发该事件，并返回一个html和markdown文本
    autoSave(html, text) {

    }
  }
}
</script>

<style scoped>

</style>
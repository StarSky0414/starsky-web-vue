<template>
  <el-button>
    我是 ElButton
  </el-button>
</template>
<script>
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'app',
  components: {
    ElButton,
  },
})
</script>
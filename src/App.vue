<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { ElMessage } from 'element-plus'
let test = () => {
  ElMessage({
    message: '信息校验失败',
    grouping: true,
    type: 'error',
  })
}
</script>

<template>
  <el-button @click="test" type="warning">Warning</el-button>
</template>

<style scoped></style>

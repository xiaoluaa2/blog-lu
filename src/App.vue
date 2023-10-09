<template>
  <div class="app">
    <Header></Header>
    <div class="header-block"></div>
    <router-view style="flex: 1"> </router-view>
    <img
      v-if="btnFlag"
      class="go-top"
      src="@/assets/imges/gotop.png"
      @click="backTop"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
let btnFlag = ref(false)
let scrollTop = ref(0)
const scrollToTop = () => {
  let scrollT =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop
  scrollTop.value = scrollT
  if (scrollTop.value > 60) {
    btnFlag.value = true
  } else {
    btnFlag.value = false
  }
}
let backTop = () => {
  let timer = setInterval(() => {
    let ispeed = Math.floor(-scrollTop.value / 5)
    document.documentElement.scrollTop =
      document.body.scrollTop =
      scrollTop.value +=
        ispeed
    if (scrollTop.value === 0) {
      clearInterval(timer)
    }
  }, 16)
}
window.addEventListener('scroll', scrollToTop)
onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollToTop)
})
</script>
<style lang="less" scoped>
.app {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .header-block {
    height: 60px;
  }
  .go-top {
    position: fixed;
    right: 40px;
    bottom: 150px;
    cursor: pointer;
  }
}
</style>

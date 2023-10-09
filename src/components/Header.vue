<template>
  <div class="header">
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      router
      :ellipsis="false"
      @select="handleSelect"
    >
      <span class="logo">Lu's Blog</span>
      <div class="flex-grow" />
      <el-menu-item index="blogs">博客</el-menu-item>
      <el-menu-item index="message">留言</el-menu-item>
      <el-menu-item index="3">访问</el-menu-item>
      <el-menu-item index="4">其他</el-menu-item>
    </el-menu>
    <div class="MobileMenuSwitch">
      <span class="logo">Lu's Blog</span>
      <svg @click="showMenu" class="icon" aria-hidden="true">
        <use xlink:href="#icon-menu"></use>
      </svg>
    </div>
    <!-- <div class="MobileMenuDetail" v-if="OpenMobileMenu" @click="OpenMenu()">
      <div class="MoblieMenuDetailContent">
        <div
          :class="
            Active == 0 ? 'MobileMenuDetailItemActive' : 'MobileMenuDetailItem'
          "
          @click="ChangeRouter('BlogIndex')"
        >
          博文
        </div>
        <div
          :class="
            Active == 1 ? 'MobileMenuDetailItemActive' : 'MobileMenuDetailItem'
          "
          @click="ChangeRouter('MessageBoard')"
        >
          留言
        </div>
        <div
          :class="
            Active == 2 ? 'MobileMenuDetailItemActive' : 'MobileMenuDetailItem'
          "
          @click="ChangeRouter('TimeLine')"
        >
          时间轴
        </div>
        <div
          :class="
            Active == 3 ? 'MobileMenuDetailItemActive' : 'MobileMenuDetailItem'
          "
          @click="ChangeRouter('FriendUrl')"
        >
          试验田
        </div>
      </div>
      <div class="MoblieMenuDetailShade"></div>
    </div> -->
  </div>
  <div
    :style="OpenMobileMenu ? '' : 'display: none;'"
    class="mobile_menu_detail"
  >
    <div class="menu_list">
      <div
        @click="checkMenu(item)"
        v-for="item in menuList"
        :key="item.id"
        class="menu_item"
      >
        {{ item.title }}
        <svg
          v-show="menu_checked == item.id"
          @click="showMenu"
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-dangqiandingwei"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
type Menu = {
  title: string
  id: string
  route: string
}
let router = useRouter()
let menuList = ref<Menu[]>([
  { title: '博客', id: '1', route: 'blogs' },
  { title: '留言', id: '2', route: 'message' },
  { title: '访问', id: '3', route: '' },
  { title: '其他', id: '4', route: '' },
])

let menu_checked = ref('1')
menu_checked.value = sessionStorage.getItem('menu_checked')
  ? (sessionStorage.getItem('menu_checked') as string)
  : '1'
// 移动端导航
let OpenMobileMenu = ref(false)
let showMenu = () => {
  OpenMobileMenu.value = !OpenMobileMenu.value
  console.log(OpenMobileMenu.value)
}
let checkMenu = (item: Menu) => {
  sessionStorage.setItem('menu_checked', item.id)
  menu_checked.value = item.id
  router.push(item.route)
  OpenMobileMenu.value = false
}

const activeIndex = ref('blogs')
if (localStorage.getItem('activeIndex')) {
  activeIndex.value = localStorage.getItem('activeIndex') as string
}
const handleSelect = (key: string, keyPath: string[]) => {
  localStorage.setItem('activeIndex', key)
}
</script>
<style lang="less">
.header {
  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
  .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    background-color: #fff !important;
  }
}
</style>
<style lang="less" scoped>
@media only screen and (max-device-width: 768px) {
  .header {
    .el-menu {
      display: none;
    }
    .MobileMenuSwitch {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo {
        margin-left: 20px;
      }
      svg {
        margin-right: 20px;
      }
    }
  }
  .mobile_menu_detail {
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 99999;
    position: fixed;
    top: 4.3rem;
    bottom: 0;
    left: 0;
    right: 0;
    .menu_list {
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .menu_item {
        height: 24px;
        border-bottom: 1px solid #ebedf0;
        margin: 10px 16px;
      }
    }
  }
}
@media only screen and (min-device-width: 768px) {
  .header {
    .MobileMenuSwitch {
      display: none;
    }
  }
}

.header {
  display: flex;
  align-items: center;
  position: fixed;
  opacity: 0.9;
  height: 4.3rem;
  left: 0;
  top: 0;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.09);
  z-index: 10000;
  width: 100%;
  background-color: #fff;
  .logo {
    font-size: 22px;
  }
  .el-menu {
    align-items: center;
    width: 1200px;
    margin: 0 auto;
    .el-menu-item {
      color: #aaa;
      padding: 0 30px;
    }
  }
  .flex-grow {
    flex-grow: 1;
  }
}
</style>

<template>
  <div ref="Area" class="blogs">
    <div class="blogFlex">
      <div class="blogsList">
        <BlogsItem
          v-for="item in blogsList"
          :blog="item"
          :key="item.id"
        ></BlogsItem>
      </div>
      <div class="blogsSide">
        <div class="mine">
          <div class="mine_bg"></div>
          <div class="mine_head">
            <img src="@/assets/imges/msn.jpg" alt="" />
          </div>
          <div class="mine_m">
            <span>美少女战士</span>
            <div class="mine_source">博客源码</div>
          </div>
          <div class="mine_footer">
            <div class="mine_footer_item">
              <span class="mine_footer_num">{{ ArticleNum }}</span>
              <span>博客文章</span>
            </div>
            <div class="mine_footer_item">
              <span class="mine_footer_num">{{ CommentNum }}</span>
              <span>博文评论</span>
            </div>
            <div class="mine_footer_item">
              <span class="mine_footer_num">{{ LeaveMessageNum }}</span>
              <span>留言量</span>
            </div>
          </div>
        </div>
        <div class="hot">
          <div class="hot_title">热门文章</div>
          <div class="hot_item" v-for="item in hotList" :key="item.blogId">
            <div
              :style="
                item.rank == 1
                  ? 'background-color: #e24d46;color: #fff'
                  : item.rank == 2
                  ? 'background-color: #2ea7e0;color: #fff'
                  : item.rank == 3
                  ? 'background-color: #6bc30d;color: #fff'
                  : 'background-color: #edefee '
              "
              class="circle"
            >
              <div>{{ item.rank }}</div>
            </div>
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type } from 'os'
import * as THREE from 'three'
import NET from 'vanta/src/vanta.net'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import BlogsItem from './BlogItem.vue'
import Toy from '@/components/Toy.vue'
import $http from '@/api/index.ts'

//使用ref引用挂载区域
const Area = ref(null)
//创建一个全局的变量来使用vanta.js
/**
 *因为在vue2中，是使用this.vantaEffect来创建指定的3d动画模板的
 *但是vue3 setup中是没有this，所以要另外创建一个
 **/
let vantaEffect: any = null
//在两个生命周期钩子内创建vantaEffect
onMounted(async () => {
  vantaEffect = NET({
    el: Area.value,
    THREE: THREE,
    //如果需要改变样式，要写在这里
    //因为这里vantaEffect是没有setOptions这个方法的
    color: 0x43f58,
    backgroundColor: 0xe3e4d0,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
  })
  await getBlogsList()
  vantaEffect = NET({
    el: Area.value,
    THREE: THREE,
    //如果需要改变样式，要写在这里
    //因为这里vantaEffect是没有setOptions这个方法的
    color: 0x43f58,
    backgroundColor: 0xe3e4d0,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
  })
})
onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
// 博客
type blogsList = {
  id: string
  img: string
  title: string
  explain: string
  type: string
  time: string
  look: number
  comment: number
}
let blogsList = ref<blogsList[]>([])
type hotList = {
  blogId: string
  title: string
  rank: number
}
let hotList = ref<hotList[]>([
  {
    rank: 1,
    title: 'SSR实践',
    blogId: '001',
  },
  {
    rank: 2,
    title: 'Vue首屏优化',
    blogId: '002',
  },
  {
    rank: 3,
    title: '使用Turborepo和pnpm实现Monorepo',
    blogId: '003',
  },

  {
    rank: 4,
    title: 'ThreeJS体验',
    blogId: '004',
  },
  {
    rank: 5,
    title: '个人规划',
    blogId: '005',
  },
  {
    rank: 6,
    title: '00后如何整顿职场',
    blogId: '006',
  },
])
//
let ArticleNum = ref(0)
let CommentNum = ref(0)
let LeaveMessageNum = ref(0)
let init = () => {
  let ArticleNum2 = 51
  let CommentNum2 = 223
  let LeaveMessageNum2 = 391
  let timeA = 3000 / ArticleNum2
  let timeC = 3000 / CommentNum2
  let timeL = 3000 / LeaveMessageNum2
  var NumInterval1 = window.setInterval(function () {
    ArticleNum.value += 1
    if (ArticleNum.value == ArticleNum2) {
      clearInterval(NumInterval1)
    }
  }, timeA)
  var NumInterval2 = window.setInterval(function () {
    CommentNum.value += 1
    if (CommentNum.value == CommentNum2) {
      clearInterval(NumInterval2)
    }
  }, timeC)
  var NumInterval3 = window.setInterval(function () {
    LeaveMessageNum.value += 1
    if (LeaveMessageNum.value == LeaveMessageNum2) {
      clearInterval(NumInterval3)
    }
  }, timeL)
}
init()

let getBlogsList = async () => {
  const { data } = await $http.blogs.getBlogsList()
  console.log(data)
  blogsList.value = data.data
}
</script>

<style lang="less" scoped>
.blogs {
  // flex: 1;
  display: flex;
  @media only screen and (max-device-width: 768px) {
    .blogFlex {
      display: block;
      width: 100%;
      margin: 0 20px;
      min-height: 100vh;
      .blogsList {
        width: 100%;
      }
      .blogsSide {
        display: none;
      }
    }
  }
  @media only screen and (min-device-width: 768px) {
    .blogFlex {
      display: flex;
      position: relative;
      width: 1088px;
      margin: 0 auto;

      .blogsList {
        width: 75%;
        margin-right: 1rem;
        min-height: 52rem;
      }
      .blogsSide {
        position: sticky;
        top: 0;
        width: 25%;
        height: 250px;
        .hot {
          background-color: #fff;
          margin-top: 1rem;
          padding: 1rem;
          padding-right: 0.5rem;
          color: rgba(0, 0, 0, 0.65);
          font-size: 14px;
          cursor: pointer;
          .hot_title {
            color: #01aaed;
            border-bottom: 1px solid #01aaed;
            padding-bottom: 10px;
          }
          .hot_item {
            .circle {
              width: 20px;
              height: 20px;
              border-radius: 10px;
              text-align: center;
              line-height: 20px;
              margin-right: 10px;
              flex-shrink: 0;
            }
            display: flex;
            margin-top: 10px;
          }
        }
        .mine {
          background-color: #fff;
          .mine_bg {
            margin-top: 1rem;
            height: 8rem;
            background-image: url(../../assets/imges/bg.jpg);
            background-position: 0 0;
            background-size: 100% 110px;
            background-repeat: no-repeat;
          }
          .mine_head {
            width: 6rem;
            height: 6rem;
            border-radius: 100%;
            border: 5px solid hsla(0, 0%, 100%, 0.5);
            margin: 0 auto;
            margin-top: -4.5rem;
            img {
              width: 100%;
              height: 100%;
              border-radius: 100%;
            }
          }
          @keyframes animate {
            0% {
              background-position: 0%;
            }
            100% {
              background-position: 400%;
            }
          }
          .mine_m {
            margin: 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            .mine_source {
              color: #fff;
              width: 8rem;
              border-radius: 0.3rem;
              padding: 0.5rem;
              text-decoration: none;
              text-align: center;
              cursor: pointer;
              margin-top: 1rem;
              background: linear-gradient(
                90deg,
                #2bc97a,
                #f441a5,
                #03a9f4,
                #2bc97a
              );
              background-size: 400%;
              &:hover {
                animation: animate 8s linear infinite;
              }
            }
          }
          .mine_footer {
            color: #5e5e5e;
            padding: 1.5rem 0 1rem;
            border-top: 1px solid #e9e9e9;
            display: flex;
            justify-content: space-around;
            .mine_footer_item {
              display: flex;
              flex-direction: column;
              align-items: center;
              .mine_footer_num {
                font-size: 1.2rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>

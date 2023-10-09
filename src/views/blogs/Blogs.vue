<template>
  <div class="blogs">
    <Particles
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      id="tsparticles"
      :options="particles"
    />
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
              <!-- <span>留言量</span> -->
              <span>博文点击量</span>
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
import { onMounted, onBeforeUnmount, ref } from 'vue'
import BlogsItem from './BlogItem.vue'
import $http from '@/api/index.ts'
import { loadFull } from 'tsparticles'
import { particles } from '../../config/particles-config2'
import { jsonp } from 'vue-jsonp'
import { useStore } from '@/store/index.ts'
const $store = useStore()
const particlesInit = async (engine: any) => {
  await loadFull(engine)
}
const particlesLoaded = async (container: any) => {
  console.log('Particles container loaded', container)
}

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

let blogsSum = async () => {
  const { data } = await $http.blogs.blogsSum()
  if (data.status == 0) {
    ArticleNum.value = data.data.Blogs
    CommentNum.value = data.data.Comments
    LeaveMessageNum.value = data.data.Hits
  }
}

let getBlogsList = async () => {
  const { data } = await $http.blogs.getBlogsList()
  blogsList.value = data.data
}
// 获取位置
let getIPCity = () => {
  var data = {
    key: '5GZBZ-RZICW-3Y3RZ-3BM7S-FEMRO-M5BSK', //密钥
    output: 'jsonp', // 解决跨域问题
  }
  var url = 'https://apis.map.qq.com/ws/location/v1/ip' //腾讯地理位置信息接口
  // data.output = 'jsonp'
  jsonp(url, data)
    .then((res: any) => {
      console.log(res.result.ad_info)
      $store.location.setAddress(res.result.ad_info)
      return res
    })
    .catch((error: any) => {})
}
let init = async () => {
  await blogsSum()
  getIPCity()
  let ArticleNum2 = ArticleNum.value
  let CommentNum2 = CommentNum.value
  let LeaveMessageNum2 = LeaveMessageNum.value
  ArticleNum.value = 0
  CommentNum.value = 0
  LeaveMessageNum.value = 0
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

  getBlogsList()
}
init()
// 博文，评论，点击总数
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

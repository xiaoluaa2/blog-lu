<template>
  <div @click="blogDetail(blog._id)" class="BlogItem">
    <div class="left">
      <img :src="'/api/xiaolu/' + blog.ArticleCover" alt="" />
    </div>
    <div class="right">
      <div class="title">{{ blog.Title }}</div>
      <div class="explain">{{ blog.Summary }}</div>
      <div class="footer">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-label"></use>
          </svg>
          <span>{{ blog.ArticleTag }}</span>
        </div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-time"></use>
          </svg>
          <span> {{ $format('yyyy-MM-dd', Date.parse(blog.CreateDate)) }}</span>
          <!-- <span> {{ Date.parse(blog.CreateDate) }}</span> -->
        </div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-browse"></use>
          </svg>
          <span>{{ blog.hits }}</span>
        </div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-message"></use>
          </svg>
          <span>{{ blog.CommentNum }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'

const { proxy }: any = getCurrentInstance()
const $format = proxy.$format


let router = useRouter()
type List = {
  Title: string
  order: string
  Content: string
  Summary: string
  CreateDate: string
  ArticleTag: string
  ArticleCover: string
  CommentNum: number
}
interface Props {
  blog: any
}
let props = defineProps<Props>()

let blogDetail = async (id: string) => {

  router.push({
    name: 'BlogDetail',
    params: {
      id: id,
    },
  })
}
</script>

<style lang="less" scoped>
@media only screen and (max-device-width: 768px) {
  .BlogItem {
    // width: 100%;
    display: flex;
    flex-direction: column;
  }
  .left {
    img {
      width: 100%;
      height: 11.5rem;
    }
  }
}
@media only screen and (min-device-width: 768px) {
  .BlogItem {
    display: flex;
    margin-top: 1rem;
    padding: 1rem;
    border: 1px solid #fff;
    border-radius: 2px;
    cursor: pointer;
    .left {
      img {
        width: 12rem;
        height: 7.5rem;
        margin-right: 1rem;
      }
    }
  }
}
.BlogItem {
  box-sizing: border-box;
  display: flex;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #fff;
  border-radius: 2px;
  cursor: pointer;
  transition: 0.3s ease-in;
  background: linear-gradient(0, #01aaed 1px, #01aaed 0) no-repeat,
    linear-gradient(-90deg, #01aaed 1px, #01aaed 0) no-repeat,
    linear-gradient(-180deg, #01aaed 1px, #01aaed 0) no-repeat,
    linear-gradient(-270deg, #01aaed 1px, #01aaed 0) no-repeat;
  background-position: 0 0, 100% 0, 100% 100%, 0 100%;
  background-color: #fff;
  background-size: 0 1px, 1px 0, 0 1px, 1px 0;
  &:hover {
    cursor: pointer;
    background-size: 100% 1px, 1px 100%, 100% 1px, 1px 100%;
  }
  .right {
    .title {
      font-weight: 700;
      font-size: 1.1rem;
    }
    .explain {
      color: rgba(0, 0, 0, 0.43);
      cursor: pointer;
      font-size: 0.9rem;
      margin-top: 0.5rem;
      min-height: 4.5rem;
    }
    .footer {
      display: flex;
      div {
        font-size: 0.9rem;
        color: #555;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>

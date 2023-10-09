import { close, start } from '@/utils/nporgress'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Blogs = () => import('@/views/blogs/Blogs.vue')
const BlogDetail = () => import('@/views/blogs/BlogDetail.vue')
const Message = () => import('@/views/message/Message.vue')
const Parallax = () => import('@/views/page/Parallax.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/blogs',
  },
  {
    path: '/blogs',
    component: Blogs,
  },
  {
    name: 'BlogDetail',
    path: '/blogDetail/:id',
    component: BlogDetail,
  },
  {
    path: '/message',
    component: Message,
  },
  {
    path: '/parallax',
    component: Parallax,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  start()
  next()
})

router.afterEach(() => {
  close()
})

export default router

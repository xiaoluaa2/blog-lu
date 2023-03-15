import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { close, start } from '@/utils/nporgress'
const Login = () => import('@/views/login/Login.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
// 验证token
router.beforeEach((to, from, next) => {
  if (
    to.path === '/login' ||
    to.path === '/register' ||
    to.path === '/forgetPassword'
  )
    return next()
  else {
    let flag = window.localStorage.getItem('token')
    console.log(flag)

    if (!flag) {
      localStorage.setItem('autoChecked', '')
      return next('/login')
    }
  }
  start()
  next()
})

router.afterEach(() => {
  close()
})

export default router

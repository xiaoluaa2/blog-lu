import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import 'element-plus/dist/index.css'
import '@/assets/css/global.css'
import '@/assets/icon/font/iconfont.js'
import router from '@/router/index.ts'
import methods from '@/methods.ts' // 全局方法
import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'
// highlightjs
import hljs from 'highlight.js'
import VMdPreview from '@kangc/v-md-editor/lib/preview.js'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
declare module 'vue3-particles'
import Particles from 'vue3-particles'

VMdPreview.use(githubTheme, {
  Hljs: hljs,
})
import { createPinia } from 'pinia'
const pinia = createPinia()
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)
app.use(methods)
app.use(VMdPreview)
app.use(mavonEditor)
app.use(router)
app.use(Particles)
app.use(pinia)
app.mount('#app')

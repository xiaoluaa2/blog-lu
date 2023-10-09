import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  // 全局less
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${resolve(
          __dirname,
          'src/assets/css/style.less'
        )}";`,
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

  resolve: {
    alias: {
      // 设置文件./src路径为 @
      '@': resolve('./src'),
    },
  },
  base: '/', // 打包路径
  build: {
    // 生产环境去除 console debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

  server: {
    port: 4000, // 服务端口号
    open: true, // 服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    proxy: {
      // '/download': {
      //   //  测试

      //   target: 'http://localhost:3000',
      //   // target: '  http://edu.tianzerencai.com',
      //   changeOrigin: true,
      //   // 线上
      //   // target: 'http://tianzeedu.tianzerencai.com',
      //   // rewrite: (path) => path.replace(/^\/download/, ''),
      // },
      '/api': {
        //  测试
        target: 'http://localhost:3000',
        // 线上
        // target: 'http://tianzeedu.tianzerencai.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

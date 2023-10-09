import { defineStore } from 'pinia'

//参数1：定义一个仓库的唯一id名，Pinia会将所有的容器挂载到根容器；参数2：选项对象
const location = defineStore('school', {
  state: () => {
    //state必须是函数，是避免在服务端渲染时的交叉请求导致的状态数据污染；必须是箭头函数，为了更好的TS类型推导
    return {
      address: {},
    }
  },
  getters: {
    Address(): any {
      //在TS文件下，getters使用了this,则必须指定类型，否则会导致推导错误
      if (this.address) {
        return this.address as any
      }
    },
  },
  actions: {
    setAddress(address: any) {
      console.log(address)
      this.address = address
    },
  },
  persist: true,
})
export default location

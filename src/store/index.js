import school from './module/school';
import video from './module/video';
import topic from './module/topic';
// 参数1：定义一个仓库的唯一id名，Pinia会将所有的容器挂载到根容器；参数2：选项对象
// export const useStore = defineStore('main', {
//   state: () => {
//     //state必须是函数，是避免在服务端渲染时的交叉请求导致的状态数据污染；必须是箭头函数，为了更好的TS类型推导
//     return {
//       school: {
//         schoolroll: null,
//         school_id: '',
//       },
//       topic: {
//         topicList: [],
//       },
//       video: {
//         classMsg: {},
//         videoMsg: {},
//       },
//     }
//   },
//   getters: {
//     schoolList(): any {
//       //在TS文件下，getters使用了this,则必须指定类型，否则会导致推导错误
//       console.log(this.school.schoolroll)
//       if (this.school.schoolroll) {
//         return this.school.schoolroll.map((item) => {
//           return {
//             label: item.school_name_text,
//             value: item.school_id,
//           }
//         })
//       }
//     },
//   },
//   actions: {
//     setSchoolroll(schoolroll: any) {
//       this.school.schoolroll = schoolroll
//     },
//     setSchoolID(id: string) {
//       this.school.school_id = id
//     },
//     setTopicList(list: any) {
//       this.topic.topicList = list
//       console.log(this.topic.topicList)
//     },
//     setVideo(video: any) {
//       this.video.videoMsg = video
//     },
//     setClass(video: any) {
//       this.video.classMsg = video
//     },
//     // changeState(num: number, str: string) {
//     //   //不要使用箭头函数定义action,因为箭头函数绑定外部this
//     //   this.count += num
//     //   this.name += str
//     //   this.arr.push(5)
//     //   // this.$patch({})或this.$patch(state=>{})    //还可通过$patch修改state的数据
//     // },
//   },
//   persist: true,
//   // persist: {
//   //   enabled: true, // 这个配置代表存储生效，而且是整个store都存储
//   // },
// })
export function useStore() {
    return {
        school: school(),
        topic: topic(),
        video: video(),
    };
}
//# sourceMappingURL=index.js.map
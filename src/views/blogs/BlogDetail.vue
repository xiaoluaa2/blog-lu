<template>
  <div ref="Area" class="DetailBox">
    <Particles
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      id="tsparticles"
      :options="particles"
    />

    <div class="articleDetail">
      <div class="articleBanner"></div>
      <v-md-preview :text="detail.Content"></v-md-preview>
    </div>
    <div class="CommentList" style="margin-top: 1rem">
      <div class="ListMain">
        <div class="ListItem" v-for="item in commentList">
          <div class="ItemMain">
            <div class="left">
              <img src="@/assets/imges/DefaultHeadIcon.9fa68490.jpg" alt="" />
            </div>
            <div class="right">
              <span style="display: flex; align-items: center">
                <span style="margin-right: 10px"> {{ item.userId }}</span>
                <img src="@/assets/imges/position.svg" alt="" />
                {{ item.city }}</span
              >
              <span v-html="item.content"> </span>
              <span class="DateAnswer">
                <span>
                  {{
                    $format('yyyy-MM-dd hh:mm:ss', parseInt(item.publishdate))
                  }}</span
                >
                <span @click="answer(item.userId, item._id)" class="answer"
                  >回复</span
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ArticleDetailContent" style="margin-top: 1rem">
      <div
        class="ArticleDetailContentTab"
        style="padding: 1rem; min-height: unset"
      >
        <div class="ArticleDetailCommentFirstLine">
          <div class="UserHeadIcon">
            <img src="@/assets/imges/DefaultHeadIcon.9fa68490.jpg" />
          </div>
          <div class="CommentUserInfo">
            <input
              placeholder="昵称（必填）"
              v-model="ArticleCommentNickName"
            />
            <input
              placeholder="邮箱（可以不填哦）"
              v-model="ArticleCommentEmail"
            />
            <input
              placeholder="网址（可以不填哦）"
              v-model="ArticleCommentUrl"
            />
          </div>
        </div>
        <div class="ArticleDetailCommentContent">
          <div v-show="tip" class="tip">
            {{ tip }}
            <div @click="clearComment" class="clear">×</div>
          </div>
          <textarea
            v-model="MessageText"
            ref="MessageTextRef"
            placeholder="欢迎评论吖，鼓励和板砖我都认真听取哦"
          ></textarea>
          <span class="EmotionButton" @click="OpenEmotions()">
            <img src="@/assets/imges/face.svg" alt="" />
          </span>
        </div>
        <div class="CommentSubmitLine">
          <div class="CommentSubmitButton" @click="CommentSubmit()">评论</div>
        </div>
      </div>
    </div>

    <Emotion @AppendInputValue="AppendMessageText"></Emotion>
  </div>
</template>

<script setup lang="ts">
import { type } from 'os'
import { particles } from '../../config/particles-config'
import $http from '@/api/index.ts'
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import { loadFull } from 'tsparticles'
import Emotion from './Emotion.vue'
import bus from '@/bus.ts'
import { ElMessage } from 'element-plus'
import { useStore } from '@/store/index.ts'
const $store = useStore()
const { proxy }: any = getCurrentInstance()
const $format = proxy.$format
const particlesInit = async (engine: any) => {
  await loadFull(engine)
}
const particlesLoaded = async (container: any) => {
  console.log('Particles container loaded', container)
}

let route = useRoute()
let detail = ref<any>({
  Content: '',
})
let content = ref<any>('')
let getBlogsDetail = async () => {
  console.log(route.params.id)
  const { data } = await $http.blogs.getBlogsDetail(route.params.id)
  detail.value = data.data
  const { data: data2 } = await $http.blogs.addLook(route.params.id)
  console.log(data2)
}
getBlogsDetail()

let ArticleCommentNickName = ref(''),
  ArticleCommentEmail = ref(''),
  ArticleCommentUrl = ref(''),
  MessageText = ref('')
let userMessage = JSON.parse(localStorage.getItem('userMessage') as string)
ArticleCommentNickName.value = userMessage.email
ArticleCommentEmail.value = userMessage.nickName
ArticleCommentUrl.value = userMessage.url
let MessageTextRef = ref()
// 打开表情包弹框
let OpenEmotions = function () {
  bus.$emit('showEmo')
}
// 表情添加到text
bus.$on('AppendMessageText', (value: any) => {
  MessageText.value += value
})
//表情选中后追加在input
let AppendMessageText = function () {
  // // 光标聚焦
  MessageTextRef.value.focus()
}
/**
 * 本方法用于提交评论
 *
 * 提交评论功能业务逻辑比较多：
 * 1.先获取用户的定位信息，然后携带定位信息提交新增评论接口。
 * 2.再刷新页面文章下的评论列表
 * 3.再修改该评论id对应的文章数据的评论量字段
 * 4.再将用户昵称存在浏览器
 */
let CommentSubmit = async function () {
  if (!MessageText.value) {
    return
  }
  if (!ArticleCommentNickName.value) {
    console.log(44)
    ElMessage({
      message: '请填写昵称',
      grouping: true,
      offset: 200,
    })
    return
  }
  console.log($store.location.Address)

  let body: any = {
    nickName: ArticleCommentNickName.value,
    email: ArticleCommentEmail.value,
    url: ArticleCommentUrl.value,
    text: MessageText.value,
    cid: route.params.id,
    city: $store.location.Address.city,
  }
  if (answerCommentId.value) {
    body['parentId'] = answerCommentId.value
    body.text = tip.value + '：' + body.text
  }
  const { data } = await $http.blogs.postComment(body)
  console.log(data)
  if (data.status == 0) {
    ElMessage({
      message: '发表成功',
      grouping: true,
      type: 'success',
      offset: 200,
    })
    let userMessage = {
      nickName: ArticleCommentNickName.value,
      email: ArticleCommentEmail.value,
      url: ArticleCommentUrl.value,
    }
    MessageText.value = ''
    localStorage.setItem('userMessage', JSON.stringify(userMessage))
    getComment()
  }
}
let commentList = ref<any>([])
let answerCommentId = ref('')
let tip = ref('')
// 回复评论
let answer = (userId: string, _id: string) => {
  // // 光标聚焦
  MessageTextRef.value.focus()
  tip.value = '@' + userId
  answerCommentId.value = _id

  // CommentSubmit(_id)
}
// 取消回复
let clearComment = () => {
  tip.value = ''
  answerCommentId.value = ''
  console.log(tip.value)
}
let getComment = async () => {
  const { data } = await $http.blogs.getComment({
    cid: route.params.id,
  })
  console.log(data.data)
  const pattern = /\[\[([\u4E00-\u9FA5\w]+)\]\]/g
  const urlBase =
    '<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/'
  const urlSuffix = '.gif"/>'

  commentList.value = data.data.map((item: any) => {
    return {
      ...item,
      content: item.content.replace(pattern, function (match: any, p1: any) {
        console.log(EmotionList.value.indexOf(p1))

        return urlBase + EmotionList.value.indexOf(p1) + urlSuffix
      }),
    }
  })
}
getComment()

let EmotionList = ref([
  '微笑',
  '撇嘴',
  '色',
  '发呆',
  '得意',
  '流泪',
  '害羞',
  '闭嘴',
  '睡',
  '大哭',
  '尴尬',
  '发怒',
  '调皮',
  '呲牙',
  '惊讶',
  '难过',
  '酷',
  '冷汗',
  '抓狂',
  '吐',
  '偷笑',
  '可爱',
  '白眼',
  '傲慢',
  '饥饿',
  '困',
  '惊恐',
  '流汗',
  '憨笑',
  '大兵',
  '奋斗',
  '咒骂',
  '疑问',
  '嘘',
  '晕',
  '折磨',
  '衰',
  '骷髅',
  '敲打',
  '再见',
  '擦汗',
  '抠鼻',
  '鼓掌',
  '糗大了',
  '坏笑',
  '左哼哼',
  '右哼哼',
  '哈欠',
  '鄙视',
  '委屈',
  '快哭了',
  '阴险',
  '亲亲',
  '吓',
  '可怜',
  '菜刀',
  '西瓜',
  '啤酒',
  '篮球',
  '乒乓',
  '咖啡',
  '饭',
  '猪头',
  '玫瑰',
  '凋谢',
  '示爱',
  '爱心',
  '心碎',
  '蛋糕',
  '闪电',
  '炸弹',
  '刀',
  '足球',
  '瓢虫',
  '便便',
  '月亮',
  '太阳',
  '礼物',
  '拥抱',
  '强',
  '弱',
  '握手',
  '胜利',
  '抱拳',
  '勾引',
  '拳头',
  '差劲',
  '爱你',
  'NO',
  'OK',
  '爱情',
  '飞吻',
  '跳跳',
  '发抖',
  '怄火',
  '转圈',
  '磕头',
  '回头',
  '跳绳',
  '挥手',
  '激动',
  '街舞',
  '献吻',
  '左太极',
  '右太极',
])
</script>

<style lang="less" scoped>
.DetailBox {
  .articleDetail {
    box-sizing: border-box;
    background-color: #fff;
    width: 1088px;
    margin: 50px auto 20px;

    .articleBanner {
      height: 384px;
      background-image: -webkit-linear-gradient(left, #1f3747, #293d31);
    }
  }
  .CommentList {
    width: 1088px;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
    .ListMain {
      border: 1px solid #e9e9e9;
      box-sizing: border-box;
      width: 800px;
      margin: 50px auto;

      display: flex;
      flex-direction: column;
      .ListItem {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #e9e9e9;
        padding: 16px;
        .ItemMain {
          display: flex;
          .left {
            img {
              width: 48px;
              height: 48px;
              border-radius: 16px;
            }
            margin-right: 10px;
          }
          .right {
            line-height: 24px;
            display: flex;
            flex-direction: column;
            font-size: 14px;
            flex: 1;
            img {
              width: 12px;
              height: 12px;
            }
            .DateAnswer {
              display: flex;
              justify-content: space-between;
              color: #0000006e;
              .answer {
                cursor: pointer;
              }
            }
          }
        }

        .reply {
          color: #1693c4;
          text-align: end;
          cursor: pointer;
          margin: 10px 0%;
        }
      }
    }
  }
  .ArticleDetailContent {
    width: 1088px;
    margin: 0 auto;
    background-color: #fff;

    .ArticleDetailCommentFirstLine {
      box-sizing: border-box;
      width: 800px;
      margin: 0 auto;
      display: flex;
      .UserHeadIcon {
        img {
          width: 32px;
          height: 32px;
        }
        margin-right: 20px;
      }
      .CommentUserInfo {
        flex: 1;
        display: flex;
        justify-content: space-between;
        input {
          box-sizing: border-box;
          border: 1px solid #e9e9e9;
          height: 32px;
          padding: 0 8px;
          width: 230px;
          &:focus {
            outline: none;
          }
        }
      }
    }
    .ArticleDetailCommentContent {
      margin: 10px auto 0;
      width: 800px;
      position: relative;
      .tip {
        font-size: 14px;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        .clear {
          text-align: center;
          line-height: 14px;
          width: 14px;
          height: 14px;
          font-size: 10px;
          background-color: red;
          cursor: pointer;
          color: #fff;
          border-radius: 7px;
          margin-left: 5px;
        }
      }
      textarea {
        box-sizing: border-box;
        width: 800px;
        min-height: 90px;
        padding: 10px;
        &:focus {
          outline: none;
        }
      }

      .EmotionButton {
        position: absolute;
        right: 7px;
        bottom: 7px;
        img {
          cursor: pointer;
          width: 26px;
          height: 26px;
        }
      }
    }
    .CommentSubmitLine {
      box-sizing: border-box;
      width: 800px;
      margin: 10px auto 40px;
      display: flex;
      justify-content: flex-end;
      .CommentSubmitButton {
        cursor: pointer;
        padding: 5px 15px;
        border: 1px solid #01aaed;
        text-align: center;
        color: #01aaed;
      }
    }
  }
}
</style>

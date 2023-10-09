import request from './request.js'
interface postCommentInterface {
  nickName: string
  email: string
  url: string
  text: string
  cid: string
  parentId?: string
}
interface getCommentInterface {
  cid: string
  parentId?: string
}

const explore = {
  //文章列表
  getBlogsList() {
    return request({
      url: `/blogs/getBlogsList`,
      method: 'post',
    })
  },
  getBlogsDetail(id: string) {
    return request({
      url: `/blogs/detail`,
      method: 'post',
      data: {
        id,
      },
    })
  },
  // 点击量
  addLook(id: string) {
    return request({
      url: `/blogs/addLook`,
      method: 'post',
      data: {
        id,
      },
    })
  },
  // 博文，评论，点击总数
  blogsSum() {
    return request({
      url: `/blogs/blogsSum`,
      method: 'post',
    })
  },
  // 发布评论
  postComment(comment: postCommentInterface) {
    return request({
      url: `/blogs/postComment`,
      method: 'post',
      data: comment,
    })
  },
  // 获取评论
  getComment(comment: getCommentInterface) {
    return request({
      url: `/blogs/getComment`,
      method: 'post',
      data: comment,
    })
  },
}
export default explore

import request from './request.js'
interface loginInterface {
  account: string
  password: string
}
interface loginInterface2 {
  mobile: string
  captcha: string
}
interface FormInterface {
  phone: string
  verificationCode: string
  name: string
  password: string
}
interface GitCode {
  mobile: string
  event: string
}
interface resetInterface {
  mobile: string
  captcha: string
  newpassword: string
}

const explore = {
  //账密登录
  login_password(loginMsg: loginInterface) {
    return request({
      url: `/user/login`,
      method: 'post',
      data: {
        account: loginMsg.account,
        password: loginMsg.password,
      },
    })
  },
  // 手机号登录
  login_mobile(loginMsg: loginInterface2) {
    return request({
      url: `/user/mobilelogin`,
      method: 'post',
      data: loginMsg,
    })
  },
  // 找回密码
  resetPassword(form: resetInterface) {
    return request({
      url: `/user/resetpwd`,
      method: 'post',
      data: form,
    })
  },

  //注册
  register(registerMsg: FormInterface) {
    console.log(registerMsg)

    return request({
      url: `/user/register`,
      method: 'post',
      data: {
        username: registerMsg.name,
        password: registerMsg.password,
        mobile: registerMsg.phone,
        code: registerMsg.verificationCode,
      },
    })
  },
  //验证码
  gitCode(form: GitCode) {
    return request({
      url: `/sms/send`,
      method: 'post',
      data: form,
    })
  },
}
export default explore

export default {
  install(app: any) {
    function FormatTime(t: string, date: string) {
      var _date = new Date(date)
      var o = {
        'M+': _date.getMonth() + 1, //月份
        'd+': _date.getDate(), //日
        'h+': _date.getHours(), //小时
        'm+': _date.getMinutes(), //分
        's+': _date.getSeconds(), //秒
        'q+': Math.floor((_date.getMonth() + 3) / 3), //季度
        S: _date.getMilliseconds(), //毫秒
      }
      if (/(y+)/.test(t)) {
        t = t.replace(
          RegExp.$1,
          (_date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      for (var k in o) {
        // 我们在项目中的tsconfig.json文件中添加： "suppressImplicitAnyIndexErrors":true,
        if (new RegExp('(' + k + ')').test(t)) {
          t = t.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          )
        }
      }
      return t
    }
    app.config.globalProperties.$format = FormatTime
  },
}

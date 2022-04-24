// 防抖函数
export function debounce(func, delay) {
  const that = this
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(that, args)
    }, delay)
  }
}
/**
 * 格式化函数 ， 给日期格式化
 * date为 new Date()对象， fmt为 'yyyy-MM-dd'的格式
 * y+：1-n个y
 * y*: 0-n个y
 * y?: 0/1个y
 */
export function formatDate(date, fmt) {
  //获取年份
  if (/(y+)/.test(fmt)) {
    let dateY = date.getFullYear() + "";
    //RegExp.$1 RegExp为正则的判断，$1为第一个参数fmt，所以 RegExp.$1 就是 "yyyy"
    fmt = fmt.replace(RegExp.$1, dateY.substr(4 - RegExp.$1.length));
  }

  //获取其他
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

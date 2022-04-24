import Toast from './Toast'

const obj = {}

// 封装插件思路
// 1.将Toast的Dom元素加入body中
// 2.将Toast的组件对象加入prototype中，在全局可以使用Toast里的方法
// 3.通过this.$toast.show调用show方法，通过show方法控制Toast组件的展示/隐藏

// 使用方法：
// 1.将封装好的插件导出
// 2.在main.js中引入，通过Vue.use(toast)使用插件
// 3.使用插件时，将会默认调用插件的install方法，并且传回参数Vue实例

obj.install = function(Vue) {
  // 错误做法，此时Toast还未挂载，没有$el
  // console.log(Toast)
  // document.body.appendChild(Toast.$el)

  // 1.创建组件构造器
  const toastConStructor = Vue.extend(Toast)

  // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConStructor()

  // 3.将组件对象，挂载到一个div上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  
  Vue.prototype.$toast = toast
}

export default obj

import Comment from './index.vue'

Comment.install = function(Vue) {
  Vue.component(Comment.name, Comment)
}

if (typeof window !== 'undefined' && window.Vue) {
  Comment.install(window.Vue)
}

export default Comment

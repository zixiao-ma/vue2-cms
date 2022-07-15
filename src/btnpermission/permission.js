import Vue from 'vue'
import store from '@/store/index'

Vue.directive('permission', {
  inserted(el, binding) {
    const list = store.getters.authoritysList
    const data = list.find((val) => val === binding.value)
    if (!data) {
      el.parentNode.removeChild(el)
    }
  },
})


import store from '@/store'

export default{
  inserted(el, binding, vnode) {
    const { value } = binding
    const rhtCds = store.getters && store.getters.rhtCds
    if (value && value.length > 0) {
      const hasPermission = rhtCds.indexOf(value) >= 0
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need rhtCd! Like v-permission="xxxx"`)
    }
  }
}

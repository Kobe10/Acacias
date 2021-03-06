import Cookies from 'js-cookie'
import {queryAppCfg} from '@/api/sys'

const app = {
  state: {
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'zh',
    size: Cookies.get('size') || 'medium',
    height: null,
    appCfg: null
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    },
    SET_HEIGHT: (state, height) => {
      state.height = height
    },
    SET_APP_CFG: (state, appCfg) => {
      state.appCfg = appCfg
    }
  },
  actions: {
    toggleSideBar({commit}) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({commit}, {withoutAnimation}) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({commit}, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({commit}, language) {
      commit('SET_LANGUAGE', language)
    },
    setSize({commit}, size) {
      commit('SET_SIZE', size)
    },
    setHeight({commit}, height) {
      commit('SET_HEIGHT', height)
    },
    loadAppCfg({commit}) {
      return new Promise((resolve, reject) => {
        queryAppCfg().then(data => {
          commit('SET_APP_CFG', data.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default app

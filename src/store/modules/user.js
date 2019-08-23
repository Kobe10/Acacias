import {loginByUsername, logout, getUserInfo} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'
import Cookies from 'js-cookie'

const user = {
  state: {
    user: '',
    status: '',
    code: Cookies.get('USER_CODE') || '',
    token: getToken(),
    name: Cookies.get('USER_NAME') || '',
    avatar: '',
    introduction: '',
    rhtCds: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
      Cookies.set('USER_CODE', code)
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      Cookies.set('LOGIN_ACCEPT', token)
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
      Cookies.set('USER_NAME', name)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_RHTCDS: (state, rhtCds) => {
      state.rhtCds = rhtCds
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password, userInfo.validate, userInfo.token).then(data => {
          data = data.data
          commit('SET_CODE', username)
          commit('SET_NAME', data.username)
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data
          if (data && data.length > 0) {
            const rhtCds = []
            data.forEach(item => {
              rhtCds.push(item.rhtCd)
            })
            commit('SET_RHTCDS', rhtCds)
          } else {
            reject('用户没有权限执行该操作')
          }
          // commit('SET_AVATAR', data.avatar)
          // commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_CODE', '')
          commit('SET_RHTCDS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_CODE', '')
        commit('SET_RHTCDS', [])
        removeToken()
        resolve()
      })
    }
  }
}

export default user

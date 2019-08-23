import request from '@/utils/request'
import { getServerUrl, PRJ_CD } from './sys'

export function checkLogin(username, password, validate) {
/*eslint no-unused-vars:0*/
  const data = {
    user: username,
    password: password,
    validate: validate,
    device: 'pc'
  }
  return request({
    url: '/user/checkLogin',
    method: 'post',
    data
  })
}

export function loginByUsername(username, password, validate, token) {
  const data = {
    user: username,
    password: password,
    validate: validate,
    token: token,
    device: 'pc'
  }
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getLoginImage() {
  return getServerUrl('/user/randomImage')
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function getUserInfo(token) {
  const data = {
    rhtId: 1,
    level: -1,
    prjCd: PRJ_CD,
    LOGIN_ACCEPT: token
  }
  return request({
    url: '/user/menuTree',
    method: 'get',
    params: data
  })
}


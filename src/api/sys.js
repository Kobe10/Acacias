import store from '@/store'
import request from '@/utils/request'

export const PRJ_CD = '0'

export function getServerUrl(url, withIp = false) {
  let result = process.env.BASE_API + url
  if (result.indexOf('?') < 0) {
    result = result + '?prjCd=' + PRJ_CD
  } else {
    result = result + '&prjCd=' + PRJ_CD
  }
  if (store.getters.token) {
    result = result + '&LOGIN_ACCEPT=' + store.getters.token
  }
  if (process.env.NODE_ENV === 'development' && withIp) {
    result = 'http://114.248.78.102:9100/' + result
  } else if (withIp) {
    const href = document.location.href
    result = href.substr(0, href.indexOf(process.env.BASE_API)) + result
  }
  return result
}

export function queryAppCfg() {
  const data = {prjCd: PRJ_CD}
  return request({
    url: '/common/getAllCfg',
    method: 'get',
    params: data
  })
}

export function queryOrgPartPerson(type) {
  const data = {prjCd: PRJ_CD, type: type}
  return request({
    url: '/orgPartTree/queryOrgPartPerson',
    method: 'get',
    params: data
  })
}

export function changePassword(oldPassword, newPassword) {
  const data = {staffCode: store.getters.code, oldPassword: oldPassword, newPassword: newPassword}
  return request({
    url: '/user/changePwd',
    method: 'post',
    data
  })
}

export function chartData(prjJobCd) {
  const data = {prjCd: PRJ_CD, prjJobCd: prjJobCd}
  return request({
    url: 'target/nChartData',
    method: 'get',
    params: data
  })
}

export function ruleData(ruleCd, ruleParam) {
  const data = {...ruleParam, prjCd: PRJ_CD, ruleCd: ruleCd}
  return request({
    url: 'target/executeRule',
    method: 'get',
    params: data
  })
}


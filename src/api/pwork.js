import request from '@/utils/request'
import {PRJ_CD} from './sys'

export function fetchList(prjId, conditions, page) {
  const requestParam = {
    prjId: prjId,
    conditions: conditions,
    sorts: [],
    page: {
      currentPage: page.currentPage || 1,
      pageSize: page.pageSize || 100
    },
    resultFields: ['workId', 'prjId', 'workName', 'workStatus', 'startTime', 'endTime', 'staffId', 'ttOrgId']
  }

  const data = {data: JSON.stringify(requestParam), prjCd: PRJ_CD}
  return request({
    url: '/work/queryWorkList',
    method: 'post',
    data
  })
}

export function queryPrjDyns(inData) {
  const data = {...inData, prjCd: PRJ_CD}
  return request({
    url: '/work/queryDynamicByPrjId',
    method: 'get',
    params: data
  })
}

export function deleteInfo(infoId) {
  const data = {workId: infoId, prjCd: PRJ_CD}
  return request({
    url: '/work/deleteWork',
    method: 'get',
    params: data
  })
}

export function queryInfo(infoId) {
  const data = {workId: infoId, prjCd: PRJ_CD}
  return request({
    url: '/work/queryWorkDetail',
    method: 'get',
    params: data
  })
}

export function queryWorkHisList(workId, startNum, showNum) {
  const data = {workId: workId, startNum: startNum, showNum: showNum, prjCd: PRJ_CD}
  return request({
    url: '/work/queryWorkHisList',
    method: 'get',
    params: data
  })
}

export function saveInfo(infoJosn, submit) {
  const data = {data: JSON.stringify({...infoJosn}), submit: submit, prjCd: PRJ_CD}
  return request({
    url: '/work/saveOrSubWork',
    method: 'post',
    data
  })
}

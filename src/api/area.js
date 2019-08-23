import request from '@/utils/request'
import {getServerUrl, PRJ_CD} from './sys'

export function fetchList(conditions, pageInfo) {
  const requestParam = {
    entityName: 'AreaInfo',
    isRhtFlag: false,
    conditions: conditions,
    sorts: [],
    page: {
      currentPage: pageInfo.currentPage || 1,
      pageSize: pageInfo.pageSize || 100
    },
    resultFields: ['areaId', 'areaName', 'areaDesc', 'areaPosition', 'areaCd', 'centerLat', 'centerLng']
  }

  const data = {requestParam: JSON.stringify(requestParam), prjCd: PRJ_CD}
  return request({
    url: '/common/data',
    method: 'post',
    data
  })
}

export function deleteArea(areaId) {
  const data = {areaId: areaId, prjCd: PRJ_CD}
  return request({
    url: 'projectArea/deleteArea',
    method: 'get',
    params: data
  })
}

export function queryInfo(infoId) {
  const data = {areaId: infoId, prjCd: PRJ_CD}
  return request({
    url: '/projectArea/queryAreaDetail',
    method: 'get',
    params: data
  })
}

export function saveInfo(infoJosn) {
  const data = {data: JSON.stringify(infoJosn), prjCd: PRJ_CD}
  return request({
    url: '/projectArea/saveArea',
    method: 'post',
    data
  })
}

export function getProjectImportTemplate() {
  return getServerUrl('templateForm/downTemplate')
}

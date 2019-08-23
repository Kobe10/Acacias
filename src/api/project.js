import request from '@/utils/request'
import {getServerUrl, PRJ_CD} from './sys'

export function fetchList(conditions, page, resultFields =
['prjId', 'prjName', 'prjYear', 'prjDesc', 'reportRange', 'prjStatus', 'selfTarget', 'goverTarget', 'prjValidStatus', 'invest', 'completePay']) {
  const requestParam = {
    entityName: 'PrjInfo',
    isRhtFlag: false,
    conditions: conditions,
    sorts: [{sortColumn: 'reportRange', sortOrder: 'asc'}],
    page: {
      currentPage: page.currentPage || 1,
      pageSize: page.pageSize || 100
    },
    resultFields: resultFields
  }

  const data = {requestParam: JSON.stringify(requestParam), prjCd: PRJ_CD}
  return request({
    url: '/common/prjData',
    method: 'post',
    data
  })
}

export function deleteInfo(infoId) {
  const data = {prjId: infoId, prjCd: PRJ_CD}
  return request({
    url: '/prj/deletePrj',
    method: 'get',
    params: data
  })
}

export function queryInfo(infoId) {
  const data = {prjId: infoId, prjCd: PRJ_CD}
  return request({
    url: '/prj/queryPrjDetail',
    method: 'get',
    params: data
  })
}

export function saveInfo(infoJosn) {
  const data = {data: JSON.stringify({...infoJosn}), prjCd: PRJ_CD}
  return request({
    url: '/prj/savePrj',
    method: 'post',
    data
  })
}

export function getProjectImportTemplate() {
  return getServerUrl('/templateForm/downTemplate?importExcel=IMPORT_Prj_EXCEL', true)
}

export function getProjectImportAction() {
  return getServerUrl('/templateForm/allImport', false)
}


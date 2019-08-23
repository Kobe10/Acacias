import request from '@/utils/request'
import { getServerUrl, PRJ_CD } from './sys'

export function tree(relType, relId) {
  const data = { relId: relId, relType: relType, prjCd: PRJ_CD }
  return request({
    url: '/doc/queryDocTree',
    method: 'get',
    params: data
  })
}

export function uploadFiles(currentDocId, formData, isAddDocTree = true) {
  return request({
    url: '/eland/file/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData
  }).then(data => {
    // 不需要增加文档树直接返回
    const upDocs = data.data
    if (!isAddDocTree) {
      const temp = []
      upDocs.forEach(item => {
        const fullName = item.docName
        const lastIdx = fullName.lastIndexOf('.')
        temp.push({
          docId: new Date().getTime(),
          upDocId: currentDocId,
          docName: fullName.substr(0, lastIdx),
          docSuffix: fullName.substr(lastIdx + 1),
          docFlag: '1',
          relType: '4',
          svcDocId: item.docId
        })
      })
      return temp
    }
    // 直接保存到目录树
    const createDocFolder =
    {
      'prjCd': PRJ_CD,
      'upDocId': [],
      'docName': [],
      'docSuffix': [],
      'docFlag': [],
      'svcDocId': []
    }
    upDocs.forEach(item => {
      const fullName = item.docName
      const lastIdx = fullName.lastIndexOf('.')
      createDocFolder.upDocId.push(currentDocId)
      createDocFolder.docName.push(fullName.substr(0, lastIdx))
      createDocFolder.docSuffix.push(fullName.substr(lastIdx + 1))
      createDocFolder.docFlag.push('1')
      createDocFolder.svcDocId.push(item.docId)
    })
    return request({
      url: '/doc/addDocTree',
      method: 'post',
      data: createDocFolder
    })
  })
}

/**
 * 创建新的文件夹
 * @param currentDocId
 * @param folderName
 */
export function createFolder(currentDocId, folderName, isAddDocTree = true) {
  if (!isAddDocTree) {
    return new Promise(function(resolve, reject) {
      resolve({
        docId: new Date().getTime(),
        upDocId: currentDocId,
        docName: folderName,
        relType: '4',
        docSuffix: '',
        docFlag: '0',
        relId: ''
      })
    })
  }
  const createDocFolder =
  {
    'prjCd': PRJ_CD,
    'upDocId': [],
    'docName': [],
    'docSuffix': [],
    'docFlag': [],
    'svcDocId': []
  }
  createDocFolder.upDocId.push(currentDocId)
  createDocFolder.docName.push(folderName)
  createDocFolder.docSuffix.push('')
  createDocFolder.docFlag.push('0')
  createDocFolder.svcDocId.push('')
  return request({
    url: '/doc/addDocTree',
    method: 'post',
    data: createDocFolder
  })
}

export function deleteInfo(docId) {
  const data = { docId: docId, prjCd: PRJ_CD }
  return request({
    url: '/doc/deleteDocTree',
    method: 'get',
    params: data
  })
}

export function queryInfo(infoId) {
  const data = { workId: infoId, prjCd: PRJ_CD }
  return request({
    url: '/work/queryWorkDetail',
    method: 'get',
    params: data
  })
}

export function changeInfo(docId, docName, docSuffix) {
  const data = { docId: docId, docName: docName, docSuffix: docSuffix, prjCd: PRJ_CD }
  return request({
    url: '/doc/updateDocTree',
    method: 'post',
    data: data
  })
}

export function getDownUrl(docId) {
  return getServerUrl('/eland/file/download?docId=' + docId, true)
}

export function getViewFrame(docId, currentDocId) {
  return getServerUrl('/eland/file/view?docIds=' + docId + '&currentDocId=' + currentDocId, true)
}

export function getImageUrl(docId) {
  return getServerUrl('/oframe/common/file/file-downview.gv?docId=' + docId, true)
}

export function getDocUrl(docId) {
  return getServerUrl('/eland/file/openDocEdit?docId=' + docId, true)
}

export function saveInfo(infoJosn, submit) {
  const data = { data: JSON.stringify({ ...infoJosn }), submit: submit, prjCd: PRJ_CD }
  return request({
    url: '/work/saveOrSubWork',
    method: 'post',
    data
  })
}

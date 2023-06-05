import request from '@/utils/request'

//列表
export function fetchList(params) {
  return request({
    url: '/api/busy.supplier/index',
    method: 'get',
    params: params
  })
}

//列表
export function fetchListTotal(params) {
  return request({
    url: '/api/total.supply/index',
    method: 'get',
    params: params
  })
}

//详情
export function getSupplier(data) {
  return request({
    url: '/api/busy.supplier/detail',
    method: 'post',
    data: data
  })
}

//新增
export function createSupplier(data) {
  return request({
    url: '/api/busy.supplier/add',
    method: 'post',
    data: data
  })
}

//修改
export function updateSupplier(data) {
  return request({
    url: '/api/busy.supplier/edit',
    method: 'post',
    data: data
  })
}

//修改
export function updateRefresh(data) {
  return request({
    url: '/api/busy.supplier/refresh',
    method: 'post',
    data: data
  })
}

//修改状态
export function updateStatus(data) {
  return request({
    url: '/api/busy.supplier/state',
    method: 'post',
    data: data
  })
}

//删除记录
export function deleteSupplier(data) {
  return request({
    url: '/api/busy.supplier/remove',
    method: 'post',
    data: data
  })
}



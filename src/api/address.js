import request from '@/utils/request'

//列表
export function fetchList(params) {
  return request({
    url: '/api/setting.address/index',
    method: 'get',
    params: params
  })
}

//新增
export function createAddress(data) {
  return request({
    url: '/api/setting.address/add',
    method: 'post',
    data: data
  })
}

//修改
export function updateAddress(data) {
  return request({
    url: '/api/setting.address/edit',
    method: 'post',
    data: data
  })
}

//修改
export function getGoogle(data) {
  return request({
    url: '/api/setting.address/getGoogle',
    method: 'post',
    data: data
  })
}

//修改状态
export function updateStatus(data) {
  return request({
    url: '/api/setting.address/state',
    method: 'post',
    data: data
  })
}

//修改默认状态
export function updateDefault(data) {
  return request({
    url: '/api/setting.address/updateDefault',
    method: 'post',
    data: data
  })
}

//删除记录
export function deleteAddress(data) {
  return request({
    url: '/api/setting.address/remove',
    method: 'post',
    data: data
  })
}



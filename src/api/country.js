import request from '@/utils/request'

//列表
export function fetchList(params) {
  return request({
    url: '/api/setting.country/index',
    method: 'get',
    params: params
  })
}

//新增
export function createCountry(data) {
  return request({
    url: '/api/setting.country/add',
    method: 'post',
    data: data
  })
}

//修改
export function updateCountry(data) {
  return request({
    url: '/api/setting.country/edit',
    method: 'post',
    data: data
  })
}

//修改状态
export function updateStatus(data) {
  return request({
    url: '/api/setting.country/state',
    method: 'post',
    data: data
  })
}

//删除记录
export function deleteCountry(data) {
  return request({
    url: '/api/setting.country/remove',
    method: 'post',
    data: data
  })
}



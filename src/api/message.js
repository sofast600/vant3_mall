import request from '@/utils/request'

//列表
export function fetchList(params) {
  return request({
    url: '/api/busy.customer/index',
    method: 'get',
    params: params
  })
}

//新增
export function createCustomer(data) {
  return request({
    url: '/api/busy.customer/add',
    method: 'post',
    data: data
  })
}

//修改
export function updateCustomer(data) {
  return request({
    url: '/api/busy.customer/edit',
    method: 'post',
    data: data
  })
}

//修改状态
export function updateStatus(data) {
  return request({
    url: '/api/busy.customer/state',
    method: 'post',
    data: data
  })
}

//删除记录
export function deleteCustomer(data) {
  return request({
    url: '/api/busy.customer/remove',
    method: 'post',
    data: data
  })
}



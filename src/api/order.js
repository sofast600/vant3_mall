import request from '@/utils/request'

//列表
export function fetchList(params) {
  return request({
    url: '/api/busy.order/index',
    method: 'get',
    params: params
  })
}

//列表
export function recycle(params) {
  return request({
    url: '/api/busy.order/recycle',
    method: 'post',
    params: params
  })
}


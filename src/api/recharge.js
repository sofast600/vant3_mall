import request from '@/utils/request'

//列表
export function fetchList(params) {
  return request({
    url: '/api/user.recharge/index',
    method: 'get',
    params: params
  })
}


export function pass(params) {
  return request({
    url: '/api/user.recharge/pass',
    method:'post',
    headers:{'Content-Type': 'application/json'},
    params:params
  })
}
//列表
export function unpass(params) {
  return request({
    url: '/api/user.recharge/unpass',
    method: 'post',
    params: params
  })
}

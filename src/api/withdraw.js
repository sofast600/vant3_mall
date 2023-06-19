import request from '@/utils/request'

//列表
export function fetchList(params) {
  return request({
    url: '/api/user.withdraw/index',
    method: 'get',
    params: params
  })
}


//通过
export function confirmWithdraw(data) {
  return request({
    url: '/api/user.withdraw/confirmWithdraw',
    method: 'post',
    data: data
  })
}

//拒绝
export function unPass(data) {
  return request({
    url: '/api/user.withdraw/unpass',
    method: 'post',
    data: data
  })
}

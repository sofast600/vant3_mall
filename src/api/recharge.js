import request from '@/utils/request'

//列表
export function fetchList(params) {
  return request({
    url: '/api/user.recharge/index',
    method: 'get',
    params: params
  })
}


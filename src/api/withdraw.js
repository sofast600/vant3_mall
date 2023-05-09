import request from '@/utils/request'

//列表
export function fetchList(params) {
  return request({
    url: '/api/user.withdraw/index',
    method: 'get',
    params: params
  })
}


import request from '@/utils/request'

//列表
export function fetchList(params) {
  return request({
    url: '/api/busy.order/index',
    method: 'get',
    params: params
  })
}


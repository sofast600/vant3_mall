import request from '@/utils/request'

//转能量详情
export function getSublet(data) {
  return request({
    url: '/api/busy.sublet/detail',
    method: 'post',
    data: data
  })
}

//转能量详情
export function updateState(data) {
  return request({
    url: '/api/busy.sublet/state',
    method: 'post',
    data: data
  })
}

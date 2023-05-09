import request from '@/utils/request'

//详情
export function getSetting(data) {
  return request({
    url: '/api/setting.data/detail',
    method: 'post',
    data: data
  })
}

//修改
export function updateSetting(data) {
  return request({
    url: '/api/setting.data/edit',
    method: 'post',
    data: data
  })
}

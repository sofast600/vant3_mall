import request from '@/utils/request'

//列表
export function fetchList(params) {
  return request({
    url: '/api/busy.robot/index',
    method: 'get',
    params: params
  })
}

//新增
export function createRobot(data) {
  return request({
    url: '/api/busy.robot/add',
    method: 'post',
    data: data
  })
}

//修改
export function updateRobot(data) {
  return request({
    url: '/api/busy.robot/edit',
    method: 'post',
    data: data
  })
}

//修改状态
export function updateStatus(data) {
  return request({
    url: '/api/busy.robot/state',
    method: 'post',
    data: data
  })
}

//删除记录
export function deleteRobot(data) {
  return request({
    url: '/api/busy.robot/remove',
    method: 'post',
    data: data
  })
}



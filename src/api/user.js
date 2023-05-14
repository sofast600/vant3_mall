import request from '@/utils/request'

//列表
export function fetchList(params) {
  return request({
    url: '/api/user.people/index',
    method: 'get',
    params: params
  })
}

//详情
export function getMember(data) {
  return request({
    url: '/api/user.people/detail',
    method: 'post',
    data: data
  })
}
//新增
export function createMember(data) {
  return request({
    url: '/api/user.people/add',
    method: 'post',
    data: data
  })
}

//修改
export function updateMember(data) {
  return request({
    url: '/api/user.people/edit',
    method: 'post',
    data: data
  })
}

//修改
export function updateMemberTop(data) {
  return request({
    url: '/api/user.people/top',
    method: 'post',
    data: data
  })
}

//修改状态
export function updateStatus(data) {
  return request({
    url: '/api/user.people/state',
    method: 'post',
    data: data
  })
}

//删除记录
export function deleteMember(data) {
  return request({
    url: '/api/user.people/remove',
    method: 'post',
    data: data
  })
}



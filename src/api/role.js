import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/api/user.role/index',
    method: 'get',
    params: params
  })
}

export function createRole(data) {
  return request({
    url: '/api/user.role/add',
    method: 'post',
    data: data
  })
}

export function updateRole(data) {
  return request({
    url: '/api/user.role/edit',
    method: 'post',
    data: data
  })
}

export function updateStatus(data) {
  return request({
    url: '/api/user.role/state' ,
    method: 'post',
    data: data
  })
}

export function deleteRole(data) {
  return request({
    url:'/api/user.role/delete',
    method:'post',
    data:data
  })
}

export function fetchAllRoleList() {
  return request({
    url: '/api/user.role/list',
    method: 'get'
  })
}

export function listMenuByRole(data) {
  return request({
    url: '/api/user.menu/listMenu',
    method: 'post',
    data: data,
  })
}

export function listResourceByRole(roleId) {
  return request({
    url: '/role/listResource/'+roleId,
    method: 'get'
  })
}

export function allocMenu(data) {
  return request({
    url: '/api/user.menu/allocMenu',
    method: 'post',
    data:data
  })
}

export function allocResource(data) {
  return request({
    url: '/role/allocResource',
    method: 'post',
    data:data
  })
}

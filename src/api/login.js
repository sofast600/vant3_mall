import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api/data.login/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/api/data.data/adminInfo',
    method: 'post',
  })
}

export function logout() {
  return request({
    url: '/api/data.login/logout',
    method: 'post'
  })
}

export function fetchList(params) {
  return request({
    url: '/api/user.admin/index',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/api/user.admin/add',
    method: 'post',
    data: data
  })
}

export function updateAdmin(data) {
  return request({
    url: '/api/user.admin/edit',
    method: 'post',
    data: data
  })
}

export function updateStatus(data) {
  return request({
    url: '/api/user.admin/state',
    method: 'post',
    data: data
  })
}

export function deleteAdmin(data) {
  return request({
    url: '/api/user.admin/delete' ,
    method: 'post',
    data: data
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/admin/role/' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  return request({
    url: '/api/user.admin/update',
    method: 'post',
    data: data
  })
}

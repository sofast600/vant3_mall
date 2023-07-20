import request from '@/utils/request'

//列表
export function fetchList(params) {
  return request({
    url: '/api/user.people/index',
    method: 'get',
    params: params
  })
}

//列表
export function fetchOneList(params) {
  return request({
    url: '/api/user.people/indexOne',
    method: 'get',
    params: params
  })
}

//回收订单
export function fetchRecveryList(params) {
  return request({
    url: '/api/busy.order/recycleList',
    method: 'post',
    data: params
  })
}


//列表
export function fetchAgentList(params) {
  return request({
    url: '/api/user.people/indexAgent',
    method: 'get',
    params: params
  })
}

//列表
export function dataPanel(params) {
  return request({
    url: '/api/user.people/dataPanel',
    method: 'post',
    data: params
  })
}



//列表
export function fetchSuppleList(params) {
  return request({
    url: '/api/user.people/indexSupple',
    method: 'get',
    params: params
  })
}
//列表
export function fetchOperateList(params) {
  return request({
    url: '/api/user.people/indexOperate',
    method: 'get',
    params: params
  })
}

//数据角色赋值
export function chooseRoleList(params) {
  return request({
    url: '/api/user.people/chooseRoleList',
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



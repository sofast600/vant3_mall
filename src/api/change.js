import request from '@/utils/request'

//列表
export function fetchList(params) {
    return request({
        url: '/api/user.change/index',
        method: 'get',
        params: params
    })
}

//账变类型
export function fetchType(params) {
    return request({
        url: '/api/user.change/type',
        method: 'post',
        data: params
    })
}


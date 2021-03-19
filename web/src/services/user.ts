import request from '../utils/request';

const userApi = {
    Login: '/api/auth/login',
    Profile: '/api/auth/profile',
    Logout: '/api/auth/logout',
    Register: '/api/auth/register',
}

/**
 * 登录
 * @param parameter 登录参数
 */
export function login(parameter: object) {
    return request({
        url: userApi.Login,
        method: 'post',
        data: parameter
    })
}

/**
 * 退出登录
 * @param token 认证token
 */
export function logout(token: string) {
    return request({
        url: userApi.Logout,
        method: 'post',
    })
}

/**
 * 获取用户信息
 * @param token 认证token
 */
export function getInfo(token: string) {
    return request({
        url: userApi.Profile,
        method: 'post'
    })
}

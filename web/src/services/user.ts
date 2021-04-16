import request from '../utils/request';

const userApi = {
    Login: '/api/auth/login',
    Profile: '/api/auth/profile',
    Logout: '/api/auth/logout',
    Register: '/api/auth/register',
    Info: '/api/user',
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
 * 通过token获取用户信息
 * @param token 认证token
 */
export function getInfo(token: string) {
    return request({
        url: userApi.Profile,
        method: 'post'
    })
}

/**
 * 通过user_id获取用户信息
 * @param user_id 用户id
 */
 export function getInfoById(user_id: number|undefined) {
    return request({
        url: `${userApi.Info}/${user_id}`,
        method: 'GET'
    })
}

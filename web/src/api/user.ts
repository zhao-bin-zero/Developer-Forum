import request from '../utils/request';

const userApi = {
    Login: '/api/auth/login',
    Profile: '/api/auth/profile',
    Logout: '/api/auth/logout',
    Register: '/api/auth/register',
}

export function login(parameter: any) {
    return request({
        url: userApi.Login,
        method: 'post',
        data: parameter
    })
}

export function logout(token: string) {
    return request({
        url: userApi.Logout,
        method: 'post',
    })
}

export function getInfo(token: string) {
    return request({
        url: userApi.Profile,
        method: 'post'
    })
}

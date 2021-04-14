import { createStore } from "vuex"
import { getInfo, login, logout } from "../services/user"
import { ACCESS_TOKEN } from "./mutation-types"
import message from 'ant-design-vue/es/message'

export default createStore({
    state: {
        token: '',
        username: '',
        avatar: '',
        roles: [],
        user_id: 0,
    },
    mutations: {
        SET_TOKEN: (state, token: string) => {
            state.token = token
        },
        SET_NAME: (state, username: string) => {
            state.username = username
        },
        SET_AVATAR: (state, avatar: string) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_ID: (state, user_id:number) => {
            state.user_id = user_id
        },
    },
    actions: {
        // 登录
        login({ commit }, userInfo) {
            return new Promise<void>((resolve, reject) => {
                login(userInfo).then(r => {
                    const result = r.data
                    localStorage.setItem(ACCESS_TOKEN, result.access_token)
                    commit('SET_TOKEN', result.access_token)
                    resolve()
                }).catch(error => {
                    message.error('登录失败');
                    reject();
                })
            })
        },
        // 获取用户信息
        GetInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getInfo(this.state.token).then(r => {
                    const result = r.data
                    commit('SET_NAME', result.username)
                    localStorage.setItem('username', result.username);
                    commit('SET_AVATAR', result.avatar)
                    localStorage.setItem('user_id', result.user_id);
                    commit('SET_ID', result.user_id)
                    resolve(r)
                }).catch(error => {
                    message.error('登录失败');
                    reject();
                })
            })
        },
        // 登出
        Logout({ commit, state }) {
            return new Promise<void>((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('SET_ID', 0)
                    localStorage.removeItem(ACCESS_TOKEN)
                    localStorage.removeItem('username');
                    localStorage.removeItem('user_id');
                    resolve()
                }).catch(() => {
                    message.error('登录失败');
                    reject();
                }).finally(() => {
                })
            })
        }
    },
    getters: {
        token: state => state.token,
        avatar: state => state.avatar,
        username: state => state.username,
        user_id: state=>state.user_id,
    },
})
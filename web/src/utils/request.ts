import axios from 'axios';
import store from '../store';
import message from 'ant-design-vue/es/message';
import { ACCESS_TOKEN } from '../store/mutation-types';

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.BASE_URL,
  timeout: 5000, // 请求超时时间
});

// 异常拦截处理器
const errorHandler = (error: any) => {
  if (error.response) {
    const data = error.response.data;
    // 从 localstorage 获取 token
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (error.response.status === 403) {
      message.error(`Forbidden`);
    }
    if (
      error.response.status === 401 || data.data === 401
    ) {
      message.error(`Unauthorized: Authorization verification failed`);
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        });
      }
    }
  }
  return Promise.reject(error);
};

// request 拦截器
request.interceptors.request.use(config => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  // 如果 token 存在,让每个请求携带自定义 token
  if (token) {
    config.headers[ACCESS_TOKEN] = token;
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use(response => {
  const res = response.data;
  if (res.statusCode !== 200) {
    message.error(res.message);
  }
  return response.data;
}, errorHandler);


export default request;

import { AxiosPromise } from 'axios';
import { Pin } from '../types';
import request from '../utils/request';

const pinApi = {
    List: '/api/pin',
    Count: '/api/pin/count',
    ListByUserId:'/api/pin/user',
};

/**
 * 获取沸点数据
 * @param currentPage 当前页
 * @param onePageAmount 一页最大沸点数
 */
 export function pinList(currentPage: number, onePageAmount: number):AxiosPromise<Pin[]> {
    return request({
        url: pinApi.List,
        method: 'GET',
        params: {
            currentPage,
            onePageAmount
        }
    })
}

/**
 * 根据user_id获取沸点数据
 * @param user_id 用户id
 * @param currentPage 当前页
 * @param onePageAmount 一页最大沸点数
 * @returns 
 */
export function pinListByUserId(user_id:number,currentPage: number, onePageAmount: number):AxiosPromise<Pin[]> {
    return request({
        url: `${pinApi.ListByUserId}/${user_id}`,
        method: 'GET',
        params: {
            user_id,
            currentPage,
            onePageAmount
        }
    })
}

/**
 * 沸点总个数
 */
 export function pinCount(): AxiosPromise<any> {
    return request({
        url: pinApi.Count,
        method: 'GET',
    })
}

/**
 * 添加沸点
 */
 export function pinAdd(pinData: Pin): any {
    return request({
        url: pinApi.List,
        method: 'POST',
        data: pinData
    })
}

/**
 * 删除沸点
 */
 export function pinDelete(pin_id: number): any {
    return request({
        url: `${pinApi.List}/${pin_id}`,
        method: 'DELETE',
    })
}
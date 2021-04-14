import { AxiosPromise } from 'axios';
import { PinData } from '../types';
import request from '../utils/request';

const pinApi = {
    List: '/api/pin',
    Count: '/api/pin/count',
};

/**
 * 获取沸点数据
 * @param currentPage 当前页
 * @param onePageAmount 一页最大沸点数
 */
 export function pinList(currentPage: number, onePageAmount: number):AxiosPromise<PinData[]> {
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
 export function pinAdd(pinData: any): AxiosPromise<any> {
    return request({
        url: pinApi.List,
        method: 'POST',
        data: pinData
    })
}

/**
 * 删除沸点
 */
 export function pinDelete(pin_id: number): AxiosPromise<any> {
    return request({
        url: `${pinApi.List}/${pin_id}`,
        method: 'DELETE',
    })
}
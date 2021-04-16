import { AxiosPromise } from 'axios';
import request from '../utils/request';

const eventApi = {
    List: '/api/event',
    Count: '/api/event/count',
};

/**
 * 获取活动数据
 * @param currentPage 当前页
 * @param onePageAmount 一页最大活动数
 */
 export function eventList(currentPage: number, onePageAmount: number) {
    return request({
        url: eventApi.List,
        method: 'GET',
        params: {
            currentPage,
            onePageAmount
        }
    })
}

/**
 * 活动总个数
 */
 export function eventCount(): AxiosPromise<any> {
    return request({
        url: eventApi.Count,
        method: 'GET',
    })
}

/**
 * 删除活动
 */
 export function eventDelete(event_id: number): AxiosPromise<any> {
    return request({
        url: `${eventApi.List}/${event_id}`,
        method: 'DELETE',
    })
}
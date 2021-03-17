import { AxiosPromise } from 'axios';
import request from '../utils/request';
import { ArticleData } from '../types';

const articleApi = {
    List: '/api/article',
    Count: '/api/article/count',
};

/**
 * 获取文章数据
 * @param currentPage 当前页
 * @param onePageAmount 一页最大文章数
 */
export function artcileList(currentPage: number, onePageAmount: number) {
    return request({
        url: articleApi.List,
        method: 'GET',
        params: {
            currentPage,
            onePageAmount
        }
    })
}

/**
 * 文章总个数
 */
export function artcileCount():AxiosPromise<any> {
    return request({
        url: articleApi.Count,
        method: 'GET',
    })
}

/**
 * 对获得文章数据添加actions后返回
 * @param current 当前页
 * @param pageSize 一页最大文章数
 * @param listData 文章列表
 */
export async function getList(current: number, pageSize: number, listData: ArticleData[]): Promise<void> {
    // 获得文章列表
    const articleData: any = await artcileList(current, pageSize);
    articleData.data.forEach((item:ArticleData) => {
        item.actions = [
            { type: 'StarOutlined', text: item.view },
            { type: 'LikeOutlined', text: item.enjoy },
        ];
        listData.push(item);
    });
}

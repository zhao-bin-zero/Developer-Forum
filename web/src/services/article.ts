import { AxiosPromise } from 'axios';
import request from '../utils/request';
import { ArticleData } from '../types';

const articleApi = {
    List: '/api/article',
    Count: '/api/article/count',
    ListByTag: '/api/article/tag',
    CountByTag: '/api/article/tagcount?tagname=',
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
export function artcileCount(): AxiosPromise<any> {
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
export async function getList(current: number, pageSize: number, listData: ArticleData[], tagname: any): Promise<void> {
    // 获得文章列表
    const articleData: any = tagname ? await listByTagname(tagname, current, pageSize) : await artcileList(current, pageSize);
    articleData.data.forEach((item: ArticleData) => {
        item.actions = [
            { type: 'StarOutlined', text: item.view },
            { type: 'LikeOutlined', text: item.enjoy },
        ];
        listData.push(item);
    });
}

/**
 * 通过文章标签获得分类文章列表
 * @param tagname 文章标签名
 * @param currentPage 当前页
 * @param onePageAmount 一页最大文章数
 */
export async function listByTagname(tagname: any, currentPage: number, onePageAmount: number) {
    return request({
        url: `${articleApi.ListByTag}/${tagname}`,
        method: 'GET',
    })
}

/**
 * 文章总个数
 */
export function artcileCountByName(tagname: any): AxiosPromise<any> {
    return request({
        url: `${articleApi.CountByTag}${tagname}`,
        method: 'GET',
    })
}

/**
 * 删除文章
 */
 export function artcileDelete(artcile_id: number): AxiosPromise<any> {
    return request({
        url: `${articleApi.List}/${artcile_id}`,
        method: 'DELETE',
    })
}
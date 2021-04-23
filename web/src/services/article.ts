import { AxiosPromise } from 'axios';
import request from '../utils/request';
import { ArticleData,Article } from '../types';

const articleApi = {
    List: '/api/article',
    Count: '/api/article/count',
    ListByTag: '/api/article/tag',
    CountByTag: '/api/article/tagcount?tagname=',
};


/**
 * 获得一篇文章数据文章
 * @param article_id 文章id
 */
 export function artcileOne(article_id: number): AxiosPromise<Article> {
    return request({
        url: `${articleApi.List}/${article_id}`,
        method: 'GET',
    })
}

/**
 * 获取文章数据
 * @param currentPage 当前页
 * @param onePageAmount 一页最大文章数
 * @param user_id 用户id
 */
export function artcileList(currentPage: number, onePageAmount: number, user_id=-1) {
    return request({
        url: articleApi.List,
        method: 'GET',
        params: {
            currentPage,
            onePageAmount,
            user_id,
        }
    })
}

/**
 * 文章总个数
 */
export function artcileCount(user_id=-1): AxiosPromise<any> {
    return request({
        url: articleApi.Count,
        method: 'GET',
        params: {
            user_id
        }
    })
}

/**
 * 对获得文章数据添加actions后返回
 * @param current 当前页
 * @param pageSize 一页最大文章数
 * @param listData 文章列表
 */
export async function getList(current: number, pageSize: number, listData: ArticleData[], tagname: any,user_id=-1): Promise<void> {
    // 获得文章列表
    const articleData: any = tagname ? await listByTagname(tagname, current, pageSize,user_id) : await artcileList(current, pageSize,user_id);
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
export async function listByTagname(tagname: any, currentPage: number, onePageAmount: number,user_id=-1) {
    return request({
        url: `${articleApi.ListByTag}/${tagname}`,
        method: 'GET',
        params: {
            currentPage,
            onePageAmount,
            user_id,
        },
    })
}

/**
 * 文章总个数
 */
export function artcileCountByName(tagname: any, user_id=-1): AxiosPromise<any> {
    return request({
        url: `${articleApi.CountByTag}${tagname}`,
        method: 'GET',
        params: {
            user_id,
        },
    })
}

/**
 * 添加新的文章
 */
 export function artcileAdd(articleData: Article): AxiosPromise<any> {
    return request({
        url: articleApi.List,
        method: 'POST',
        data: articleData,
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
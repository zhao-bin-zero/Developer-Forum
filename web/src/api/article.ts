import request from '../utils/request';

const articleApi = {
    List: '/api/article',
    Count: '/api/article/count',
};

/**
 * 
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
export function artcileCount() {
    return request({
        url: articleApi.Count,
        method: 'GET',
    })
}

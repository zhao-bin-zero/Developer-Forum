import request from '../utils/request';

const articleApi = {
    List: '/api/user/article'
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

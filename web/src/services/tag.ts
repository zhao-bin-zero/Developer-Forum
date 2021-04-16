import request from '../utils/request';

const tagApi = {
    Info:'/api/tag',
}

/**
 * 根据标签id查询标签信息
 * @param tag_id 标签id
 */
export function getTagInfo(tag_id:number|undefined) {
    return request({
        url: `${tagApi.Info}/${tag_id}`,
        method:'GET',
    })
}
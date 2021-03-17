/**
 * 文章数据
 */
export type Article = {
    article_id?: number;
    title?: string;
    description?: string;
    enjoy?: number;
    view?: number;
    content?: string;
    content_html?: string;
    isPublished?: boolean;
    created_at?: Date;
    update_at?: Date;
    user_id?: number;
    tag_id?: number;
}

/**
 * 文章、actions组合数据
 */
export interface ArticleData extends Article {
    actions: { type: string, text: number | undefined }[];
}

/**
 * 用户数据
 */
export class User {
    user_id?: number;
    username?: string;
    password?: string;
    avatar?: string;
    created_at?: Date;
    update_at?: Date;
}

/**
 * 标签数据
 */
export type Tag = {
    tag_id?: number;
    tagname?: string;
    nickname?: string;
    created_at?: Date;
    updated_at?: Date;
}
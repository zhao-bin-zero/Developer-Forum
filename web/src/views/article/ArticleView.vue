<template>
    <div id="ArticleView">
        <div class="info container">
            <a-avatar
                class="img"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <span>{{ user.username }}</span>
            <span>{{ moment(article.created_at).startOf('day').fromNow() }}</span>
            <span>阅读{{ article.view }}</span>
            <a-tag class="tag" :color="color16()">{{ tag.nickname }}</a-tag>
        </div>
        <h1 class="clear">{{ article.title }}</h1>
        <blockquote>{{ article.description }}</blockquote>
        <article v-html="article.content_html"></article>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router';
import { getInfoById } from '../../services/user';
import { artcileOne } from '../../services/article';
import { Article, User, Tag } from '../../types';
import { getTagInfo } from '../../services/tag';
import moment from 'moment';

export default defineComponent({
    setup() {
        const route = useRoute();
        const state = reactive({
            article: {} as Article,
            user: {} as User,
            tag: {} as Tag,
        });
        const article_id = Number(route.params.article_id);
        onMounted(async () => {
            const { data: articleData } = await artcileOne(article_id);
            state.article = articleData;
            const { data: userData } = await getInfoById(articleData.user_id);
            state.user = userData;
            const { data: tagData } = await getTagInfo(articleData.tag_id);
            state.tag = tagData;
            console.log(tagData);
        })

        /**
         * rgb颜色随机
         */
        const color16 = () => {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
            return color;
        };

        return {
            ...toRefs(state),
            color16,
            moment,
        }
    }
})
</script>

<style lang="scss" scoped>
#ArticleView {
    width: 720px;
    .info {
        float: left;
        margin: 16px 0;
        span {
            font-size: 0.85rem;
            color: #909090;
            margin-right: 10px;
        }
        .tag {
            color: #fff !important;
        }
    }
}
</style>
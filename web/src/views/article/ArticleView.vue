<template>
    <div id="ArticleView">
        <div class="info container">
            <a-avatar
                class="img"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <span>{{ article.username }}</span>
            <span>{{ moment(article.created_at).startOf('day').fromNow() }}</span>
            <span>阅读 {{ article.view }}</span>
            <a-tag class="tag" :color="color16()">{{ article.nickname }}</a-tag>
            <a href="https://twitter.com/intent/tweet" target="_blank">
                <TwitterOutlined class="share" />
            </a>
        </div>
        <h1 class="clear">{{ article.title }}</h1>
        <blockquote>{{ article.description }}</blockquote>
        <article v-html="article.content_html"></article>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router';
import { artcileOne } from '../../services/article';
import { Article } from '../../types';
import { TwitterOutlined, WeiboOutlined } from '@ant-design/icons-vue';
import moment from 'moment';
moment.locale('zh-cn');

export default defineComponent({
    components: {
        TwitterOutlined,
        WeiboOutlined,
    },
    setup() {
        const route = useRoute();
        const state = reactive({
            article: {} as Article,
        });
        const article_id = Number(route.params.article_id);
        onMounted(async () => {
            const { data: articleData } = await artcileOne(article_id);
            state.article = articleData;
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
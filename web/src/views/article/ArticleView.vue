<template>
    <div id="ArticleView">
        ArticleView
        <div>
            <h1>{{ article.title }}</h1>
            <span>{{ article.user_id }}</span>
        </div>
        <div></div>
        <h2>{{ article.description }}</h2>
        <div v-html="article.content_html"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router';
import { artcileOne } from '../../services/article';
import { Article } from '../../types';

export default defineComponent({
    setup() {
        const route = useRoute();
        const state = reactive({
            article: {} as Article
        });
        const article_id = Number(route.params.article_id);
        onMounted(async () => {
            await artcileOne(article_id).then(r => {
                console.log(r)
                state.article = r.data
            })
        })
        return {
            ...toRefs(state),
        }
    }
})
</script>

<style lang="scss" scoped>
#ArticleView {
}
</style>
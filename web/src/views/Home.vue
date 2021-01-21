<template>
  <div id="home">
    <article-list />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ArticleList from '../components/ArticleList.vue';

export default defineComponent({
  components: { ArticleList },
  setup() {
    return {};
  },
});
</script>

<template>
  <div class="nav-list">
    <a href="/tag//frontend">前端</a>
    <a href="/tag/backend">后端</a>
    <a href="/tag/android">Android</a>
    <a href="/tag/ios">iOS</a>
    <a href="/tag/AI">人工智能</a>
    <a href="/tag/freebie">开发工具</a>
    <a href="/tag/career">代码人生</a>
    <a href="/tag/read">阅读</a>
    <a href="#tag" class="right">标签管理</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});
</script>


<style lang="scss" scoped>
.nav-list {
  font-size: 0.9rem;
  max-width: 960px;
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  line-height: 1;
  padding: 10px;
  background-color: #fff;

  a {
    padding: 10px;
  }
}
</style>
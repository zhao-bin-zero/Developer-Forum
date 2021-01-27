<template>
  <div class="nav-list">
    <a href="">推荐</a>
    <a href="">关注</a>
    <a href="">后端</a>
    <a href="">前端</a>
    <a href="">Android</a>
    <a href="">iOS</a>
    <a href="">人工智能</a>
    <a href="">开发工具</a>
    <a href="">代码人生</a>
    <a href="">阅读</a>
    <a href="" class="right">标签管理</a>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
</script>

<style lang="scss" scoped>
.nav-list {
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
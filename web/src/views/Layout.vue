<template>
  <a-layout>
    <div class="header">
      <a-layout-header class="container"><m-header /> </a-layout-header>
    </div>
    <a-layout-content class="container"><router-view /></a-layout-content>
    <a-layout-footer class="footer container">
      版权所有：MainHou ©2021
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import MHeader from '@/components/MHeader.vue';
</script>

<style lang="scss" scoped>
.ant-layout {
  position: relative;

  .header {
    width: 100%;
    background-color: #fff;
  }

  .ant-layout-header {
    padding: 0;
  }

  .ant-layout-content {
    margin: 0 auto;
    max-width: 960px;
  }

  > .ant-layout {
    width: 100%;
  }
}
</style>

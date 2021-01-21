<template>
  <a-layout>
    <m-header />
    <a-layout-content><router-view /></a-layout-content>
    <a-layout-footer> 版权所有：MainHou ©2021 </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import MHeader from '@/components/MHeader.vue';
</script>

<style lang="postcss" scoped>
.ant-layout {
  text-align: center;

  & .ant-layout-footer {
    line-height: 1.5;
    background-color: #fff;
  }

  & .ant-layout-content {
    max-width: 1200px;
    background-color: #fff;
    margin: 0 auto;
  }

  & > .ant-layout {
    width: 100%;
  }
}
</style>

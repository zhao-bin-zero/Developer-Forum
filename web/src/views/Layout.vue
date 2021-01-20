<template>
  <div id="layout">
    <a-layout>
      <m-header />
      <a-layout-content><router-view /></a-layout-content>
      <a-layout-footer>尾部</a-layout-footer>
    </a-layout>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import MHeader from '../components/MHeader.vue';
export default defineComponent({
  components: { MHeader },
  name: 'HomeLayout',
  data() {
    return {
      current: ['home'],
    };
  },
  methods: {},
});
</script>

<style lang="postcss" scoped>
#layout {
  text-align: center;

  & .ant-layout-footer {
    line-height: 1.5;
    background-color: #fff;
  }

  & .ant-layout-content {
    width: 100%;
  }

  & > .ant-layout {
    width: 100%;
  }
}
</style>

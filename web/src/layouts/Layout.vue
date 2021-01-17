<template>
  <div id="layout">
    <a-layout>
      <a-layout-header>
        <nav>
          <a-menu
            :selectedKeys="current"
            mode="horizontal"
            @click="MenuClick()"
          >
            <a-menu-item key="home">
              <router-link to="/">Home Page</router-link>
            </a-menu-item>
            <a-menu-item key="about">
              <router-link to="/about">About Page</router-link>
            </a-menu-item>
          </a-menu>
        </nav>
      </a-layout-header>
      <a-layout-content><router-view /></a-layout-content>
      <a-layout-footer>尾部</a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Layout',
  data() {
    return {
      current: ['about'],
    };
  },
  methods: {
    MenuClick() {},
  },
});
</script>
<style lang="postcss">
#layout {
  text-align: center;
}
#layout .ant-layout-header,
#layout .ant-layout-footer {
  color: #fff;
}
#layout .ant-layout-footer {
  line-height: 1.5;
}
#layout .ant-layout-content {
  width: 100%;
}
#layout > .ant-layout {
  width: 100%;
}
</style>

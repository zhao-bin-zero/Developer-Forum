<template>
  <a-layout-header>
    <nav>
      <a-menu :selectedKeys="current" mode="horizontal">
        <a-menu-item disabled>
          <div class="logo">logo</div>
        </a-menu-item>
        <a-menu-item key="home">
          <router-link to="/">首页</router-link>
        </a-menu-item>
        <a-menu-item key="pins">
          <router-link to="/">沸点</router-link>
        </a-menu-item>
        <a-menu-item key="books">
          <router-link to="/">小册</router-link>
        </a-menu-item>
        <a-menu-item key="events">
          <router-link to="/events">小册</router-link>
        </a-menu-item>
      </a-menu>
    </nav>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MHeader',
});
</script>

<style lang="postcss" scoped>
.ant-layout-header {
  background-color: #fff;
  & nav {
    & a {
      font-weight: bold;
      .router-link-exact-active {
      }
    }
  }
}
</style>
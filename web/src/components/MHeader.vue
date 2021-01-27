<template>
  <nav class="header">
    <ul>
      <li>
        <div href="#" class="logo">
          <img src="/favicon.ico"/>
          <span>开发者社区</span>
        </div>
      </li>
      <li class="route-item">
        <router-link to="/">首页</router-link>
      </li>
      <li class="route-item">
        <router-link to="/">沸点</router-link>
      </li>
      <li class="route-item">
        <router-link to="/">小册</router-link>
      </li>
      <li class="route-item">
        <router-link to="/events">活动</router-link>
      </li>
      <li>
        <a-input-search
          v-model:value="value"
          placeholder="input search text"
          style="width: 200px"
          @search="onSearch"
        />
      </li>
      <li>
        <a href="#">
          <MessageOutlined />
        </a>
      </li>
      <li>
        <login />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { MessageOutlined } from '@ant-design/icons-vue';
import Login from '@/components/Login.vue';
import { ref } from 'vue';

const value = ref<string>('');

const onSearch = (newValue) => {
  console.log('use value', newValue);
  console.log('or use this.value', value);
};
</script>

<style lang="scss" scoped>
.header {
  max-width: 960px;
  font-size: 16px;
  nav {
    ul {
      li {
        position: relative;
        padding: 10px 10px 10px 0;

        a {
          display: inline-block;
        }

        &.route-item:hover::after {
          content: '';
          width: 100%;
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          border-bottom: 2px solid blue;
        }
      }
    }
  }
}
</style>

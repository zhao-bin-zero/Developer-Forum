<template>
  <a-layout-header class="header">
    <nav>
      <ul>
        <li>
          <div class="logo">logo</div>
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
      </ul>
    </nav>
  </a-layout-header>
</template>

<script setup lang="ts">
import { MessageOutlined } from '@ant-design/icons-vue';

const value = '';

const onSearch = (newValue) => {
  console.log('use value', newValue);
  console.log('or use this.value', value);
};
</script>

<style lang="postcss">
.header {
  background-color: #fff;
  & nav {
    & ul {
      & li {
        position: relative;
        display: inline-block;
        padding: 0 10px;
        list-style: none;

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

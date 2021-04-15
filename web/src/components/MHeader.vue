<template>
  <nav class="header">
    <ul>
      <li>
        <div href="#" class="logo">
          <img src="/favicon.ico" />
          <span>开发者社区</span>
        </div>
      </li>
      <li class="route-item">
        <router-link to="/">首页</router-link>
      </li>
      <li class="route-item">
        <router-link to="/pins">沸点</router-link>
      </li>
      <!-- <li class="route-item">
        <router-link to="/books">小册</router-link>
      </li> -->
      <li class="route-item">
        <router-link to="/events">活动</router-link>
      </li>
      <div class="right">
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
          <a-button @click="handleButtonClick">写文章</a-button>
        </li>
        <li>
          <login />
        </li>
      </div>
    </ul>
  </nav>
</template>

<script lang="ts">
import { MessageOutlined } from '@ant-design/icons-vue';
import Login from '../components/Login.vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    MessageOutlined,
    Login,
  },
  setup() {
    const router = useRouter();
    const value = ref<string>('');
    const visible = ref<boolean>(false);

    /**
     * 搜索事件
     */
    const onSearch = (newValue: string) => {
      console.log('use value', newValue);
      console.log('or use this.value', value);
    };

    /**
     * 发布文章事件
     */
    const handleButtonClick = (e: Event) => {
      router.push('/article/editor');
    };

    /**
     * 模态框提交事件
     */
    const handleOk = (e: Event) => {
      visible.value = false;
    };

    return {
      value,
      visible,
      onSearch,
      handleButtonClick,
      handleOk,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  max-width: 960px;
  font-size: 1rem;
  nav {
    .right {
      display: inline-block;
      float: right;
    }
    .right::after {
      display: inline-block;
      content: "";
      clear: both;
    }
    ul {
      margin: 0 auto;
      padding: 0;
      li {
        position: relative;
        padding: 0 0.8rem;

        &:first {
          padding-right: 0;
        }

        a {
          display: inline-block;
          margin: 0 auto;
        }

        &.route-item:hover::after {
          content: "";
          width: 100%;
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          border-bottom: 0.2rem solid blue;
        }
      }
    }
  }
}
</style>

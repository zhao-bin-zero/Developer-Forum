<template>
  <a-list
    class="article-list"
    item-layout="vertical"
    size="large"
    :pagination="pagination"
    :data-source="listData"
  >
    <template #footer>
      <div><b>ant design vue</b> footer part</div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <template #actions>
          <span v-for="{ type, text } in actions" :key="type">
            <component v-bind:is="type" style="margin-right: 8px" />
            {{ text }}
          </span>
        </template>
        <template #extra>
          <img
            width="272"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        </template>
        <div>
          <a href="#name"
            ><span>{{ item.name }} </span></a
          >·<a href="#time"><span>12小时前</span></a
          >·<a href="#type"><span>JavaScript</span></a>
        </div>
        <a-list-item-meta :description="item.description">
          <template #title>
            <a :href="item.href">{{ item.title }}</a>
          </template>
          <template #avatar>{{ item.name }}</template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    name: '小明',
  });
}
export default defineComponent({
  components: {
    StarOutlined,
    LikeOutlined,
    MessageOutlined,
  },
  data() {
    return {
      listData,
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      },
      actions: [
        { type: 'LikeOutlined', text: '156' },
        { type: 'MessageOutlined', text: '2' },
      ],
    };
  },
});
</script>

<style lang="postcss" scoped>
.article-list {
  width: 700px;
}
</style>

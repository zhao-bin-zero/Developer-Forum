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
          <span v-for="{ type, text } in item.actions" :key="type">
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
            ><span>{{ item.username }} </span></a
          >·<a href="#time"><span>12小时前</span></a
          >·<a href="#type"><span>JavaScript</span></a>
        </div>
        <a-list-item-meta :description="item.description">
          <template #title>
            <a :href="'/article/' + item.article_id">{{ item.title }}</a>
          </template>
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
import { defineComponent, onMounted, ref, reactive } from 'vue';
import { artcileList, artcileCount } from '../api/article';
async function getList(current, pageSize, listData) {
  // 获得文章列表
  const articleData = await artcileList(current, pageSize);
  articleData.data.forEach((item, index) => {
    listData.push(item);
    listData[index].actions = [
      { type: 'StarOutlined', text: item.view },
      { type: 'LikeOutlined', text: item.like },
    ];
  });
}

export default defineComponent({
  components: {
    StarOutlined,
    LikeOutlined,
    MessageOutlined,
  },
  setup() {
    // 一页文章最大数
    const pageSize: number = 2;
    // 文章数据
    const listData = reactive<Record<string, string | number>[]>([]);
    // 文章总数
    const count = ref<number>(0);
    const current = ref<number>(1);

    const pagination = reactive({
      onChange: async (page: number) => {
        console.log(page);
        current.value = page;
        listData.length = 0;
        await getList(current.value, pageSize, listData);
      },
      current: current,
      pageSize,
      total: count,
    });

    onMounted(async () => {
      // 获得文章总个数
      count.value = (await artcileCount()).data.count;
      // 获取文章数据
      await getList(current.value, pageSize, listData);
      pagination.total = count.value;
    });

    return {
      listData,
      pagination,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-list {
  width: 100%;
  background-color: #fff;
  padding: 10px;
  margin: 10px 0;
}
</style>

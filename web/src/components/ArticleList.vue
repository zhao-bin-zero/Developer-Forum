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
import { defineComponent } from 'vue';
import { artcileList, artcileCount } from '../api/article';
const pageSize: number = 1;
export default defineComponent({
  components: {
    StarOutlined,
    LikeOutlined,
    MessageOutlined,
  },
  data() {
    // 文章数据
    const listData: Record<string, string | number>[] = [];
    // 文章总数
    let countArticle: number;
    return {
      listData,
      countArticle,
    };
  },
  async created() {
    // 获得文章总个数
    const countData = await artcileCount();
    const total = countData.data.count || 0;
    this.countArticle = countData.data.count;
    const pagination = {
      onChange: (page: number) => {
        console.log(page);
      },
      pageSize:2,
      total:8,
    };

    // 获得文章列表
    const articleData = await artcileList(1, pageSize);
    articleData.data.forEach((item, index) => {
      this.listData.push(item);
      this.listData[index].actions = [
        { type: 'StarOutlined', text: item.view },
        { type: 'LikeOutlined', text: item.like },
      ];
      this.action;
    });
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

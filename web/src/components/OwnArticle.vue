<template>
  <a-list
    class="article-list"
    item-layout="vertical"
    size="large"
    :pagination="pagination"
    :data-source="listData"
  >
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <template #actions>
          <span
            v-for="{ type, text } in item.actions"
            :key="type"
            @click="handleActionClick(type, item)"
          >
            <component v-bind:is="type" style="margin-right: 8px" />
            {{ text }}
          </span>
          <a-button type="danger" @click="handleDelete(item.article_id)">删除</a-button>
        </template>
        <template #extra>
          <img
            width="272"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        </template>
        <div>
          <a href="#name">
            <span>{{ item.username }}</span>
          </a>·
          <a href="#time">
            <span>{{ moment(item.updated_at).startOf('day').fromNow() }}</span>
          </a>·
          <a href="#type">
            <span>{{ item.nickname }}</span>
          </a>
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
import { defineComponent, onMounted, ref, reactive, toRefs } from 'vue';
import { artcileCount, getList, artcileCountByName, artcileDelete } from '../services/article';
import { ArticleData } from '../types';
import { useRoute } from 'vue-router';
import moment from 'moment';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
moment.locale('zh-cn');

export default defineComponent({
  components: {
    StarOutlined,
    LikeOutlined,
    MessageOutlined,
  },
  setup() {
    const store = useStore();
    const { user_id } = store.getters;

    // 一页文章最大数
    const pageSize: number = 2;

    const state = reactive({
      listData: reactive<ArticleData[]>([]),// 文章数据
      current: ref<number>(1), // 当前文章
      count: ref<number>(0) // 文章总数
    })

    const route = useRoute();
    const tagname: any = route.params.tagname;

    const pagination = reactive({
      onChange: async (page: number) => {
        console.log(page);
        state.current = page;
        state.listData.length = 0;
        await getList(state.current, pageSize, state.listData, tagname, user_id);
      },
      current: state.current,
      pageSize,
      total: state.count,
    });

    onMounted(async () => {
      // 获得文章总个数
      if (tagname) {
        state.count = (await artcileCountByName(tagname, user_id)).data.count;
      } else {
        state.count = (await artcileCount(user_id)).data.count;
      }
      // 获取文章数据
      await getList(state.current, pageSize, state.listData, tagname, user_id);
      pagination.total = state.count;
    });

    const handleActionClick = (type: string, ArticleData: ArticleData) => {
      switch (type) {
        case 'LikeOutlined':
          ArticleData.enjoy += 1;
          ArticleData.actions.forEach(item => {
            if (item.type == 'LikeOutlined') item.text = ArticleData.enjoy;
          })
      }
    }

    /**
     * 删除文章
     * @param article_id 文章id
     */
    const handleDelete = async (article_id: number) => {
      const r = await artcileDelete(article_id);
      if (r.statusCode === 200) {
        message.success('删除文章成功');
        state.listData.length = 0;
        await getList(state.current, pageSize, state.listData, tagname, user_id);
      } else {
        message.error('删除文章失败');
      }
    }

    return {
      ...toRefs(state),
      pagination,
      moment,
      handleActionClick,
      handleDelete
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

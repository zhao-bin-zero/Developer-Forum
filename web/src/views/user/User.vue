<template>
  <div id="user container">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="动态">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane key="2" tab="文章" force-render>Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane key="3" tab="沸点">
        <Message></Message>
      </a-tab-pane>
      <a-tab-pane key="4" tab="收藏">
        <a-list item-layout="vertical" size="large" :data-source="data">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-card :title="item.title">
                <span>257 篇</span>·
                <span>0 人关注</span>·
                <span>Main丶侯</span>
              </a-card>
            </a-list-item>
          </template>
        </a-list>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Message from './Message.vue';
export default defineComponent({
  components: {
    Message
  },
  setup() {
    const data = [
      {
        title: 'Title 1',
      },
      {
        title: 'Title 2',
      },
      {
        title: 'Title 3',
      },
      {
        title: 'Title 4',
      },
    ];
    return {
      activeKey: ref('1'),
      data
    };
  }
});
</script>

<style lang="scss" scoped>
#user {
}
</style>
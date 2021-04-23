<template>
  <div class="editor">
    <a-form>
      <a-form-item required="true" label="文章标签名:">
        <a-select
          class="select"
          v-model:value="select_value"
          style="width: 120px;"
          ref="select"
          @change="handleChange"
        >
          <a-select-option value="1">前端</a-select-option>
          <a-select-option value="2">后端</a-select-option>
          <a-select-option value="3">安卓</a-select-option>
          <a-select-option value="4">IOS</a-select-option>
          <a-select-option value="5">人工智能</a-select-option>
          <a-select-option value="6">开发工具</a-select-option>
          <a-select-option value="7">代码人生</a-select-option>
          <a-select-option value="8">阅读</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item required="true" label="文章名">
        <a-input v-model:value="article.title" placeholder="文章名称" />
      </a-form-item>
      <a-form-item required="true" label="文章概述">
        <a-input v-model:value="article.description" placeholder="文章概述" />
      </a-form-item>
      <a-form-item>
        <div ref="editor" class="ed"></div>
      </a-form-item>
      <a-form-item>
        <button @click="syncHTML">提交文章</button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import WangEditor from 'wangeditor';
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { artcileAdd } from '../../services/article';
import { Article } from '../../types';
import Message from 'ant-design-vue/es/message';

export default defineComponent({
  name: 'Editor',
  setup() {
    const editor = ref(); // 富文本编辑器

    const select_value = ref<number | string>(1);
    const article = reactive<Article>({
      description: '',
      title: '',
      content: '', // 富文本编辑器内容
      content_html: '', // 富文本编辑器HTML
      tag_id: 0,
      enjoy: 0,
      view: 0,
      isPublished: true,
    });

    let instance: any;  // 文本编辑实例
    onMounted(() => {
      // 创建富文本编辑器
      instance = new WangEditor(editor.value);
      Object.assign(instance.config, {
        onchange() {
          console.log('change');
        },
      });
      instance.config.zIndex = 1;
      instance.create();
    });
    onBeforeUnmount(() => {
      // 销毁富文本编辑器
      instance.destroy();
      instance = null;
    });
    /**
     * 获得富文本HTML内容
     */
    const syncHTML = () => {
      article.content_html = instance.txt.html();
      article.content = instance.txt.text();
      (async () => {
        article.user_id = Number(localStorage.getItem('user_id'));
        article.tag_id = Number(select_value.value);
        await artcileAdd(article).then((r: any) => {
          if (r.statusCode === 200) {
            Message.success('成功发布文章')
          }
        })
      })();
    };

    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };

    return {
      article,
      editor,
      select_value,
      syncHTML,
      handleChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor {
  margin-top: 20px;
  width: 100%;
}
</style>
<template>
  <div class="editor">
    <a-form>
      <a-form-item label="文章标签名:">
        <a-select
          class="select"
          v-model:value="value1"
          style="width: 120px;z-index:99;position:absolute;"
          @focus="focus"
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
      <a-form-item label="文章名">
        <a-input v-model:value="article.title" placeholder="文章名称" />
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
import WangEditor from 'https://cdn.skypack.dev/wangeditor';
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { artcileAdd } from '../../services/article';
import { Article } from '../../types';

export default defineComponent({
  name: 'Editor',
  setup() {
    const editor = ref(); // 富文本编辑器

    const select_value = ref();
    const article = reactive<Article>({
      content: '', // 富文本编辑器内容
      content_html: '', // 富文本编辑器HTML
      title: '',
      tag_id: 0,
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
      (async () => {
        article.user_id = Number(localStorage.getItem('user_id'));
        await artcileAdd(article).then((r) => {
          console.log(r);
        })
      })();
    };

    /**
     * 多选
     */
    const focus = () => {
      console.log('focus');
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
      focus,
      value1: ref('lucy'),
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
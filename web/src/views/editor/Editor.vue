<template>
  <div class="editor">
    <div ref="editor"></div>
    <button @click="syncHTML">同步内容</button>
    <div :innerHTML="content.html"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import WangEditor from 'https://cdn.skypack.dev/wangeditor';

export default defineComponent({
  name: 'Editor',
  setup() {
    const editor = ref(); // 富文本编辑器
    const content = reactive({
      html: '',
      text: '',
    }); // 富文本编辑器内容

    let instance: any;  // 文本编辑实例
    onMounted(() => {
      // 创建富文本编辑器
      instance = new WangEditor(editor.value);
      Object.assign(instance.config, {
        onchange() {
          console.log('change');
        },
      });
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
      content.html = instance.txt.html();
    };
    return {
      syncHTML,
      editor,
      content,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor {
  margin-top: 20px;
  width: 100%;
  background-color: #fff;
}
</style>
<template>
  <div class="login">
    <a-button type="primary" @click="showModal"> 登录 </a-button>
    <a-modal
      title="Title"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);

const showModal = () => {
  visible.value = true;
  console.log(visible);
};

const handleOk = (e: EventTarget) => {
  confirmLoading.value = true;
  setTimeout(() => {
    visible.value = false;
    confirmLoading.value = false;
  }, 2000);
};
</script>

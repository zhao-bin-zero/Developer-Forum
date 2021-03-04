<template>
  <div class="login">
    <a-button v-if="!isLogin" type="primary" @click="showModal">
      登录
    </a-button>
    <div v-if="isLogin">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          你好：{{store.getters.username}}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">我的主页</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">我的收藏</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">标签管理</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <a-modal
      title="登录"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      :onOk="handleOk"
    >
      <a-form ref="ruleForm" :model="form" :rules="rules">
        <a-form-item ref="username" required label="username" name="username">
          <a-input v-model:value="form.username" />
        </a-form-item>
        <a-form-item ref="password" required label="password" name="password">
          <a-input
            v-model:value="form.password"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { userData } from '../typings';
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import message from 'ant-design-vue/es/message';
import { DownOutlined } from '@ant-design/icons-vue';

const visible = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const isLogin = ref<boolean>(false);
const store = useStore();

const showModal = () => {
  visible.value = true;
};

const handleOk = (e: EventTarget) => {
  confirmLoading.value = true;
  visible.value = false;
  confirmLoading.value = false;
  (async () => {
    await store.dispatch('login', form).then(() => {
      message.success('登录成功');
    });
    await store.dispatch('GetInfo').then(()=> {
      isLogin.value = true;
    });
  })();
};

const form = reactive<userData>({
  username: '',
  password: '',
});

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '长度必须大于 6', trigger: 'blur' },
  ],
};
</script>

<style lang="scss" scoped>
.ant-row {
  margin: 1rem 0;
}
</style>

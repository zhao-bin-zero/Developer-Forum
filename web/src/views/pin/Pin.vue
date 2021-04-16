<template>
    <div id="pins">
        <a-list
            class="comment-list"
            :header="`沸点列表:${pinData.length} replies`"
            item-layout="horizontal"
            :data-source="pinData"
        >
            <template #renderItem="{ item }">
                <a-list-item>
                    <a-comment :author="item.author" :avatar="item.avatar">
                        <template #content>
                            <p>{{ item.content }}</p>
                        </template>
                        <template #datetime>
                            <a-tooltip :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
                                <span>{{ item.datetime.fromNow() }}</span>
                            </a-tooltip>
                        </template>
                    </a-comment>
                </a-list-item>
            </template>
        </a-list>
        <a-comment>
            <template #avatar>
                <a-avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                />
            </template>
            <template #content>
                <a-form-item>
                    <a-textarea :rows="4" v-model:value="value" />
                </a-form-item>
                <a-form-item>
                    <a-button
                        html-type="submit"
                        :loading="submitting"
                        type="primary"
                        @click="handleSubmit"
                    >添加沸点</a-button>
                </a-form-item>
            </template>
        </a-comment>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { pinAdd, pinList } from '../../services/pin';
import { DeleteOutlined } from '@ant-design/icons-vue';
import moment from 'moment';
import { PinData } from '../../types';
moment.locale('zh-cn');

export default defineComponent({
    name: 'Pin',
    setup() {
        const submitting = ref<boolean>(false);
        const value = ref<string>('');
        const pinData = reactive<PinData[]>([])

        onMounted(async () => {
            await pinList(-1, -1).then(r => {
                r.data.forEach(item => {
                    pinData.push({
                        author: item.username,
                        avatar: item.avatar,
                        content: item.content,
                        pin_id: item.pin_id,
                        datetime: moment(item.created_at).subtract(2, 'days'),
                    })
                })
            })
        });

        const handleSubmit = () => {
            if (!value.value) {
                return;
            }

            submitting.value = true;

            setTimeout(async () => {
                submitting.value = false;
                const { data } = await pinAdd({
                    user_id: Number(localStorage.getItem('user_id')),
                    content: value.value,
                })
                pinData.push({
                    author: localStorage.getItem('username'),
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: value.value,
                    datetime: moment().subtract(2, 'days'),
                    pin_id: data.pin_id
                });
                value.value = '';
            }, 1000);
        };

        return {
            pinData,
            submitting,
            value,
            handleSubmit,
        };
    },
    components: {
        DeleteOutlined,
    }
})
</script>

<style lang="scss" scoped>
#pins {
    width: 960px;
}
</style>
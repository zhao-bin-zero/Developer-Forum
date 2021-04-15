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
                        <template #actions>
                            <span v-for="(action, index) in item.actions" :key="index">{{ action }}</span>
                        </template>
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
import { defineComponent, onBeforeMount, reactive, ref } from 'vue';
import moment from 'moment';
import { PinData } from '../../types';
import { pinAdd, pinList } from '../../services/pin';
import { useStore } from 'vuex';

type ListData = {
    author: string | undefined;
    avatar: string | undefined;
    content: string | undefined;
    datetime: Date | moment.Moment;
    actions?: any;
}

export default defineComponent({
    name: 'Pin',
    setup() {
        const submitting = ref<boolean>(false);
        const value = ref<string>('');
        const pinData = reactive<ListData[]>([])
        const store = useStore();

        onBeforeMount(async () => {
            await pinList(-1, -1).then(r => {
                r.data.forEach(item => {
                    pinData.push({
                        author: item.username,
                        avatar: item.avatar,
                        content: item.content,
                        datetime: moment(item.created_at).subtract(2, 'days'),
                    })
                })
            })
        })

        const handleSubmit = () => {
            if (!value.value) {
                return;
            }

            submitting.value = true;

            setTimeout(() => {
                submitting.value = false;
                pinAdd({
                    user_id: localStorage.getItem('user_id'),
                    content: value.value,
                })
                pinData.push({
                    author: 'admin1',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: value.value,
                    datetime: moment().subtract(2, 'days'),
                });
                value.value = '';
            }, 1000);
        };

        return {
            pinData,
            submitting,
            value,
            moment,
            handleSubmit,
        };
    },
})
</script>
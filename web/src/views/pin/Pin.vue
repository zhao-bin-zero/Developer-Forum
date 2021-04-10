<template>
    <div id="pins">
        评论列表
        <a-list
            class="comment-list"
            :header="`${comments.length} replies`"
            item-layout="horizontal"
            :data-source="comments"
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
                    >Add Comment</a-button>
                </a-form-item>
            </template>
        </a-comment>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import moment from 'moment';

export default defineComponent({
    name: 'Pin',
    setup() {
        const comments = ref<any[]>([]);
        const submitting = ref<boolean>(false);
        const value = ref<string>('');

        const data = [
            {
                actions: ['回复'],
                author: 'Han Solo',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content:
                    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                datetime: moment().subtract(1, 'days'),
            },
            {
                actions: ['回复'],
                author: 'Han Solo',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content:
                    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                datetime: moment().subtract(2, 'days'),
            },
        ];

        comments.value.push(...data);

        const handleSubmit = () => {
            if (!value.value) {
                return;
            }

            submitting.value = true;

            setTimeout(() => {
                submitting.value = false;
                comments.value.push({
                    author: 'Han Solo',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: value.value,
                    datetime: moment().subtract(2, 'days'),
                });
                value.value = '';
                console.log(comments.value);
            }, 1000);
        };

        return {
            comments,
            submitting,
            value,

            moment,
            handleSubmit,
        };
    },
})
</script>

<style lang="scss" scoped>
</style>
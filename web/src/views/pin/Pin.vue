<template>
    <div id="pins">
        <a-list
            class="comment-list"
            :header="`${data.length} replies`"
            item-layout="horizontal"
            :data-source="data"
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
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import moment from 'moment';

export default defineComponent({
    name: 'Pin',
    setup() {
        return {
            data: [
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
            ],
            moment,
        };
    },
})
</script>

<style lang="scss" scoped>
</style>
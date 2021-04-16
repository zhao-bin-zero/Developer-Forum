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
                            <span key="comment-basic-reply-to">
                                <DeleteOutlined @click="handleDelete(item.pin_id)" />
                            </span>
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
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { pinDelete, pinListByUserId } from '../../services/pin';
import { DeleteOutlined } from '@ant-design/icons-vue';
import moment from 'moment';
import { PinData } from '../../types';
import { useStore } from 'vuex';
moment.locale('zh-cn');

export default defineComponent({
    name: 'Pin',
    setup() {
        const submitting = ref<boolean>(false);
        const value = ref<string>('');
        const pinData = reactive<PinData[]>([])
        const Store = useStore();

        onMounted(async () => {
            await pinListByUserId(Store.getters.user_id, -1, -1).then(r => {
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

        const handleDelete = async (pin_id: number) => {
            const data: any = await pinDelete(pin_id);
            if (data.statusCode === 200) pinData.map((item, index) => {
                if (item.pin_id == pin_id) {
                    pinData.splice(index, 1);
                }
            })
        }

        return {
            pinData,
            submitting,
            value,
            handleDelete,
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
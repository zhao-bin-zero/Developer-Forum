<template>
    <div id="events">
        <a-carousel autoplay>
            <div class="item">
                <a href="#">
                    <img
                        src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91008403945c41ee87ad339802b7f78b~tplv-k3u1fbpfcp-watermark.image"
                        alt="描述"
                    />
                </a>
            </div>
            <div class="item">
                <a href="#">
                    <img
                        src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d6273f15a1648eda4aa1ab7b50fef8f~tplv-k3u1fbpfcp-watermark.image"
                        alt="描述"
                    />
                </a>
            </div>
            <div class="item">
                <a href="#">
                    <img
                        src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d04c29ed35bc4beda08df44b003a9690~tplv-k3u1fbpfcp-watermark.image"
                        alt="描述"
                    />
                </a>
            </div>
        </a-carousel>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Events',
});
</script>

<style lang="scss" scoped>
#events {
    width: 500px;
    margin: 0 auto;
    .item {
        img {
            width: 500px;
        }
    }
}
</style>
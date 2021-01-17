<template>
  <div id="home">
    <p>Home</p>
    <HelloWorld msg="Hello Vue 3 + Vite" />
  </div>
</template>

<script>
import HelloWorld from '@/components/home/HelloWorld.vue';
export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>

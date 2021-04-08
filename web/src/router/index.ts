import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/views/Layout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import('@/views/article/Article.vue'),
        meta: { title: '首页', icon: '' },
      },
      {
        path: '/tag/:tagname',
        component: () => import('@/views/article/Article.vue'),
        meta: { title: '分类文章', icon: '' },
      },
      {
        path: '/editor',
        component: () => import('@/views/editor/Editor.vue'),
        meta: { title: '新建文章', icon: '' },
      },
      {
        path: '/pins',
        component: () => import('@/views/pins/Pins.vue'),
        meta: { title: '沸点', icon: '' },
      },
      {
        path: '/events',
        component: () => import('@/views/events/Events.vue'),
        meta: { title: '活动', icon: '' },
      },
      {
        path: '/books',
        component: () => import('@/views/books/Books.vue'),
        meta: { title: '小册', icon: '' },
      },
    ],
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

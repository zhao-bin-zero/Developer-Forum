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
    ],
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Converter',
    component: () => import('../pages/Converter.vue')
  },
  {
    path: '/bag',
    name: 'Bag',
    component: () => import('../pages/Bag.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

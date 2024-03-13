import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/HomeView.vue')
const Product = () => import('../views/ProductView.vue')
const Cart = () => import('../views/CartView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/:category',
          name: 'category',
          component: Home
        }
      ]
    },
    {
      path: '/:category/:id',
      name: 'product',
      component: Product,
      props: true
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/:catchAll(.*)*',
      redirect: { name: 'home' }
    }
  ]
})

export default router

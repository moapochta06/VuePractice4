import store from '@/store'; 
import { createRouter, createWebHistory } from 'vue-router'

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
      next();
      return;
  }
  next('/home');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
      next();
      return;
  }
  next('/login');
};

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../components/Catalog.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path:'/signup',
    name: 'signup',
    component: () => import('../components/Register.vue')
  },
  {
    path:'/cart',
    name: 'cart',
    component: () => import('../components/Cart.vue')
  },
  {
    path:'/logout',
    name:'logout',
    component: () => import('../components/Logout.vue')
  },
  {
    path:'/history',
    name:'history',
    component: () => import('../components/History.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router

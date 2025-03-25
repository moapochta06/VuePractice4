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
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    beforeEnter: ifAuthenticated,
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router

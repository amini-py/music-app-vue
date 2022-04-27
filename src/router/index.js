import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store/store';

// Views
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import ManageView from '@/views/ManageView.vue'
import ErrorView from '@/views/ErrorView.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView
  },
  {
    name: 'about',
    path: '/about',
    component: AboutView
  },
  {
    name: 'manage',
    path: '/manage-music',
    // alias: '/manage',
    component: ManageView,
    beforeEnter: (to, from, next) => {
      if (store.state.userLoggedIn) {
        next()
      } else {
        next({ name: 'home' })
      }
    },
    meta: { requiresAuth: true }
  },
  {
    path: '/manage',
    redirect: { name: 'manage' }
  },
  {
    path: '/:catchAll(.*)*',
    component: ErrorView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some(record => record.meta.requiresAuth)) {
    next();
    return;
  }

  if (store.state.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' })
  }
})

export default router

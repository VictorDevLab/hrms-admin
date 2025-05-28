import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/my-work',
    name: 'MyWork',
    component: () => import('../pages/MyWork/index.vue')
  },
//   {
//     path: '/hr-self-service',
//     name: 'HRSelfService',
//     component: () => import('../pages/HRSelfService.vue')
//   },
//   {
//     path: '/admin-central',
//     name: 'AdminCentral',
//     component: () => import('../pages/AdminCentral.vue')
//   },
//   {
//     path: '/payroll-central',
//     name: 'PayrollCentral',
//     component: () => import('../pages/PayrollCentral.vue')
//   },
//   {
//     path: '/assets',
//     name: 'Assets',
//     component: () => import('../pages/Assets.vue')
//   },
//   {
//     path: '/profile',
//     name: 'Profile',
//     component: () => import('../pages/Profile.vue')
//   },

  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../pages/NotFound/index.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
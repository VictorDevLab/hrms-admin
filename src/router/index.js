import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ManagerCentral from '../pages/AdminCentral/index.vue'
import HrSelfService from '../pages/HrSelfService/index.vue'
import MyWork from '../pages/MyWork/index.vue'
import TrainingAndDev from '../pages/TrainingAndDev\'t/index.vue'
import Assets from '../pages/Assets/index.vue'
import Reports from '../pages/Stats/reports.vue'
import Profile from '../pages/Profile/index.vue'
import Login from '../pages/Login/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/my-work',
    name: 'MyWork',
    component: MyWork
  },
  {
    path: '/hr-self-service',
    name: 'HRSelfService',
    component: HrSelfService
  },
  {
    path: '/manager-central',
    name: 'ManagerCentral',
    component: ManagerCentral
  },
  {
    path: '/training-and-development',
    name: 'TrainingAndDev',
    component: TrainingAndDev
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports
  },
//   {
//     path: '/payroll-central',
//     name: 'PayrollCentral',
//     component: () => import('../pages/PayrollCentral.vue')
//   },
  {
    path: '/assets',
    name: 'Assets',
    component: Assets
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
 {
    path: '/configurations',
    name: 'Settings',
    component: () => import('../pages/Configurations/index.vue')
  },
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
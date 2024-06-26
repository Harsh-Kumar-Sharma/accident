import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    redirect: '/login', // Redirect '/' to '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/pages/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue'
          ),
      },
      {
        path: '/data-entry',
        name: 'DATA ENTRY',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/data-entry/FromData.vue'
          ),
      },
      {
        path: '/response',
        name: 'RESPONSE',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/response/Dashboard.vue'
          ),
      },
      {
        path: '/heat-map',
        name: 'HEAT MAP',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/heat-map/Dashboard.vue'
          ),
      },
      {
        path: '/reason',
        name: 'REASON',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/reason/Dashboard.vue'
          ),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router

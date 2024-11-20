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
      },
      {
        path: '/user',
        name: 'User',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/user.vue'
          ),
      },
      {
        path: '/settings',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/settings/SourceOfInformation.vue'
          ),
        name: 'Settings',
        children: [
          {
            path: 'source_of_information', // Matches /settings/source_of_information
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ '@/views/settings/SourceOfInformation.vue'
              ),
            name: 'Source Of Information',
          },
          {
            path: 'reasons_of_accidents', // Matches /settings/reasons_of_accidents
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ '@/views/settings/ReasonsOfAccidents.vue'
              ),
            name: 'Reasons Of Accidents',
          },
          {
            path: 'time_of_day', // Matches /settings/time_of_day
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ '@/views/settings/TimeOfDay.vue'
              ),
            name: 'Time Of Day',
          },
          {
            path: 'vehicle_category', // Matches /settings/vehicle_category
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ '@/views/settings/VehicleCategory.vue'
              ),
            name: 'Vehicle Category',
          },
          {
            path: 'vehicle_type', // Matches /settings/vehicle_type
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ '@/views/settings/VehicleType.vue'
              ),
            name: 'Vehicle Type',
          },
        ],
      },
      {
        path: '/:pathMatch(.*)*', // Use pathMatch to handle all undefined routes
        component: () =>
          import(
            /* webpackChunkName: "page404" */ '@/views/pages/Page404.vue'
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

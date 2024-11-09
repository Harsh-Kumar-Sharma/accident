export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavItem',
    name: 'HEAT MAP',
    to: '/heat-map',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavItem',
    name: 'REASON',
    to: '/reason',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavItem',
    name: 'RESPONSE',
    to: '/response',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavItem',
    name: 'Accident ENTRY',
    to: '/data-entry',
    icon: 'cil-notes',
  },
  {
    component: 'CNavItem',
    name: 'User Management',
    to: '/user',
    icon: 'cil-user',
  },
  {
    component: 'CNavGroup',
    name: 'Setting',
    to: '/pages',
    icon: 'cil-settings',
    items: [
      {
        component: 'CNavItem',
        name: 'Source Of Information',
        to: '/pages/login',
      },
      {
        component: 'CNavItem',
        name: 'Reasons Of Accidents',
        to: '/pages/register',
      },
      {
        component: 'CNavItem',
        name: 'time_of_day',
        to: '/pages/404',
      },
      {
        component: 'CNavItem',
        name: 'Vehicle Category',
        to: '/pages/500',
      },
      {
        component: 'CNavItem',
        name: 'Vehicle Type',
        to: '/pages/register',
      },
      {
        component: 'CNavItem',
        name: 'Time Of Day',
        to: '/pages/404',
      }
    ],
  },
]

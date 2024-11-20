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
    to: '/settings',
    icon: 'cil-settings',
    items: [
      {
        component: 'CNavItem',
        name: 'Source Of Information',
        to: '/settings/source_of_information',
      },
      {
        component: 'CNavItem',
        name: 'Reasons Of Accidents',
        to: '/settings/reasons_of_accidents',
      },
      {
        component: 'CNavItem',
        name: 'time_of_day',
        to: '/settings/time_of_day',
      },
      {
        component: 'CNavItem',
        name: 'Vehicle Category',
        to: '/settings/vehicle_category',
      },
      {
        component: 'CNavItem',
        name: 'Vehicle Type',
        to: '/settings/vehicle_type',
      }
    ],
  },
]

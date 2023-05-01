import { RouteName } from '@/router/router-name.enum';

export const dashboardIndexRoutes = [
  {
    path: '',
    name: RouteName.DashboardIndex,
    component: () =>
      import('@/modules/dashboard/modules/index/pages/DashboardIndexPage.vue'),
  },
];

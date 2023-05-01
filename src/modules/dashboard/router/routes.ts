import { AppLayout } from '@/modules/app/layouts/app-layouts.enum';
import AccessGuards from '@/modules/dashboard/router/guards/access';
import { RouteName } from '@/router/router-name.enum';

export const dashboardRoutes = [
  {
    path: '/dashboard',
    meta: {
      layout: AppLayout.Dashboard,
    },
    beforeEnter: [AccessGuards.main],
    children: [
      {
        path: '',
        name: RouteName.DashboardIndex,
        component: () =>
          import('@/modules/dashboard/pages/DashboardIndexPage.vue'),
      },
      {
        path: 'debts',
        name: RouteName.DashboardDebts,
        component: () =>
          import('@/modules/dashboard/pages/DashboardDebtsPage.vue'),
      },
    ],
  },
];

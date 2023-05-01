import { AppLayout } from '@/layouts/enums/app-layouts';
import AccessGuards from '@/modules/dashboard/router/guards/access';
import { dashboardDebtsRoutes } from '@/modules/dashboard/modules/debts/router/routes';
import { dashboardIndexRoutes } from '@/modules/dashboard/modules/index/router/routes';

export const dashboardRoutes = [
  {
    path: '/dashboard',
    meta: {
      layout: AppLayout.Dashboard,
    },
    beforeEnter: [AccessGuards.main],
    children: [...dashboardIndexRoutes, ...dashboardDebtsRoutes],
  },
];

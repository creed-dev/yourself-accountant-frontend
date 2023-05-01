import { RouteName } from '@/router/router-name.enum';
import { AppLayout } from '@/layouts/enums/app-layouts';

export const indexRoutes = [
  {
    path: '/',
    name: RouteName.Home,
    component: () => import('@/modules/index/pages/IndexPage.vue'),
    meta: {
      layout: AppLayout.Default,
    },
  },
];

import { RouteName } from '@/router/router-name.enum';
import { AppLayout } from '@/modules/app/layouts/app-layouts.enum';

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

import { createRouter, createWebHistory } from 'vue-router';
import { loadLayoutMiddleware } from '@/router/middlewares/load-layout.middleware';
import { AppLayout } from '@/enums/app-layouts.enum';
import RouterGuards from '@/helpers/router-guards';
import { RouteName } from '@/enums/router-name.enum';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.HOME,
      component: () => import('@/pages/Index/IndexPage.vue'),
      meta: {
        layout: AppLayout.DEFAULT,
      },
    },
    {
      path: '/dashboard',
      meta: {
        layout: AppLayout.DASHBOARD,
      },
      beforeEnter: [RouterGuards.dashboardGuard],
      children: [
        {
          path: '',
          name: RouteName.DASHBOARD_INDEX,
          component: () => import('@/pages/Dashboard/DashboardIndexPage.vue'),
        },
        {
          path: 'debts',
          name: RouteName.DASHBOARD_DEBTS,
          component: () => import('@/pages/Dashboard/DashboardDebtsPage.vue'),
        },
      ],
    },
  ],
});

router.beforeEach(loadLayoutMiddleware);

export default router;

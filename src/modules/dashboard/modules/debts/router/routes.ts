import { RouteName } from '@/router/router-name.enum';

export const dashboardDebtsRoutes = [
  {
    path: 'debts',
    name: RouteName.DashboardDebts,
    component: () =>
      import(
        '@/modules/dashboard/modules/debts/pages/DashboardDebtsIndexPage.vue'
      ),
  },
];

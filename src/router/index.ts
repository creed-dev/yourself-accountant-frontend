import { createRouter, createWebHistory } from 'vue-router';
import { loadLayout } from '@/router/middlewares/load-layout';
import { dashboardRoutes } from '@/modules/dashboard/router';
import { indexRoutes } from '@/modules/index/router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...indexRoutes, ...dashboardRoutes],
});

router.beforeEach(loadLayout);

export default router;

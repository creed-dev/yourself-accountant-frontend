import { createRouter, createWebHistory } from 'vue-router';
import { loadLayoutMiddleware } from '@/router/middlewares/load-layout.middleware';
import { dashboardRoutes } from '@/modules/dashboard/router';
import { indexRoutes } from '@/modules/index/router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...indexRoutes, ...dashboardRoutes],
});

router.beforeEach(loadLayoutMiddleware);

export default router;

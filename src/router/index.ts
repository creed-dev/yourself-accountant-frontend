import { createRouter, createWebHistory } from "vue-router";
import { loadLayoutMiddleware } from "@/router/middlewares/load-layout.middleware";
import { AppLayoutsEnum } from "@/enums/app-layouts.enum";
import RouterGuards from "@/helpers/router-guards";
import { RouterName } from "@/enums/router-name.enum";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: RouterName.HOME,
      component: () => import("@/pages/Index/IndexPage.vue"),
      meta: {
        layout: AppLayoutsEnum.DEFAULT,
      },
    },
    {
      path: "/dashboard",
      meta: {
        layout: AppLayoutsEnum.DASHBOARD,
      },
      beforeEnter: [RouterGuards.dashboardGuard],
      children: [
        {
          path: "",
          name: RouterName.DASHBOARD_INDEX,
          component: () => import("@/pages/Index/IndexPage.vue"),
        },
      ],
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

router.beforeEach(loadLayoutMiddleware);

export default router;

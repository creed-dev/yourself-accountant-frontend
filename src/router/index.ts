import { createRouter, createWebHistory } from "vue-router";
import { loadLayoutMiddleware } from "@/router/middlewares/loadLayout.middleware";
import { AppLayoutsEnum } from "@/enums/appLayouts.enum";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/Index/IndexPage.vue"),
      meta: {
        layout: AppLayoutsEnum.DEFAULT,
      },
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

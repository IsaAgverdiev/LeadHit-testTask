import { createRouter, createWebHistory } from "vue-router";

import AuthView from "@/views/AuthView.vue";
import AnalyticsView from "@/views/AnalyticsView.vue";

const routes = [
  {
    path: "/",
    component: AuthView,
  },
  {
    path: "/analytics",
    component: AnalyticsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import ListProducts from "../views/ListProducts.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ListProducts,
    },
    {
      path: "/edit/:productId",
      name: "edit",
      component: () => import("../views/EditProduct.vue"),
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../views/CreateProduct.vue"),
    },
  ],
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/kalendarz",
      name: "kalendarz",
      component: () => import("../views/KalendarzView.vue"),
    },
    {
      path: "/pacjenci",
      name: "pacjenci",
      component: () => import("../views/PacjenciView.vue"),
    },
    {
      path: "/profil",
      name: "profil",
      component: () => import("../views/ProfilView.vue"),
    },
    {
      path: "/wizyty",
      name: "wizyty",
      component: () => import("../views/WizytyView.vue"),
    },
  ],
});

export default router;

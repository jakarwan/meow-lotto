import store from "@/store";
import Vue from "vue";
import VueRouter from "vue-router";
import { HttpAuth } from "@/services/http-common";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/shop",
      name: "shop",
      component: () => import("@/views/shop/shop.vue"),
      meta: {
        contentClass: "ecommerce-application",
        requiresAuth: true,
      },
    },
    {
      path: "/shop/menu/:code",
      name: "menu",
      component: () => import("@/views/shop/menu.vue"),
      meta: {
        contentClass: "ecommerce-application",
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
      meta: {
        layout: "full",
        guest: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Register.vue"),
      meta: {
        layout: "full",
        guest: true,
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/dashboard/dashboard.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/add-lottery",
      name: "addlottery",
      component: () => import("@/views/dashboard/add-lottery"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/member",
      name: "member",
      component: () => import("@/views/member/member.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/prize",
      name: "prize",
      component: () => import("@/views/prize/prize.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/transaction",
      name: "transaction",
      component: () => import("@/views/transaction/transaction.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/withdraw",
      name: "withdraw",
      component: () => import("@/views/transaction/withdraw.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/affiliate",
      name: "affiliate",
      component: () => import("@/views/affiliate/affiliate.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/deposite",
      name: "deposite",
      component: () => import("@/views/transaction/deposite.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/report-withdraw",
      name: "report-withdraw",
      component: () => import("@/views/transaction/report-withdraw.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/report-credit",
      name: "report-credit",
      component: () => import("@/views/transaction/report-credit.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/report-prize",
      name: "report-prize",
      component: () => import("@/views/transaction/report-prize.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/report-lotto",
      name: "report-lotto",
      component: () => import("@/views/prize/report-lotto.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/poy",
      name: "poy",
      component: () => import("@/views/poy/poy.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/lotto-type",
      name: "lotto-type",
      component: () => import("@/views/lottotype/lottotype.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/lotto-type/edit-lottotype/:id",
      name: "edit-lottotype",
      component: () => import("@/views/lottotype/edit-lottotype.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/lotto-type/add-lottotype",
      name: "add-lottotype",
      component: () => import("@/views/lottotype/add-lottotype.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/prize-result",
      name: "prize-result",
      component: () => import("@/views/prize/prize-result.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/lotto-play",
      name: "lotto-play",
      component: () => import("@/views/prize/lotto-play.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/close-lotto",
      name: "close-lotto",
      component: () => import("@/views/close-lotto/close-lotto.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/pay-rate",
      name: "pay-rate",
      component: () => import("@/views/payrate/PayRate.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/checkout/:codeStore/:billCode",
      name: "checkout",
      component: () => import("@/views/checkout/ECommerceCheckout"),
      // props: true,
      meta: {
        requiresAuth: true,
        // contentClass: "ecommerce-application",
        // breadcrumb: [
        //   {
        //     text: "ECommerce",
        //   },
        //   {
        //     text: "Checkout",
        //     active: true,
        //   },
        // ],
      },
    },
    {
      path: "/playlotto/:huayId",
      name: "playlotto",
      component: () => import("@/views/playlotto/playlotto.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/lotto",
      name: "lotto",
      component: () => import("@/views/playlotto/lotto.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/error-404",
      name: "error-404",
      component: () => import("@/views/error/Error404.vue"),
      meta: {
        layout: "full",
      },
    },
    {
      path: "*",
      redirect: "error-404",
    },
  ],
});

router.beforeEach((to, form, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.Auth) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.guest)) {
//     if (store.getters.Auth) {
//       next("/");
//       return;
//     }
//     next();
//   } else {
//     next();
//   }
// });

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;

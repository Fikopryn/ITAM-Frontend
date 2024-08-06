import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: [
            "Home" /* , {to:"administration-console",name:"link"}  */,
          ],
        },
      },
      {
        path: "/adminCon",
        redirect: { name: "people" },
        children: [
          {
            path: "people",
            name: "people",
            component: () => import("@/views/adminCon/people/People.vue"),
            meta: {
              pageTitle: "Administration Console",
              breadcrumbs: ["People"],
            },
          },
          {
            path: "company",
            name: "company",
            component: () => import("@/views/adminCon/company/Company.vue"),
            meta: {
              pageTitle: "Administration Console",
              breadcrumbs: ["Company"],
            },
          },
          {
            path: "product-catalog",
            name: "product-catalog",
            component: () =>
              import("@/views/adminCon/prodCat/ProductCatalog.vue"),
            meta: {
              pageTitle: "Administration Console",
              breadcrumbs: ["Product Catalog"],
            },
          },
          {
            path: "purcType",
            name: "purcType",
            component: () =>
              import("@/views/adminCon/purcType/PurchaseType.vue"),
            meta: {
              pageTitle: "Administration Console",
              breadcrumbs: ["Purchase Type"],
            },
          },
          {
            path: "assStat",
            name: "assStat",
            component: () => import("@/views/adminCon/assStat/AssetStatus.vue"),
            meta: {
              pageTitle: "Administration Console",
              breadcrumbs: ["Asset Status"],
            },
          },
          {
            path: "assStatFin",
            name: "assStatFin",
            component: () =>
              import("@/views/adminCon/assStatFin/AssetStatusFinance.vue"),
            meta: {
              pageTitle: "Administration Console",
              breadcrumbs: ["Asset Status Finance"],
            },
          },
          {
            path: "role",
            name: "role",
            component: () => import("@/views/adminCon/role/Role.vue"),
            meta: {
              pageTitle: "Administration Console",
              breadcrumbs: ["Role"],
            },
          },
          // {
          //   path: "/adminCon/prodCat",
          //   name: "prodCat",
          //   component: () => import("@/views/adminCon/prodCat/Home.vue"),
          //   meta: {
          //     pageTitle: "Administration Console",
          //     breadcrumbs: ["Product Catalog"],
          //   },
          // },
          {
            path: "/adminCon/bulkUpdate",
            name: "bulkUpdate",
            component: () => import("@/views/adminCon/bulkUpdate/Home.vue"),
            meta: {
              pageTitle: "Administration Console",
              breadcrumbs: ["Bulk Update"],
            },
          },
        ],
      },
      {
        path: "/contManCon",
        redirect: { name: "contReg" },
        children: [
          {
            path: "/contManCon/contReg",
            name: "contReg",
            component: () =>
              import("@/views/contManCon/contReg/ContractRegistration.vue"),
            meta: {
              pageTitle: "Contract Management Console",
              breadcrumbs: ["Contract Registration"],
            },
          },
          {
            path: "/contManCon/reqOrder",
            name: "reqOrder",
            component: () =>
              import("@/views/contManCon/reqOrder/RequestPurchaseOrder.vue"),
            meta: {
              pageTitle: "Contract Management Console",
              breadcrumbs: ["Request Order"],
            },
          },
          {
            path: "/contManCon/delivOrder",
            name: "delivOrder",
            component: () =>
              import("@/views/contManCon/delivOrder/DeliveryOrder.vue"),
            meta: {
              pageTitle: "Contract Management Console",
              breadcrumbs: ["Delivery Order"],
            },
          },
        ],
      },
      {
        path: "/assetManCon",
        redirect: { name: "assetPlan" },
        children: [
          {
            path: "/assetManCon/asPlan",
            name: "assetPlan",
            component: () => import("@/views/assetManCon/asPlan/Home.vue"),
            meta: {
              pageTitle: "Asset Management Console",
              breadcrumbs: ["Asset Planning"],
            },
          },
          {
            path: "/assetManCon/regis",
            name: "regis",
            component: () =>
              import("@/views/assetManCon/regis/AssetRegistration.vue"),
            meta: {
              pageTitle: "Asset Management Console",
              breadcrumbs: ["Asset Registration"],
            },
          },
          {
            path: "/assetManCon/stag",
            name: "stag",
            component: () => import("@/views/assetManCon/stag/Home.vue"),
            meta: {
              pageTitle: "Asset Management Console",
              breadcrumbs: ["Asset Staging"],
            },
          },
          {
            path: "/assetManCon/deploy",
            name: "deploy",
            component: () => import("@/views/assetManCon/deploy/Home.vue"),
            meta: {
              pageTitle: "Asset Management Console",
              breadcrumbs: ["Asset Deployment"],
            },
          },
          {
            path: "/assetManCon/transOps",
            name: "transOps",
            component: () => import("@/views/assetManCon/transOps/Home.vue"),
            meta: {
              pageTitle: "Asset Management Console",
              breadcrumbs: ["Asset Transfer to Operation"],
            },
          },
          {
            path: "/assetManCon/review",
            name: "review",
            component: () => import("@/views/assetManCon/review/Home.vue"),
            meta: {
              pageTitle: "Asset Management Console",
              breadcrumbs: ["Asset Review"],
            },
          },
          {
            path: "/assetManCon/retire",
            name: "retire",
            component: () => import("@/views/assetManCon/retire/Home.vue"),
            meta: {
              pageTitle: "Asset Management Console",
              breadcrumbs: ["Asset Retirement"],
            },
          },
        ],
      },
      {
        path: "/assetManRep",
        redirect: { name: "perAssetOwn" },
        children: [
          {
            path: "/assetManRep/perAssetOwn",
            name: "perAssetOwn",
            component: () => import("@/views/assetManRep/perAssetOwn/Home.vue"),
            meta: {
              pageTitle: "Asset Management Report",
              breadcrumbs: ["Personal Asset Ownership"],
            },
          },
          {
            path: "/assetManRep/orgAssetOwn",
            name: "orgAssetOwn",
            component: () => import("@/views/assetManRep/orgAssetOwn/Home.vue"),
            meta: {
              pageTitle: "Asset Management Report",
              breadcrumbs: ["Organization Asset Ownership"],
            },
          },
        ],
      },
      {
        path: "/impersonate-login",
        name: "impersonate-login",
        component: () =>
          import(
            "@/views/authentication/basic-flow/impersonate/ImpersonateLogin.vue"
          ),
        meta: {
          pageTitle: "Impersonate Login",
          breadcrumbs: ["Access"],
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/authentication/basic-flow/signin/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  authStore.verifyAuth();
  // before page access check if page requires authentication
  if (to.name == "sign-in") {
    if (authStore.isAuthenticated) {
      next({ name: "repository" });
    } else {
      next();
    }
  } else if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;

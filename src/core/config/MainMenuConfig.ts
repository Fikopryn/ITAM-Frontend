import { isRoleHasAccess } from "../services/PermissionService";
import { getUserRole } from "./../services/UserService";
export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  svgIcon?: string;
  fontIcon?: string;
  sub?: Array<MenuItem>;
  userHasAccess?: boolean;
}

// begin::Menu
let MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "dashboard",
        route: "/dashboard",
        svgIcon: "/media/icons/duotune/general/gen001.svg",
        fontIcon: "bi-app-indicator",
        userHasAccess: true,
      },
      {
        sectionTitle: "Administration Console",
        route: "/adminCon",
        svgIcon: "/media/icons/duotune/general/gen005.svg",
        fontIcon: "bi-app-indicator",
        userHasAccess: true,
        sub: [
          {
            heading: "People",
            route: "/adminCon/people",
            userHasAccess: true,
          },
          {
            heading: "Company",
            route: "/adminCon/company",
            userHasAccess: true,
          },
          {
            heading: "Product Catalog",
            route: "/adminCon/product-catalog",
            userHasAccess: true,
          },
          {
            heading: "Purchase Type",
            route: "/adminCon/purcType",
            userHasAccess: true,
          },
          {
            heading: "Asset Status",
            route: "/adminCon/assStat",
            userHasAccess: true,
          },
          {
            heading: "Asset Status Finance",
            route: "/adminCon/assStatFin",
            userHasAccess: true,
          },
          {
            heading: "Role",
            route: "/adminCon/role",
            userHasAccess: true,
          },
          {
            heading: "Bulk Update",
            route: "/adminCon/bulkUpdate",
            userHasAccess: true,
          },
        ],
      },
      {
        sectionTitle: "Contract Management Console",
        route: "/contManCon",
        svgIcon: "/media/icons/duotune/general/gen009.svg",
        fontIcon: "bi-app-indicator",
        userHasAccess: true,
        sub: [
          {
            heading: "Contract Registration",
            route: "/contManCon/contReg/",
            userHasAccess: true,
          },
          {
            heading: "Purchase / Request Order",
            route: "/contManCon/reqOrder/",
            userHasAccess: true,
          },
          {
            heading: "Delivery Order",
            route: "/contManCon/delivOrder/",
            userHasAccess: true,
          },
        ],
      },
      {
        sectionTitle: "Asset Management Console",
        route: "/assetManCon",
        svgIcon: "/media/icons/duotune/general/gen004.svg",
        fontIcon: "bi-app-indicator",
        userHasAccess: true,
        sub: [
          {
            heading: "Asset Planning",
            route: "/assetManCon/asPlan",
            userHasAccess: true,
          },
          {
            heading: "Asset Registration",
            route: "/assetManCon/regis",
            userHasAccess: true,
          },
          {
            heading: "Asset Staging",
            route: "/assetManCon/stag",
            userHasAccess: true,
          },
          {
            heading: "Asset Deployment",
            route: "/assetManCon/deploy",
            userHasAccess: true,
          },
          {
            heading: "Asset Transfer to Operation",
            route: "/assetManCon/transOps",
            userHasAccess: true,
          },
          {
            heading: "Asset Review",
            route: "/assetManCon/review",
            userHasAccess: true,
          },
          {
            heading: "Asset Retirement",
            route: "/assetManCon/retire",
            userHasAccess: true,
          },
        ],
      },
      {
        sectionTitle: "Asset Management Report",
        route: "/assetManRep",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-app-indicator",
        userHasAccess: true,
        sub: [
          {
            heading: "Personal Asset Ownership",
            route: "/assetManRep/perAssetOwn/",
            userHasAccess: true,
          },
          {
            heading: "Organization Asset Ownership",
            route: "/assetManRep/orgAssetOwn/",
            userHasAccess: true,
          },
        ],
      },

      // {
      //   heading: "Administration Console",
      //   route: "/administration-console",
      //   svgIcon: "/media/icons/duotune/general/gen001.svg",
      //   fontIcon: "bi-app-indicator",
      //   userHasAccess: isRoleHasAccess('Admin'),
      // },
    ],
  },
  // {
  //   heading: "Chart Demo",
  //   route: "/",
  //   pages: [
  //     {
  //       heading: "Demo 1",
  //       route: "/chart-demo-1",
  //       svgIcon: "/media/icons/duotune/general/gen022.svg",
  //       fontIcon: "bi-archive",
  //     },
  //   ],
  // },
  // {
  //   heading: "craft",
  //   route: "/crafted",
  //   pages: [
  //     {
  //       sectionTitle: "pages",
  //       route: "/pages",
  //       svgIcon: "/media/icons/duotune/general/gen022.svg",
  //       fontIcon: "bi-archive",
  //       sub: [
  //         {
  //           sectionTitle: "profile",
  //           route: "/profile",
  //           sub: [
  //             {
  //               heading: "profileOverview",
  //               route: "/crafted/pages/profile/overview",
  //             },
  //             {
  //               heading: "projects",
  //               route: "/crafted/pages/profile/projects",
  //             },
  //             {
  //               heading: "campaigns",
  //               route: "/crafted/pages/profile/campaigns",
  //             },
  //             {
  //               heading: "documents",
  //               route: "/crafted/pages/profile/documents",
  //             },
  //             {
  //               heading: "connections",
  //               route: "/crafted/pages/profile/connections",
  //             },
  //             {
  //               heading: "activity",
  //               route: "/crafted/pages/profile/activity",
  //             },
  //           ],
  //         },
  //         {
  //           sectionTitle: "wizards",
  //           route: "/wizard",
  //           sub: [
  //             {
  //               heading: "horizontal",
  //               route: "/crafted/pages/wizards/horizontal",
  //             },
  //             {
  //               heading: "vertical",
  //               route: "/crafted/pages/wizards/vertical",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       sectionTitle: "account",
  //       route: "/account",
  //       svgIcon: "/media/icons/duotune/communication/com006.svg",
  //       fontIcon: "bi-person",
  //       sub: [
  //         {
  //           heading: "accountOverview",
  //           route: "/crafted/account/overview",
  //         },
  //         {
  //           heading: "settings",
  //           route: "/crafted/account/settings",
  //         },
  //       ],
  //     },
  //     {
  //       sectionTitle: "authentication",
  //       svgIcon: "/media/icons/duotune/technology/teh004.svg",
  //       fontIcon: "bi-sticky",
  //       sub: [
  //         {
  //           sectionTitle: "basicFlow",
  //           sub: [
  //             {
  //               heading: "signIn",
  //               route: "/sign-in",
  //             },
  //             {
  //               heading: "signUp",
  //               route: "/sign-up",
  //             },
  //             {
  //               heading: "passwordReset",
  //               route: "/password-reset",
  //             },
  //           ],
  //         },
  //         {
  //           heading: "multiStepSignUp",
  //           route: "/multi-step-sign-up",
  //         },
  //         {
  //           heading: "error404",
  //           route: "/404",
  //         },
  //         {
  //           heading: "error500",
  //           route: "/500",
  //         },
  //       ],
  //     },
  //     {
  //       sectionTitle: "modals",
  //       route: "/modals",
  //       svgIcon: "/media/icons/duotune/art/art009.svg",
  //       fontIcon: "bi-shield-check",
  //       sub: [
  //         {
  //           sectionTitle: "general",
  //           route: "/general",
  //           sub: [
  //             {
  //               heading: "inviteFriends",
  //               route: "/crafted/modals/general/invite-friends",
  //             },
  //             {
  //               heading: "viewUsers",
  //               route: "/crafted/modals/general/view-user",
  //             },
  //             {
  //               heading: "upgradePlan",
  //               route: "/crafted/modals/general/upgrade-plan",
  //             },
  //             {
  //               heading: "shareAndEarn",
  //               route: "/crafted/modals/general/share-and-earn",
  //             },
  //           ],
  //         },
  //         {
  //           sectionTitle: "forms",
  //           route: "/forms",
  //           sub: [
  //             {
  //               heading: "newTarget",
  //               route: "/crafted/modals/forms/new-target",
  //             },
  //             {
  //               heading: "newCard",
  //               route: "/crafted/modals/forms/new-card",
  //             },
  //             {
  //               heading: "newAddress",
  //               route: "/crafted/modals/forms/new-address",
  //             },
  //             {
  //               heading: "createAPIKey",
  //               route: "/crafted/modals/forms/create-api-key",
  //             },
  //           ],
  //         },
  //         {
  //           sectionTitle: "wizards",
  //           route: "/wizards",
  //           sub: [
  //             {
  //               heading: "twoFactorAuth",
  //               route: "/crafted/modals/wizards/two-factor-auth",
  //             },
  //             {
  //               heading: "createApp",
  //               route: "/crafted/modals/wizards/create-app",
  //             },
  //             {
  //               heading: "createAccount",
  //               route: "/crafted/modals/wizards/create-account",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       sectionTitle: "widgets",
  //       route: "/widgets",
  //       svgIcon: "/media/icons/duotune/general/gen025.svg",
  //       fontIcon: "bi-layers",
  //       sub: [
  //         {
  //           heading: "widgetsLists",
  //           route: "/crafted/widgets/lists",
  //         },
  //         {
  //           heading: "widgetsStatistics",
  //           route: "/crafted/widgets/statistics",
  //         },
  //         {
  //           heading: "widgetsCharts",
  //           route: "/crafted/widgets/charts",
  //         },
  //         {
  //           heading: "widgetsMixed",
  //           route: "/crafted/widgets/mixed",
  //         },
  //         {
  //           heading: "widgetsTables",
  //           route: "/crafted/widgets/tables",
  //         },
  //         {
  //           heading: "widgetsFeeds",
  //           route: "/crafted/widgets/feeds",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   heading: "apps",
  //   route: "/apps",
  //   pages: [
  //     {
  //       sectionTitle: "customers",
  //       route: "/customers",
  //       svgIcon: "/media/icons/duotune/finance/fin006.svg",
  //       fontIcon: "bi-printer",
  //       sub: [
  //         {
  //           heading: "gettingStarted",
  //           route: "/apps/customers/getting-started",
  //         },
  //         {
  //           heading: "customersListing",
  //           route: "/apps/customers/customers-listing",
  //         },
  //         {
  //           heading: "customerDetails",
  //           route: "/apps/customers/customer-details",
  //         },
  //       ],
  //     },
  //     {
  //       sectionTitle: "subscriptions",
  //       route: "/subscriptions",
  //       svgIcon: "/media/icons/duotune/ecommerce/ecm002.svg",
  //       fontIcon: "bi-cart",
  //       sub: [
  //         {
  //           heading: "getStarted",
  //           route: "/apps/subscriptions/getting-started",
  //         },
  //         {
  //           heading: "subscriptionList",
  //           route: "/apps/subscriptions/subscription-list",
  //         },
  //         {
  //           heading: "addSubscription",
  //           route: "/apps/subscriptions/add-subscription",
  //         },
  //         {
  //           heading: "viewSubscription",
  //           route: "/apps/subscriptions/view-subscription",
  //         },
  //       ],
  //     },
  //     {
  //       heading: "calendarApp",
  //       route: "/apps/calendar",
  //       svgIcon: "/media/icons/duotune/general/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       sectionTitle: "chat",
  //       route: "/chat",
  //       svgIcon: "/media/icons/duotune/communication/com012.svg",
  //       fontIcon: "bi-chat-left",
  //       sub: [
  //         {
  //           heading: "privateChat",
  //           route: "/apps/chat/private-chat",
  //         },
  //         {
  //           heading: "groupChat",
  //           route: "/apps/chat/group-chat",
  //         },
  //         {
  //           heading: "drawerChat",
  //           route: "/apps/chat/drawer-chat",
  //         },
  //       ],
  //     },
  //   ],
  // },
];
// end::Menu

// begin::Admin Role Menu
const AdminMenu: Array<MenuItem> = [
  {
    heading: "Component",
    route: "/",
    pages: [
      // {
      //   heading: "Popup",
      //   route: "/chart-demo-1",
      //   svgIcon: "/media/icons/duotune/communication/com004.svg",
      //   fontIcon: "bi-archive",
      // },
      {
        heading: "Table",
        route: "/example-table",
        svgIcon: "/media/icons/duotune/coding/cod004.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  },

  {
    heading: "Access",
    route: "/",
    pages: [
      {
        heading: "Impersonate",
        route: "/impersonate-login",
        svgIcon: "/media/icons/duotune/communication/com013.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  },
];
// end::Admin Role Menu

const getMenus = (): Array<MenuItem> => {
  const roles = getUserRole();
  roles.forEach((element) => {
    if (element.sysRole == "GENERAL") {
      MainMenuConfig = [...MainMenuConfig, ...AdminMenu];
    }
  });
  return MainMenuConfig;
};

export default getMenus();

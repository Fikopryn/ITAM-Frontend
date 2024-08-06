import type LayoutConfigTypes from "@/core/config/LayoutConfigTypes";

const config: LayoutConfigTypes = {
  general: {
    mode: "light",
    primaryColor: "#50CD89",
    pageWidth: "default",
    layout: "dark-sidebar",
  },
  header: {
    display: true,
    default: {
      container: "fluid",
      fixed: {
        desktop: true,
        mobile: false,
      },
      menu: {
        display: true,
        iconType: "svg",
      },
    },
  },
  sidebar: {
    display: true,
    default: {
      minimize: {
        desktop: {
          enabled: true,
          default: true,
          hoverable: true,
        },
      },
      menu: {
        iconType: "svg",
      },
    },
  },
  toolbar: {
    display: true,
    container: "fluid",
    fixed: {
      desktop: true,
      mobile: true,
    },
  },
  pageTitle: {
    display: true,
    breadcrumb: true,
    direction: "row",
  },
  content: {
    container: "fluid",
  },
  footer: {
    display: true,
    container: "fluid",
    fixed: {
      desktop: false,
      mobile: false,
    },
  },
  illustrations: {
    set: "sketchy-1",
  },
  scrolltop: {
    display: true,
  },
};

export default config;
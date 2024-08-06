<template>
  <!--begin::Page title-->
  <div
    v-if="pageTitleDisplay"
    :class="`page-title d-flex flex-${pageTitleDirection} justify-content-center flex-wrap me-3`"
  >
    <template v-if="pageTitle">
      <!--begin::Title-->
      <h1
        class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0"
      >
        {{ pageTitle }}
      </h1>
      <!--end::Title-->

      <span
        v-if="
          pageTitleDirection === 'row' &&
          pageTitleBreadcrumbDisplay &&
          breadcrumbs
        "
        class="h-20px border-gray-300 border-start mx-3"
      ></span>

      <!--begin::Breadcrumb-->
      <ol
        v-if="breadcrumbs && pageTitleBreadcrumbDisplay"
        class="breadcrumb breadcrumb-more-than text-muted fs-5 fw-bold"
      >
        <!-- <li class="breadcrumb-item pe-3">
          <router-link to="/" class="pe-3">Home</router-link>
        </li> -->
        <template v-for="(item, i) in breadcrumbs" :key="i">
          <li
            v-if="typeof item == 'string'"
            class="breadcrumb-item pe-3 fs-6 fw-semibold"
            :to="typeof item == 'string' ? '' : { name: item['to'] }"
          >
            <span href="#" class="pe-3">{{
              typeof item == "string" ? item : item["name"]
            }}</span>
          </li>
          <router-link
            v-else
            class="breadcrumb-item pe-3 fs-6 fw-semibold"
            :to="typeof item == 'string' ? '' : { name: item['to'] }"
          >
            <span href="#" class="pe-3">{{
              typeof item == "string" ? item : item["name"]
            }}</span>
          </router-link>
        </template>
      </ol>
      <!--end::Breadcrumb-->
    </template>
  </div>
  <div v-else class="align-items-stretch"></div>
  <!--end::Page title-->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import {
  pageTitleDisplay,
  pageTitleBreadcrumbDisplay,
  pageTitleDirection,
} from "@/core/helpers/config";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "layout-page-title",
  components: {},
  setup() {
    const route = useRoute();

    const pageTitle = computed(() => {
      return route.meta.pageTitle;
    });

    const breadcrumbs = computed(() => {
      return route.meta.breadcrumbs;
    });

    return {
      pageTitle,
      breadcrumbs,
      pageTitleDisplay,
      pageTitleBreadcrumbDisplay,
      pageTitleDirection,
    };
  },
});
</script>

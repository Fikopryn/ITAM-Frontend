<template>
  <!--begin::Navbar-->
  <div class="app-navbar flex-shrink-0">
    <!--begin::Quick links-->
    <div class="app-navbar-item ms-1 ms-lg-3">
      <!--begin::Menu wrapper-->
      <!-- <a
        :href="getMediaPath('UserManual/UserManualPR3CISEMultitenant.pdf')"
        target="_blank"
        class="btn btn-icon btn-custom btn-icon-primary text-primary w-100 h-35px h-md-40px me-5"
      >
        <span class="svg-icon svg-icon-primary svg-icon-2x my-auto">
          <inline-svg :src="getMediaPath('icons/main/navbar/user-guide.svg')" />
        </span>
        <span class="text-primary d-none d-md-block my-auto"> User Guide </span>
      </a> -->
      <!-- <div
        class="btn btn-icon btn-custom btn-icon-primary text-primary w-100 h-35px h-md-40px me-5"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <span class="svg-icon svg-icon-primary svg-icon-2x my-auto">
          <inline-svg :src="getMediaPath('icons/main/navbar/user-guide.svg')" />
        </span>
        <span class="text-primary d-none d-md-block my-auto"> User Guide </span>
      </div>
      <KTQuickLinksMenu /> -->
      <!--end::Menu wrapper-->
    </div>
    <!--end::Quick links-->

    <!--begin::User menu-->
    <div class="app-navbar-item ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
      <!--begin::Menu wrapper-->
      <div
        class="cursor-pointer symbol symbol-35px symbol-md-40px me-4"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <!-- <img :src="getMediaPath('icons/main/user-blank.svg')" alt="user" /> -->
        <img
          :src="`https://identity.idaman.pertamina.com/Master/Account/Photo/?id=${
            getUserInfo()?.email
          }&size=360x360`"
          alt="User Profile"
          @error="imageLoadOnError"
        />
      </div>

      <div class="flex-column justify-content-between d-none d-md-flex">
        <div>
          <p class="fs-6 fw-semibold mb-1 h-100 text-capitalize">
            {{ getUserInfo()?.userName ?? "" }}

            <span
              v-if="impersonateSession.userId"
              class="fs-6 fw-normal text-lowercase"
              style="color: #9ba1bf"
              >as {{ impersonateSession.userId }}</span
            >
          </p>
        </div>

        <div>
          <span
            class="badge py-2 px-3 fs-8 w-auto"
            style="color: #237b4b; background-color: #e4f7cf"
            >{{ getUserInfo()?.posName ?? "" }}</span
          >
        </div>
      </div>
      <KTUserMenu
        :impersonate-sessions="impersonateSession"
        v-on:signout-impersonate="impersonateSignOut"
      />
      <!--end::Menu wrapper-->
    </div>
    <!--end::User menu-->
    <!--begin::Header menu toggle-->
    <!-- <div class="app-navbar-item d-lg-none ms-2 me-n3" title="Show header menu">
      <div
        class="btn btn-icon btn-active-color-primary w-35px h-35px"
        id="kt_app_header_menu_toggle"
      >
        <span class="svg-icon svg-icon-1">
          <inline-svg src="/media/icons/duotune/text/txt001.svg" />
        </span>
      </div>
    </div> -->
    <!--end::Header menu toggle-->
  </div>
  <!--end::Navbar-->
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
// import KTQuickLinksMenu from "@/layouts/main-layout/menus/QuickLinksMenu.vue";
import KTUserMenu from "@/layouts/main-layout/menus/UserAccountMenu.vue";
import { useThemeStore } from "@/stores/theme";
import { getMediaPath } from "@/core/helpers/assets";
import { useImpersonateStore } from "@/stores/impersonate";
import type { IUserInformation } from "@/schema/IUserSession";
import { popupSuccess, typeValue } from "@/components/notification/Popup";
import { getUserInfo } from "@/core/services/UserService";
import { arrayToStringWithComma } from "@/core/helpers/common";
export default defineComponent({
  name: "header-navbar",
  components: {
    // KTQuickLinksMenu,
    KTUserMenu,
  },
  setup() {
    const store = useThemeStore();
    const impoersonateStore = useImpersonateStore();
    const listCurrentUserTenant = ref<string>();

    const themeMode = computed(() => {
      return store.mode;
    });

    const impersonateSession = computed(() => {
      const userInformation: IUserInformation = Object.assign(
        {},
        impoersonateStore.impersonateSession?.userInformation
      );

      return userInformation;
    });

    const impersonateSignOut = () => {
      impoersonateStore.logoutImpersonate();
      popupSuccess({ type: typeValue.logout });
    };

    onMounted(async () => {
      let tenantToDisplay = "";
      let listTenant = JSON.parse(
        localStorage.getItem("list_selected_tenant") ?? "[]"
      );
      const getThreeTenants = listTenant.slice(0, 3);
      getThreeTenants.forEach((element, index) => {
        tenantToDisplay +=
          element.lovValue +
          (index != getThreeTenants.length - 1 ? ", " : "") +
          (index == 2 ? "..." : "");
      });
      listCurrentUserTenant.value = tenantToDisplay;
    });

    const imageLoadOnError = (e) => {
      e.target.src =
        "https://static.phss.pertamina.com/CDN/r3lax/user-profile.jpeg";
    };

    return {
      themeMode,
      getMediaPath,
      impersonateSession,
      impersonateSignOut,
      getUserInfo,
      listCurrentUserTenant,
      imageLoadOnError,
    };
  },
});
</script>

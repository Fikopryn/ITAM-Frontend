<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold py-4 fs-6 w-300px"
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-3">
        <!--begin::Avatar-->
        <div class="symbol symbol-45px me-5">
          <!-- <img alt="Logo" :src="getMediaPath('icons/main/user-blank.svg')" /> -->
          <img
            :src="`https://identity.idaman.pertamina.com/Master/Account/Photo/?id=${
              getUserInfo()?.email
            }&size=360x360`"
            alt="User Profile"
            @error="imageLoadOnError"
          />
        </div>
        <!--end::Avatar-->

        <!--begin::Username-->
        <div class="d-flex flex-column">
          <div class="fw-bold d-flex align-items-center fs-6">
            {{ getUserInfo()?.userName ?? "" }}
          </div>
          <div class="text-muted fw-normal d-flex align-items-center fs-6">
            {{ getUserInfo()?.userId ?? "" }}
          </div>
          <div class="text-muted fw-normal d-flex align-items-center fs-6">
            {{ getUserInfo()?.posName ?? "" }}
          </div>
        </div>
        <!--end::Username-->
      </div>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <div
      v-if="impersonateSession?.userId"
      class="separator separator-dashed separator-content my-3 mx-5"
    >
      <span class="text-primary fw-bold text-wrap w-50">Login As </span>
    </div>
    <!--end::Menu separator-->

    <!--begin::Menu item-->
    <div v-if="impersonateSession?.userId" class="menu-item px-3">
      <div class="menu-content d-flex align-items-top px-3">
        <!--begin::Avatar-->
        <div class="symbol symbol-45px me-5">
          <!-- <img alt="Logo" :src="getMediaPath('icons/main/user-blank.svg')" /> -->
          <img
            :src="`https://identity.idaman.pertamina.com/Master/Account/Photo/?id=${impersonateSession?.email}&size=360x360`"
            alt="User Profile"
            @error="imageLoadOnError"
          />
        </div>
        <!--end::Avatar-->

        <!--begin::Username-->
        <div class="d-flex flex-column gap-2">
          <div class="fw-bold text-capitalize d-flex align-items-center fs-6">
            {{ impersonateSession?.userName }}
          </div>
          <div
            class="text-muted text-lowercase fw-normal d-flex align-items-center fs-6"
          >
            {{ impersonateSession?.userId }}
          </div>
          <div
            class="text-muted text-lowercase fw-normal d-flex align-items-center fs-6"
          >
            ( {{ impersonateSession?.posName }} )
          </div>

          <button
            @click="signOutImpersonate()"
            class="btn btn-secondary py-1 px-3 fs-7"
          >
            Impersonator Logout
          </button>
        </div>
        <!--end::Username-->
      </div>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->

    <!-- begin::Tenant -->
    <div class="menu-item px-2 mt-3">
      <el-select
        id="applicabilityReviewDetail.tenant"
        name="applicabilityReviewDetail.tenant"
        class="w-100 px-5"
        placeholder="Select"
        v-model="selectedTenant"
        :loading="loading"
        clearable
        multiple
      >
        <el-option
          v-for="(lov, index) in listOfTenantFromRole"
          :key="index"
          :label="lov.lovValue"
          :value="lov.lovKey"
        />
      </el-select>
    </div>
    <!-- end::Tenant -->
    <!--begin::Apply Tenant-->
    <div class="d-grid gap-2 px-3 mx-4 mb-1 mt-3">
      <button
        class="btn btn-secondary text-primary fw-normal py-3"
        type="button"
        @click="applyTenant()"
      >
        Apply
      </button>
      <button
        class="btn btn-danger text-light fw-normal py-3"
        type="button"
        @click="signOut()"
      >
        Logout
      </button>
    </div>
    <!--end::Apply Tenant-->

    <!--begin::Menu item-->
    <!-- <div class="menu-item px-3 mx-4 my-1">
      <hr />
      <a @click="signOut()" class="menu-link px-5 text-light bg-danger">
        Logout
      </a>
    </div> -->
    <!--end::Menu item-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  watch,
  watchEffect,
  onMounted,
} from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { getMediaPath } from "@/core/helpers/assets";
import { useImpersonateStore } from "@/stores/impersonate";
import type { IUserInformation } from "@/schema/IUserSession";
import { getUserInfo } from "@/core/services/UserService";
import type { ILov } from "@/schema/ILov";
import type { CascaderProps } from "element-plus";
import { useLovStore } from "@/stores/lov";
import { confirmationPopUp, errorPopUp } from "@/core/helpers/popup";
import TenantService from "@/core/services/TenantService";

export default defineComponent({
  name: "kt-user-menu",
  components: {},
  props: {
    impersonateSessions: { type: Object },
  },
  emits: ["signout-impersonate"],
  setup(props, { emit }) {
    const loading = ref<boolean>(false);
    const router = useRouter();
    const i18n = useI18n();
    const store = useAuthStore();
    const lovStore = useLovStore();
    const impoersonateStore = useImpersonateStore();
    const impersonateSession = ref(props.impersonateSessions);
    const selectedTenant = ref<Array<string>>([]);
    const listOfTenantFromRole = ref<Array<ILov>>([]);

    watch(impersonateSession, (selection, prevSelection) => {
      impersonateSession.value = selection;
    });

    onMounted(async () => {
      selectedTenant.value = TenantService.getSelectedTenant("key");
      listOfTenantFromRole.value = await lovStore.lovTenantsFromRole();
    });

    i18n.locale.value = localStorage.getItem("lang")
      ? (localStorage.getItem("lang") as string)
      : "en";

    const countries = {
      en: {
        flag: "/media/flags/united-states.svg",
        name: "English",
      },
      es: {
        flag: "/media/flags/spain.svg",
        name: "Spanish",
      },
      de: {
        flag: "/media/flags/germany.svg",
        name: "German",
      },
      ja: {
        flag: "/media/flags/japan.svg",
        name: "Japanese",
      },
      fr: {
        flag: "/media/flags/france.svg",
        name: "French",
      },
    };

    const signOutImpersonate = () => {
      emit("signout-impersonate", true);
      impoersonateStore.logoutImpersonate();
      impersonateSession.value = {};
    };

    const signOut = async () => {
      const isValid = await confirmationPopUp({
        title: "Attention",
        desc: "Are you sure want to Logout ?",
        confirmText: "Logout",
      });
      if (isValid) {
        impoersonateStore.logoutImpersonate();
        impersonateSession.value = {};
        store.logout();
        window.location.reload();
        router.push({ name: "sign-in" });
      }
    };

    const setLang = (lang: string) => {
      localStorage.setItem("lang", lang);
      i18n.locale.value = lang;
    };

    const currentLanguage = computed(() => {
      return i18n.locale.value;
    });

    const currentLanguageLocale = computed(() => {
      return countries[i18n.locale.value as keyof typeof countries];
    });

    const updateSelectedTenant = () => {
      const listOfSelectedTenant = new Array<ILov>();

      selectedTenant.value.forEach((tenantKey) => {
        const getSelectedTenant = listOfTenantFromRole.value.find(
          (item) => item.lovKey == tenantKey
        );
        if (getSelectedTenant) {
          listOfSelectedTenant.push(getSelectedTenant);
        }
      });

      if (listOfSelectedTenant.length > 0) {
        TenantService.saveSelectedTenant(listOfSelectedTenant);
      } else {
        errorPopUp({
          title: "Warning",
          desc: "You need to select one tenant at minimum",
        });
        if (listOfTenantFromRole.value.length > 0) {
          TenantService.saveSelectedTenant([listOfTenantFromRole.value[0]]);
        }
      }
    };

    const applyTenant = () => {
      updateSelectedTenant();
      location.reload();
    };

    const imageLoadOnError = (e) => {
      e.target.src =
        "https://static.phss.pertamina.com/CDN/r3lax/user-profile.jpeg";
    };

    return {
      loading,
      signOut,
      setLang,
      currentLanguage,
      currentLanguageLocale,
      countries,
      getMediaPath,
      signOutImpersonate,
      impersonateSession,
      getUserInfo,
      selectedTenant,
      listOfTenantFromRole,
      updateSelectedTenant,
      applyTenant,
      imageLoadOnError,
    };
  },
  watch: {
    impersonateSessions: function (item) {
      this.impersonateSession = item;
    },
  },
});
</script>

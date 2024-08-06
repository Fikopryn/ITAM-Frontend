import ApiService from "@/core/services/ApiService";
import { getAllTenantFromRole } from "@/core/services/PermissionService";
import { getAllTenantFromRoleAdmin } from "@/core/services/PermissionService";
import type { ILov } from "@/schema/ILov";
import type { IPagination } from "@/schema/IPagination";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLovStore = defineStore("lov", () => {
  const url = import.meta.env.VITE_APP_API_URL + "/MasterLov";
  const loading = ref<boolean>(false);

  const lovs = ref<Array<ILov>>([]);
  const lovHeaderList = ref<Array<string>>([]);
  const lovList = ref<IPagination>({
    page: 1,
    length: 10,
    parameters: [
      {
        name: "",
        searchValue: "",
      },
    ],
    order: {
      parameterName: "modifiedDate",
      dir: "desc",
    },
  });

  const tenants = ref<Array<ILov>>([]);

  const getLovHeaderList = () => {
    loading.value = true;
    return ApiService.get(url + "/getalllovnamedistinct")
      .then(({ data }) => {
        lovHeaderList.value = data;
      })
      .finally(() => {
        loading.value = false;
      });
  };
  const getLovList = () => {};
  const getLovAll = async () => {
    // if (lovs?.value.length < 1) {
    // await axios({
    //   url: import.meta.env.VITE_APP_API_URL + "MasterLov",
    //   method: "GET",
    // }).then(({ data }) => {
    //   lovs.value = data;
    // });
    // await ApiService.get(import.meta.env.VITE_APP_API_URL, "MasterLov").then(
    //   ({ data }) => {
    //     lovs.value = data;
    //   }
    // );
    // await getListOfTenantFromRole();
    // }
  };

  const getLovByName = async (lovName: string): Promise<Array<ILov>> => {
    const res: Array<ILov> = await ApiService.get(url, lovName)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        return [];
      });

    return res;
  };

  const getLovByNameLocal = async (lovName: string): Promise<Array<ILov>> => {
    return await getLovByName(lovName);
    // return await lovs.value.filter(
    //   (item) => item.lovName == lovName && item.isActive == true
    // );
  };

  const getListOfTenantFromRole = async () => {
    const tenants = await getLovByNameLocal("TENANT");
    const tenantsFromRole = getAllTenantFromRole();
    return tenants.filter((item) =>
      tenantsFromRole.find((element) => element == item.lovKey)
    );
    // const removedTenants = lovs.value.filter(
    //   (item) => item.lovName != "TENANT"
    // );
    //lovs.value = [...removedTenants, ..._tenants];
    // const tenantss = await getLovByNameLocal("TENANT");
  };

  const lovTenantsFromRole = async (): Promise<ILov[]> => {
    const tenantsFromRole = await getAllTenantFromRole();
    return tenantsFromRole;
  };

  const lovTenantsFromRoleAdmin = (): ILov[] => {
    const tenantsFromRole = getAllTenantFromRoleAdmin();
    return tenantsFromRole;
  };

  return {
    loading,
    lovs,
    getLovAll,
    getLovByName,
    getLovByNameLocal,
    getListOfTenantFromRole,
    lovTenantsFromRole,
    lovTenantsFromRoleAdmin,

    lovList,
    getLovList,
    getLovHeaderList,
    lovHeaderList,
  };
});

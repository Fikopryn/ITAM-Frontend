import ApiService from "@/core/services/ApiService";
import type { IPagination } from "@/schema/IPagination";
import type { IRole } from "@/schema/admin-con/IRole";
import type { AxiosRequestConfig } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useRoleStore = defineStore("role-admincon", () => {
  const loading = ref<boolean>(false);
  const url = "";
  const roleList = ref<IPagination>({
    page: 1,
    length: 10,
    parameters: [{ name: "roleId", searchValue: "" }],
    pageInfo: { data: [] },
    order: {
      parameterName: "modifiedDate",
      dir: "desc",
    },
  });
  const roleDetails = ref<IRole>({});
  const getRoleList1 = ref<Array<IRole>>([]);

  const getRole = (role?: IRole) => {
    // begin::Filter
    roleList.value.parameters[0].searchValue = role?.roleId ?? "";
    // begin::Filter

    // retrieve data
    // return ApiService.post(url, [...roleList.value.parameters])
    //   .then(({ data }) => {
    //     roleList.value.pageInfo!.data = [...data];
    //   })
    //   .then(() => {
    //     loading.value = false;
    //   });

    roleList.value.pageInfo!.data = [
      {
        roleId: "1",
        roleName: "Warehouse Admin",
        roleDescription: "Administrator Warehouse",
        modifiedBy: "mk.irwan.yudianto",
        lastModifiedDate: "20 June 2023",
        associationStatus: "1",
      },
      {
        roleId: "2",
        roleName: "Stager",
        roleDescription: "Stager",
        modifiedBy: "mk.irwan.yudianto",
        lastModifiedDate: "20 June 2023",
        associationStatus: "0",
      },
      {
        roleId: "3",
        roleName: "Deployer",
        roleDescription: "Deployer",
        modifiedBy: "mk.irwan.yudianto",
        lastModifiedDate: "20 June 2023",
        associationStatus: "1",
      },
      {
        roleId: "4",
        roleName: "Asset Admin",
        roleDescription: "Asset Admin",
        modifiedBy: "mk.irwan.yudianto",
        lastModifiedDate: "20 June 2023",
        associationStatus: "1",
      },
      {
        roleId: "5",
        roleName: "Asset Owner",
        roleDescription: "Asset Owner",
        modifiedBy: "mk.irwan.yudianto",
        lastModifiedDate: "20 June 2023",
        associationStatus: "0",
      },
      {
        roleId: "6",
        roleName: "Asset User",
        roleDescription: "Asset User",
        modifiedBy: "mk.irwan.yudianto",
        lastModifiedDate: "20 June 2023",
        associationStatus: "0",
      },
    ] as unknown as Array<IRole>;
  };

  const saveRole = (role?: IRole) => {
    // save API
    loading.value = true;
    return ApiService.post(url + "save", role)
      .then(({ data }) => {
        // update old data
        roleDetails.value = { ...data };
      })
      .then(() => {
        loading.value = false;
      });
  };

  const getRoleList = () => {
    loading.value = true;
    return ApiService.get(
      import.meta.env.VITE_APP_API_URL + "/MasterRole/All-Data"
    )
      .then(({ data }) => {
        getRoleList1.value = data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const updateRole = (data): Promise<boolean> => {
    loading.value = true;
    const params: AxiosRequestConfig = { ...data };
    return ApiService.put(
      import.meta.env.VITE_APP_API_URL + "/MasterRole/Update",
      params
    )
      .then((rest) => {
        if (rest.status == 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const createRole = (data): Promise<boolean> => {
    loading.value = true;
    const params: AxiosRequestConfig = { ...data };
    return ApiService.post(
      import.meta.env.VITE_APP_API_URL + "/MasterRole/create",
      params
    )
      .then((rest) => {
        if (rest.status == 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return {
    loading,
    roleList,
    getRole,
    getRoleList,
    getRoleList1,
    updateRole,
    createRole,
    saveRole,
    roleDetails,
  };
});

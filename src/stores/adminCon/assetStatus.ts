import ApiService from "@/core/services/ApiService";
import type { IPagination } from "@/schema/IPagination";
import type { IAssetStatus } from "@/schema/admin-con/IAssetStat";
import type { AxiosRequestConfig } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAssetStatusStore = defineStore("asset-stat", () => {
  const loading = ref<boolean>(false);
  const url = "";
  const assetStatusList = ref<IPagination>({
    page: 1,
    length: 10,
    parameters: [{ name: "assetStatusId", searchValue: "" }],
    pageInfo: { data: [] },
    order: {
      parameterName: "modifiedDate",
      dir: "desc",
    },
  });

  const getAssetStatusList1 = ref<Array<IAssetStatus>>([]);
  const assetStatusDetails = ref<IAssetStatus>({});

  const getAssetStatus = (assetStatus?: IAssetStatus) => {
    // begin::Filter
    assetStatusList.value.parameters[0].searchValue =
      assetStatus?.assetStatusId ?? "";
    // begin::Filter

    // retrieve data
    // return ApiService.post(url, [...assetStatusList.value.parameters])
    //   .then(({ data }) => {
    //     assetStatusList.value.pageInfo!.data = [...data];
    //   })
    //   .then(() => {
    //     loading.value = false;
    //   });

    assetStatusList.value.pageInfo!.data = [
      {
        assetStatusId: "1",
        assetStatus1: "Missing",
        assetStatusDescription:
          "The lost asset is still in the search process. Duration searching permitted is 1 month after being declared missing.",
        lastModifiedDate: "05 December 2024",
        modifiedBy: "mk.Irwan.Yudianto",
        associationStatus: "1",
      },
      {
        assetStatusId: "2",
        assetStatus1: "Dispossed",
        assetStatusDescription: "Lost assets that have been written off",
        lastModifiedDate: "06 Februari 2024",
        modifiedBy: "mk.Irwan.Yudianto",
        associationStatus: "0",
      },
      {
        assetStatusId: "3",
        assetStatus1: "return to Vendor",
        assetStatusDescription:
          "The broken asset has been returned to the supplier.",
        lastModifiedDate: "07 September 2024",
        modifiedBy: "mk.Irwan.Yudianto",
        associationStatus: "1",
      },
    ] as unknown as Array<IAssetStatus>;
  };

  const saveAssetStatus = (assetStatus?: IAssetStatus) => {
    // save API
    assetStatus!.assetStatusDescription;
    loading.value = true;
    return ApiService.post(url + "save", assetStatus)
      .then(({ data }) => {
        // update old data
        assetStatusDetails.value = { ...data };
      })
      .then(() => {
        loading.value = false;
      });
  };

  const getAssetStatusList = () => {
    loading.value = true;
    return ApiService.get(
      import.meta.env.VITE_APP_API_URL + "/AssetStatus/All-Data"
    )
      .then(({ data }) => {
        getAssetStatusList1.value = data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const updateAssetStatus = (data): Promise<boolean> => {
    loading.value = true;
    const params: AxiosRequestConfig = { ...data };
    return ApiService.put(
      import.meta.env.VITE_APP_API_URL + "/AssetStatus/Update",
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

  const createAssetStatus = (data): Promise<boolean> => {
    loading.value = true;
    const params: AxiosRequestConfig = { ...data };
    return ApiService.post(
      import.meta.env.VITE_APP_API_URL + "/AssetStatus/create",
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
    assetStatusList,
    getAssetStatusList,
    getAssetStatusList1,
    getAssetStatus,
    createAssetStatus,
    saveAssetStatus,
    updateAssetStatus,
    assetStatusDetails,
  };
});

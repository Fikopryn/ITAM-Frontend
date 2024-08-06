import ApiService from "@/core/services/ApiService";
import type { IPagination } from "@/schema/IPagination";
import type { IAssetStatusFinance } from "@/schema/admin-con/IAssetStatusFinance";
import type { AxiosRequestConfig } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAssetStatusFinanceStore = defineStore(
  "asset-status-finance",
  () => {
    const loading = ref<boolean>(false);
    const url = import.meta.env.VITE_APP_API_URL + "/AssetStatusFin";
    const assetStatusFinanceList = ref<IPagination>({
      page: 1,
      length: 10,
      parameters: [{ name: "assetStatusFinId", searchValue: "" }],
      pageInfo: { data: [] },
      order: {
        parameterName: "lastModifiedDate",
        dir: "desc",
      },
    });
    const getAssetStatusFinanceList1 = ref<Array<IAssetStatusFinance>>([]);
    const assetStatusFinanceDetails = ref<IAssetStatusFinance>({});

    const getAssetStatusFinance = (
      assetStatusFinance?: IAssetStatusFinance
    ) => {
      // begin::Filter
      assetStatusFinanceList.value.parameters[0].searchValue =
        assetStatusFinance?.assetStatusFin1 ?? "";
      // begin::Filter

      // retrieve data
      // return ApiService.post(url, [...productCompany.value.parameters])
      //   .then(({ data }) => {
      //     productCompany.value.pageInfo!.data = [...data];
      //   })
      //   .then(() => {
      //     loading.value = false;
      //   });

      assetStatusFinanceList.value.pageInfo!.data = [
        {
          assetStatusFinId: "1",
          assetStatusFin1: "DB",
          assetStatusFinDesc: "Digunakan - Kondisi Bagus",
          modifiedBy: "mk.Irwan.Yudianto",
          lastModifiedDate: "2024-02-07 13:22:31.477",
          associationStatus: "1",
        },
        {
          assetStatusFinId: "2",
          assetStatusFin1: "DJ",
          assetStatusFinDesc: "Digunakan - Kondisi Jelek",
          modifiedBy: "mk.Irwan.Yudianto",
          lastModifiedDate: "2024-02-07 13:22:43.383",
          associationStatus: "0",
        },
        {
          assetStatusFinId: "3",
          assetStatusFin1: "TT",
          assetStatusFinDesc:
            "Tidak Digunakan - Kondisi Tunggu Pemasangan/Dokumen",
          modifiedBy: "mk.Irwan.Yudianto",
          lastModifiedDate: "2024-02-07 13:22:43.383",
          associationStatus: "1",
        },
        {
          assetStatusFinId: "4",
          assetStatusFin1: "FT",
          assetStatusFinDesc: "FUPP - Eks Kondisi Tunggu Pemasangan/Dokumen",
          modifiedBy: "mk.Irwan.Yudianto",
          lastModifiedDate: "2024-02-07 13:22:43.387",
          associationStatus: "0",
        },
        {
          assetStatusFinId: "5",
          assetStatusFin1: "TP",
          assetStatusFinDesc: "Tidak Digunakan - Kondisi Dalam Perbaikan",
          modifiedBy: "mk.Irwan.Yudianto",
          lastModifiedDate: "2024-02-07 13:22:43.387",
          associationStatus: "1",
        },
        {
          assetStatusFinId: "6",
          assetStatusFin1: "FP",
          assetStatusFinDesc: "FUPP - Eks Kondisi Perbaikan",
          modifiedBy: "mk.Irwan.Yudianto",
          lastModifiedDate: "2024-02-07 13:22:43.387",
          associationStatus: "1",
        },
      ] as unknown as Array<IAssetStatusFinance>;
    };

    const saveAssetStatusFinance = (
      assetStatusFinance?: IAssetStatusFinance
    ) => {
      // save API
      assetStatusFinance!.assetStatusFinDesc;
      loading.value = true;
      return ApiService.post(url + "save", assetStatusFinance)
        .then(({ data }) => {
          // update old data
          assetStatusFinanceDetails.value = { ...data };
        })
        .then(() => {
          loading.value = false;
        });
    };

    const getAssetStatusFinanceList = () => {
      loading.value = true;
      return ApiService.get(
        import.meta.env.VITE_APP_API_URL + "/AssetStatusFin/All-Data"
      )
        .then(({ data }) => {
          getAssetStatusFinanceList1.value = data;
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const updateAssetStatusFinance = (data): Promise<boolean> => {
      loading.value = true;
      const params: AxiosRequestConfig = { ...data };
      return ApiService.put(
        import.meta.env.VITE_APP_API_URL + "/AssetStatusFin/Update",
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

    const createAssetStatusFinance = (data): Promise<boolean> => {
      loading.value = true;
      const params: AxiosRequestConfig = { ...data };
      return ApiService.post(
        import.meta.env.VITE_APP_API_URL + "/AssetStatusFin/create",
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

    const getAssetStatusFinanceById = (assetStatusFinId: number) => {
      loading.value = true;
      return ApiService.query(url, {
        params: { assetStatusFinId: assetStatusFinId },
      })
        .then((res) => {
          console.log(res);
        })
        .finally(() => {
          loading.value = false;
        });
    };

    return {
      loading,
      assetStatusFinanceList,
      getAssetStatusFinanceById,
      getAssetStatusFinance,
      getAssetStatusFinanceList,
      getAssetStatusFinanceList1,
      updateAssetStatusFinance,
      createAssetStatusFinance,
      saveAssetStatusFinance,
      assetStatusFinanceDetails,
    };
  }
);

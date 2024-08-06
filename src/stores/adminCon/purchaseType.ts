import ApiService from "@/core/services/ApiService";
import type { IPagination } from "@/schema/IPagination";
import type { IPurchaseType } from "@/schema/admin-con/IPurchaseType";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePurchaseTypeStore = defineStore("purch-type", () => {
  const loading = ref<boolean>(false);
  const url = "";
  const purchaseTypeList = ref<IPagination>({
    page: 1,
    length: 10,
    parameters: [{ name: "purchaseTypeId", searchValue: "" }],
    pageInfo: { data: [] },
    order: {
      parameterName: "modifiedDate",
      dir: "desc",
    },
  });
  const purchaseTypeDetails = ref<IPurchaseType>({});

  const getPurchaseType = (purchasetype?: IPurchaseType) => {
    // begin::Filter
    purchaseTypeList.value.parameters[0].searchValue =
      purchasetype?.purchasingTypeId ?? "";
    // begin::Filter

    // retrieve data
    // return ApiService.post(url, [...purchaseTypeList.value.parameters])
    //   .then(({ data }) => {
    //     purchaseTypeList.value.pageInfo!.data = [...data];
    //   })
    //   .then(() => {
    //     loading.value = false;
    //   });

    purchaseTypeList.value.pageInfo!.data = [
      {
        purchasingTypeId: "1",
        purchasingTypeName: "test",
        purchasingTypeDescription: "test",
        modifiedBy: "test",
        lastModifiedDate: "01 Januari 2023",
        associationStatus: "1",
      },
      {
        purchasingTypeId: "2",
        purchasingTypeName: "test",
        purchasingTypeDescription: "test",
        modifiedBy: "test",
        lastModifiedDate: "29 Februari 2023",
        associationStatus: "0",
      },
      {
        purchasingTypeId: "3",
        purchasingTypeName: "test",
        purchasingTypeDescription: "test",
        modifiedBy: "test",
        lastModifiedDate: "05 Juli 2023",
        associationStatus: "1",
      },
      {
        purchasingTypeId: "4",
        purchasingTypeName: "test",
        purchasingTypeDescription: "test",
        modifiedBy: "test",
        lastModifiedDate: "30 September 2023",
        associationStatus: "0",
      },
      {
        purchasingTypeId: "5",
        purchasingTypeName: "test",
        purchasingTypeDescription: "test",
        modifiedBy: "test",
        lastModifiedDate: "01 Januari 2022",
        associationStatus: "0",
      },
      {
        purchasingTypeId: "6",
        purchasingTypeName: "test",
        purchasingTypeDescription: "test",
        modifiedBy: "test",
        lastModifiedDate: "21 Februari 2024",
        associationStatus: "1",
      },
    ] as unknown as Array<IPurchaseType>;
  };

  const savePurchaseType = (purchasetype?: IPurchaseType) => {
    // save API
    loading.value = true;
    return ApiService.post(url + "save", purchasetype)
      .then(({ data }) => {
        // update old data
        purchaseTypeDetails.value = { ...data };
      })
      .then(() => {
        loading.value = false;
      });
  };

  const updatePurchaseType = () => {};
  return {
    loading,
    purchaseTypeList,
    getPurchaseType,
    savePurchaseType,
    updatePurchaseType,
    purchaseTypeDetails,
  };
});

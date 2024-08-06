import ApiService from "@/core/services/ApiService";
import type { IPagination } from "@/schema/IPagination";
import type { IAssetRegistration } from "@/schema/asset-man-con/IAssetRegistration";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAssetRegistrationStore = defineStore(
  "asset-registration",
  () => {
    const loading = ref<boolean>(false);
    const url = "";
    const assetRegistrationList = ref<IPagination>({
      page: 1,
      length: 10,
      parameters: [{ name: "company", searchValue: "" }],
      pageInfo: { data: [] },
      order: {
        parameterName: "modifiedDate",
        dir: "desc",
      },
    });
    const assetRegistrationDetails = ref<IAssetRegistration>({});

    const getAssetRegistration = (assetRegistration?: IAssetRegistration) => {
      // begin::Filter
      assetRegistrationList.value.parameters[0].searchValue =
        assetRegistration?.company ?? "";
      // begin::Filter

      // retrieve data
      // return ApiService.post(url, [...productCompany.value.parameters])
      //   .then(({ data }) => {
      //     productCompany.value.pageInfo!.data = [...data];
      //   })
      //   .then(() => {
      //     loading.value = false;
      //   });

      assetRegistrationList.value.pageInfo!.data = [
        {
          company: "test",
          deliveryOrder: "test",
          deliveryOrderDate: "test",
          receiveDate: "test",
          supplierName: "test",
          contract: "test",
          purchaseOrder: "test",
          invoice: "test",
          purchaseType: "test",
          acquistionPrice: "test",
          leasePrice: "test",
          lastModifiedDate: "test",
          modifiedBy: "test",
          productName: "test",
          qty: "test",
          unit: "test",
          additionalInfo: "test",
          document: "test",
          assetSite: "test",
          building: "test",
          floorRoom: "test",
          assetStatus: "test",
          assetStatusFinance: "test",
          assetKnowledgement: "test",
          associationStatus: "1",
        },

        {
          company: "test",
          deliveryOrder: "test",
          deliveryOrderDate: "test",
          receiveDate: "test",
          supplierName: "test",
          contract: "test",
          purchaseOrder: "test",
          invoice: "test",
          purchaseType: "test",
          acquistionPrice: "test",
          leasePrice: "test",
          lastModifiedDate: "test",
          modifiedBy: "test",
          productName: "test",
          qty: "test",
          unit: "test",
          additionalInfo: "test",
          document: "test",
          assetSite: "test",
          building: "test",
          floorRoom: "test",
          assetStatus: "test",
          assetStatusFinance: "test",
          assetKnowledgement: "test",
          associationStatus: "1",
        },

        {
          company: "test",
          deliveryOrder: "test",
          deliveryOrderDate: "test",
          receiveDate: "test",
          supplierName: "test",
          contract: "test",
          purchaseOrder: "test",
          invoice: "test",
          purchaseType: "test",
          acquistionPrice: "test",
          leasePrice: "test",
          lastModifiedDate: "test",
          modifiedBy: "test",
          productName: "test",
          qty: "test",
          unit: "test",
          additionalInfo: "test",
          document: "test",
          assetSite: "test",
          building: "test",
          floorRoom: "test",
          assetStatus: "test",
          assetStatusFinance: "test",
          assetKnowledgement: "test",
          associationStatus: "1",
        },
      ] as unknown as Array<IAssetRegistration>;
    };

    const saveAssetRegistration = (assetRegistration?: IAssetRegistration) => {
      // save API
      assetRegistration!.document;
      loading.value = true;
      return ApiService.post(url + "save", assetRegistration)
        .then(({ data }) => {
          // update old data
          assetRegistrationDetails.value = { ...data };
        })
        .then(() => {
          loading.value = false;
        });
    };

    const updateAssetRegistration = () => {};
    return {
      loading,
      assetRegistrationList,
      getAssetRegistration,
      saveAssetRegistration,
      updateAssetRegistration,
      assetRegistrationDetails,
    };
  }
);

import ApiService from "@/core/services/ApiService";
import type { IPagination } from "@/schema/IPagination";
import type { IRequestPurchaseOrder } from "@/schema/contract-man/IRequestPurchaseOrder";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useRequestPurchaseOrderStore = defineStore("req-purch", () => {
  const loading = ref<boolean>(false);
  const url = "";
  const requestPurchaseOrderList = ref<IPagination>({
    page: 1,
    length: 10,
    parameters: [{ name: "contractNomor", searchValue: "" }],
    pageInfo: { data: [] },
    order: {
      parameterName: "modifiedDate",
      dir: "desc",
    },
  });
  const requestPurchaseOrderDetails = ref<IRequestPurchaseOrder>({});

  const getRequestPurchaseOrder = (
    requestPurchaseOrder?: IRequestPurchaseOrder
  ) => {
    // begin::Filter
    requestPurchaseOrderList.value.parameters[0].searchValue =
      requestPurchaseOrder?.rpoNomor ?? "";
    // begin::Filter

    // retrieve data
    // return ApiService.post(url, [...productCompany.value.parameters])
    //   .then(({ data }) => {
    //     productCompany.value.pageInfo!.data = [...data];
    //   })
    //   .then(() => {
    //     loading.value = false;
    //   });

    requestPurchaseOrderList.value.pageInfo!.data = [
      {
        rpoNomor: "RPO001",
        contractNomor: "4600004931",
        rpoSubject: "Rental PC",
        additionalInfo: "NULL",
        roStart: "01 Januari 2022",
        roEnd: "02 Januari 2023 ",
        totalRpo: "120000000.00",
        lastModifiedDate: "21 Februari 2024",
        modifiedBy: "mk.irwan.yudianto",
        associationStatus: "1",
      },
      {
        rpoNomor: "RPO002",
        contractNomor: "4600004931",
        rpoSubject: "Rental PC",
        additionalInfo: "NULL",
        roStart: "01 Januari 2023",
        roEnd: "02 Januari 2024",
        totalRpo: "120000000.00",
        lastModifiedDate: "21 Februari 2024",
        modifiedBy: "mk.irwan.yudianto",
        associationStatus: "0",
      },
      {
        rpoNomor: "RPO003",
        contractNomor: "4600004931",
        rpoSubject: "Rental PC",
        additionalInfo: "NULL",
        roStart: "01 Januari 2023",
        roEnd: "02 Januari 2024",
        totalRpo: "120000000.00",
        lastModifiedDate: "21 Februari 2024",
        modifiedBy: "mk.irwan.yudianto",
        associationStatus: "1",
      },
    ] as unknown as Array<IRequestPurchaseOrder>;
  };

  const saverequestPurchaseOrder = (
    requestPurchaseOrder?: IRequestPurchaseOrder
  ) => {
    // save API
    requestPurchaseOrder!.rpoNomor;
    loading.value = true;
    return ApiService.post(url + "save", requestPurchaseOrder)
      .then(({ data }) => {
        // update old data
        requestPurchaseOrderDetails.value = { ...data };
      })
      .then(() => {
        loading.value = false;
      });
  };

  const updaterequestPurchaseOrder = () => {};
  return {
    loading,
    requestPurchaseOrderList,
    getRequestPurchaseOrder,
    saverequestPurchaseOrder,
    updaterequestPurchaseOrder,
    requestPurchaseOrderDetails,
  };
});

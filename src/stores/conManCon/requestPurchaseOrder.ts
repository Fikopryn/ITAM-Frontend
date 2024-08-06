import ApiService from "@/core/services/ApiService";
import type { IPagination } from "@/schema/IPagination";
import type { IRequestPurchaseOrder } from "@/schema/contract-man/IRequestPurchaseOrder";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useRequestPurchaseOrderStore = defineStore(
  "request-purchase-order",
  () => {
    const loading = ref<boolean>(false);
    const url = import.meta.env.VITE_APP_API_URL + "/RequestPurchaseOrder";
    const requestPurchaseOrderList = ref<IPagination>({
      page: 1,
      length: 10,
      parameters: [{ name: "contractNo", searchValue: "" }],
      pageInfo: { data: [] },
      order: {
        parameterName: "modifiedDate",
        dir: "desc",
      },
    });
    const getRequestPurchaseOrderList1 = ref<Array<IRequestPurchaseOrder>>([]);
    const requestPurchaseOrderDetails = ref<IRequestPurchaseOrder>({});

    const getRequestPurchaseOrder = (
      requestPurchaseOrder?: IRequestPurchaseOrder
    ) => {
      // begin::Filter
      requestPurchaseOrderList.value.parameters[0].searchValue =
        requestPurchaseOrder?.rpono ?? "";
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
          rpoNo: "RPO001",
          contractNo: "4600004931",
          rpoSubject: "Rental PC",
          additionalInfo: "NULL",
          roStart: "01 Januari 2022",
          roEnd: "02 Januari 2023 ",
          totalRpo: "120000000.00",
          lastModifiedDate: "21 Februari 2024",
          modifiedBy: "mk.irwan.yudianto",
        },
        {
          rpoNo: "RPO002",
          contractNo: "4600004931",
          rpoSubject: "Rental PC",
          additionalInfo: "NULL",
          roStart: "01 Januari 2023",
          roEnd: "02 Januari 2024",
          totalRpo: "120000000.00",
          lastModifiedDate: "21 Februari 2024",
          modifiedBy: "mk.irwan.yudianto",
        },
        {
          rpoNo: "RPO003",
          contractNo: "4600004931",
          rpoSubject: "Rental PC",
          additionalInfo: "NULL",
          roStart: "01 Januari 2023",
          roEnd: "02 Januari 2024",
          totalRpo: "120000000.00",
          lastModifiedDate: "21 Februari 2024",
          modifiedBy: "mk.irwan.yudianto",
        },
      ] as unknown as Array<IRequestPurchaseOrder>;
    };

    const saveRequestPurchaseOrder = (
      requestPurchaseOrder?: IRequestPurchaseOrder
    ) => {
      // save API
      requestPurchaseOrder!.totalRpo;
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

    const getRequestPurchaseOrderList = () => {
      loading.value = true;
      return ApiService.get(
        import.meta.env.VITE_APP_API_URL + "/RequestPurchaseOrder/All-Data"
      )
        .then(({ data }) => {
          getRequestPurchaseOrderList1.value = data;
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const updateRequestPurchaseOrder = () => {};
    return {
      loading,
      requestPurchaseOrderList,
      getRequestPurchaseOrder,
      getRequestPurchaseOrderList,
      getRequestPurchaseOrderList1,
      saveRequestPurchaseOrder,
      updateRequestPurchaseOrder,
      requestPurchaseOrderDetails,
    };
  }
);

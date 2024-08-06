import ApiService from "@/core/services/ApiService";
import type { IPagination } from "@/schema/IPagination";
import type { IDeliveryOrder } from "@/schema/contract-man/IDeliveryOrder";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDeliveryOrderStore = defineStore("delivery-order", () => {
  const loading = ref<boolean>(false);
  const url = "";
  const deliveryOrderList = ref<IPagination>({
    page: 1,
    length: 10,
    parameters: [{ name: "company", searchValue: "" }],
    pageInfo: { data: [] },
    order: {
      parameterName: "modifiedDate",
      dir: "desc",
    },
  });
  const deliveryOrderDetails = ref<IDeliveryOrder>({});

  const getDeliveryOrder = (deliveryOrder?: IDeliveryOrder) => {
    // begin::Filter
    deliveryOrderList.value.parameters[0].searchValue =
      deliveryOrder?.deliveryOrderNomor ?? "";
    // begin::Filter

    // retrieve data
    // return ApiService.post(url, [...productCompany.value.parameters])
    //   .then(({ data }) => {
    //     productCompany.value.pageInfo!.data = [...data];
    //   })
    //   .then(() => {
    //     loading.value = false;
    //   });

    deliveryOrderList.value.pageInfo!.data = [
      {
        company: "1",
        contractNomor: "4600004931",
        deliveryOrderNomor: "DO001",
        deliveryOrderDate: "2024-02-01 00:00:00.000",
        receivedDate: "2024-02-02 00:00:00.000",
        supplierName: "7",
        deliveryOrderDocument: "NULL",
        lastModifiedDate: "2024-02-02 00:00:00.000",
        modifiedBy: "mk.irwan.yudianto",
        associationStatus: "1",
      },
      {
        company: "1",
        contractNomor: "4600004931",
        deliveryOrderNomor: "DO002",
        deliveryOrderDate: "2024-02-12 00:00:00.000",
        receivedDate: "2024-02-19 00:00:00.000",
        supplierName: "7",
        deliveryOrderDocument: "NULL",
        lastModifiedDate: "2024-02-18 00:00:00.000",
        modifiedBy: "mk.irwan.yudianto",
        associationStatus: "0",
      },
      {
        company: "1",
        contractNomor: "NULL",
        deliveryOrderNomor: "DO0034",
        deliveryOrderDate: "2023-12-15 00:00:00.000",
        receivedDate: "2023-12-16 00:00:00.000",
        supplierName: "9",
        deliveryOrderDocument: "NULL",
        lastModifiedDate: "2023-12-16 00:00:00.000",
        modifiedBy: "mk.irwan.yudianto",
        associationStatus: "1",
      },
      {
        company: "1",
        contractNomor: "4600100010",
        deliveryOrderNomor: "DO01010",
        deliveryOrderDate: "2023-03-01 00:00:00.000",
        receivedDate: "2023-03-01 00:00:00.000",
        supplierName: "5",
        deliveryOrderDocument: "NULL",
        lastModifiedDate: "2023-03-01 00:00:00.000",
        modifiedBy: "mk.irwan.yudianto",
        associationStatus: "0",
      },
      {
        company: "1",
        contractNomor: "4600005982",
        deliveryOrderNomor: "DO-A001",
        deliveryOrderDate: "2023-12-03 00:00:00.000",
        receivedDate: "2023-12-03 00:00:00.000",
        supplierName: "8",
        deliveryOrderDocument: "NULL",
        lastModifiedDate: "2024-12-16 00:00:00.000",
        modifiedBy: "mk.irwan.yudianto",
        associationStatus: "0",
      },
    ] as unknown as Array<IDeliveryOrder>;
  };

  const saveDeliveryOrder = (deliveryOrder?: IDeliveryOrder) => {
    // save API
    deliveryOrder!.deliveryOrderNomor;
    loading.value = true;
    return ApiService.post(url + "save", deliveryOrder)
      .then(({ data }) => {
        // update old data
        deliveryOrderDetails.value = { ...data };
      })
      .then(() => {
        loading.value = false;
      });
  };

  const updateDeliveryOrder = () => {};
  return {
    loading,
    deliveryOrderList,
    getDeliveryOrder,
    saveDeliveryOrder,
    updateDeliveryOrder,
    deliveryOrderDetails,
  };
});

import ApiService from "@/core/services/ApiService";
import type { IPagination } from "@/schema/IPagination";
import type { IContractRegistration } from "@/schema/contract-man/IContractRegistration";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useContractRegistrationStore = defineStore("contract-man", () => {
  const loading = ref<boolean>(false);
  const url = "";
  const contractRegistrationList = ref<IPagination>({
    page: 1,
    length: 10,
    parameters: [{ name: "contractNomor", searchValue: "" }],
    pageInfo: { data: [] },
    order: {
      parameterName: "modifiedDate",
      dir: "desc",
    },
  });
  const contractRegistrationDetails = ref<IContractRegistration>({});

  const getContractRegistration = (
    contractRegistration?: IContractRegistration
  ) => {
    // begin::Filter
    contractRegistrationList.value.parameters[0].searchValue =
      contractRegistration?.contractNomor ?? "";
    // begin::Filter

    // retrieve data
    // return ApiService.post(url, [...productCompany.value.parameters])
    //   .then(({ data }) => {
    //     productCompany.value.pageInfo!.data = [...data];
    //   })
    //   .then(() => {
    //     loading.value = false;
    //   });

    contractRegistrationList.value.pageInfo!.data = [
      {
        companyId: "1",
        contractOwner: "End User Support",
        contractNomor: "4600004931",
        subject: "PROVISION OF PC, LAPTOP & WORKSTATION SERVICES",
        supplierId: "7",
        startContract: "2019/06/25",
        endContract: "2024/07/15",
        contractValue: "24918239809.00",
        contractDocument: "NULL",
        lastModifiedDate: "2024/01/24",
        modifiedBy: "mk.irwan.yudianto",
        associationStatus: "1",
      },
      {
        companyId: "1",
        contractOwner: "End User Support",
        contractNomor: "4600005978",
        subject:
          "RENTAL, MAINTENANCE AND ON-SITE SUPPORT DISTRIBUTED PERIPHERALS (SCANNER, LED TV, PROJECTOR)",
        supplierId: "9",
        startContract: "01 Januari 2018",
        endContract: "31 Desember 2021",
        contractValue: "10512846496.00",
        contractDocument: "NULL",
        lastModifiedDate: "16 Januari 2024",
        modifiedBy: "mk.irwan.yudianto",
        associationStatus: "0",
      },
      {
        companyId: "1",
        contractOwner: "End User Support",
        contractNomor: "4600005982",
        subject:
          "RENTAL, MAINTENANCE AND ON-SITE SUPPORT MANAGED PRINT SERVICE",
        supplierId: "8",
        startContract: "29 April 2019",
        endContract: "31 Desember 2023",
        contractValue: "25842203892.00",
        contractDocument: "NULL",
        lastModifiedDate: "16 Januari 2024",
        modifiedBy: "mk.irwan.yudianto",
        associationStatus: "1",
      },
      {
        companyId: "1",
        contractOwner: "End User Support",
        contractNomor: "4600006073",
        subject: "MAINTENANCE PC DESKTOP & LAPTOP & OS UPGRADE SERVICE",
        supplierId: "7",
        startContract: "01 April 2019",
        endContract: "30 September 2023",
        contractValue: "58293192580.69",
        contractDocument: "NULL",
        lastModifiedDate: "16 Januari 2024",
        modifiedBy: "mk.irwan.yudianto",
        associationStatus: "0",
      },
    ] as unknown as Array<IContractRegistration>;
  };

  const saveContractRegistration = (
    contractRegistration?: IContractRegistration
  ) => {
    // save API
    contractRegistration!.contractNomor;
    loading.value = true;
    return ApiService.post(url + "save", contractRegistration)
      .then(({ data }) => {
        // update old data
        contractRegistrationDetails.value = { ...data };
      })
      .then(() => {
        loading.value = false;
      });
  };

  const updateContractRegistration = () => {};
  return {
    loading,
    contractRegistrationList,
    getContractRegistration,
    saveContractRegistration,
    updateContractRegistration,
    contractRegistrationDetails,
  };
});

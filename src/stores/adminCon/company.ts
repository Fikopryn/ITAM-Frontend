import ApiService from "@/core/services/ApiService";
import type { IPagination } from "@/schema/IPagination";
import type { ICompany } from "@/schema/admin-con/ICompany";
import type { AxiosRequestConfig } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCompanyStore = defineStore("company", () => {
  const loading = ref<boolean>(false);
  const url = "";
  const companyList = ref<IPagination>({
    page: 1,
    length: 10,
    parameters: [{ name: "companyId", searchValue: "" }],
    pageInfo: { data: [] },
    order: {
      parameterName: "modifiedDate",
      dir: "desc",
    },
  });
  const companyDetails = ref<ICompany>({});
  const getCompanyList1 = ref<Array<ICompany>>([]);

  const getCompany = (company?: ICompany) => {
    // begin::Filter
    companyList.value.parameters[0].searchValue = company?.companyName ?? "";
    // begin::Filter

    // retrieve data
    // return ApiService.post(url, [...productCompany.value.parameters])
    //   .then(({ data }) => {
    //     productCompany.value.pageInfo!.data = [...data];
    //   })
    //   .then(() => {
    //     loading.value = false;
    //   });

    companyList.value.pageInfo!.data = [
      {
        companyId: "1",
        companyName: "PT Pertamina Hulu Mahakam",
        companyType: "Operating Company",
        abbreviation: "PHM",
        website: "https://phi.pertamina.com/",
        lastModifiedDate: "16 Januari 2024",
        modifiedBy: "mk.irwan.yudianto",
        companyStatus: "1",
      },
      {
        companyId: "2",
        companyName: "PT Pertamina Hulu Indonesia",
        companyType: "Operating Company",
        abbreviation: "PHI",
        website: "https://phi.pertamina.com/",
        lastModifiedDate: "16 Januari 2024",
        modifiedBy: "mk.irwan.yudianto",
        companyStatus: "1",
      },
      {
        companyId: "3",
        companyName: "PT Pertamina Hulu Kalimantan Timur",
        companyType: "Operating Company",
        abbreviation: "PHKT",
        website: "https://phi.pertamina.com/",
        lastModifiedDate: "16 Januari 2024",
        modifiedBy: "mk.irwan.yudianto",
        companyStatus: "1",
      },
      {
        companyId: "4",
        companyName: "PT Pertamina Hulu Sanga Sanga",
        companyType: "Operating Company",
        abbreviation: "PHSS",
        website: "https://phi.pertamina.com/",
        lastModifiedDate: "16 Januari 2024",
        modifiedBy: "mk.irwan.yudianto",
        companyStatus: "0",
      },
      {
        companyId: "5",
        companyName: "PT Astra Graphia Tbk",
        companyType: "Suplier",
        abbreviation: "AG",
        website: "https://astragrapha.co.id/",
        lastModifiedDate: "16 Januari 2024",
        modifiedBy: "mk.irwan.yudianto",
        companyStatus: "1",
      },
      {
        companyId: "6",
        companyName: "PT Berca Hardayaperkasa",
        companyType: "Suplier",
        abbreviation: "BHP",
        website: "https://berca.co.id/",
        lastModifiedDate: "16 Januari 2024",
        modifiedBy: "mk.irwan.yudianto",
        companyStatus: "0",
      },
    ] as unknown as Array<ICompany>;
  };

  const saveCompany = (company?: ICompany) => {
    // save API
    company!.companyType;
    loading.value = true;
    return ApiService.post(url + "save", company)
      .then(({ data }) => {
        // update old data
        companyDetails.value = { ...data };
      })
      .then(() => {
        loading.value = false;
      });
  };

  const getCompanyList = () => {
    loading.value = true;
    return ApiService.get(
      import.meta.env.VITE_APP_API_URL + "/Company/All-Data"
    )
      .then(({ data }) => {
        getCompanyList1.value = data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const updateCompany = (data): Promise<boolean> => {
    loading.value = true;
    const params: AxiosRequestConfig = { ...data };
    return ApiService.put(
      import.meta.env.VITE_APP_API_URL + "/Company/Update",
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

  const createCompany = (data): Promise<boolean> => {
    loading.value = true;
    const params: AxiosRequestConfig = { ...data };
    return ApiService.post(
      import.meta.env.VITE_APP_API_URL + "/Company/create",
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
    companyList,
    getCompany,
    saveCompany,
    getCompanyList1,
    getCompanyList,
    updateCompany,
    createCompany,
    companyDetails,
  };
});

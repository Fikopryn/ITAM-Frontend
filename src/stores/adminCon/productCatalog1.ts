import ApiService from "@/core/services/ApiService";
import type { IPagination } from "@/schema/IPagination";
import type { IProductCatalog } from "@/schema/admin-con/IProductCatalog";
import type { AxiosRequestConfig } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductCatalog1Store = defineStore("product-catalog", () => {
  const loading = ref<boolean>(false);
  const url = "";
  const productCatalog1List = ref<IPagination>({
    page: 1,
    length: 10,
    parameters: [{ name: "productCatalogId", searchValue: "" }],
    pageInfo: { data: [] },
    order: {
      parameterName: "lastModifiedDate",
      dir: "desc",
    },
  });
  const getProductCatalog1List1 = ref<Array<IProductCatalog>>([]);
  const productCatalog1Details = ref<IProductCatalog>({});

  const getProductCatalog1 = (productCatalog1?: IProductCatalog) => {
    // begin::Filter
    productCatalog1List.value.parameters[0].searchValue =
      productCatalog1?.companyId ?? "";
    // begin::Filter

    // retrieve data
    // return ApiService.post(url, [...productCompany.value.parameters])
    //   .then(({ data }) => {
    //     productCompany.value.pageInfo!.data = [...data];
    //   })
    //   .then(() => {
    //     loading.value = false;
    //   });

    productCatalog1List.value.pageInfo!.data = [
      {
        productCatalogId: 2,
        prodCatTier1: "End User Support",
        prodCatStatus: "1",
        prodCatTier2: "Computer Service",
        prodCatTier3: "Desktop - Standard (AIO)",
        companyId: "1",
        lastModifiedDate: "undefined",
        modifiedBy: "mk.irwan.yudianto",
        productName: "Lenovo ThinkCentre M70A Gen 3",
        productNumber: "test",
        manufacturer: "Lenovo",
        additionalInfo: "test",
        modelVersion: "ThinkCentre M70A Gen 3",
      },
    ] as unknown as Array<IProductCatalog>;
  };

  const saveProductCatalog1 = (productCatalog1?: IProductCatalog) => {
    // save API
    productCatalog1!.productCatalogId;
    loading.value = true;
    return ApiService.post(url + "save", productCatalog1)
      .then(({ data }) => {
        // update old data
        productCatalog1Details.value = { ...data };
      })
      .then(() => {
        loading.value = false;
      });
  };

  const getProductCatalog1List = () => {
    loading.value = true;
    return ApiService.get(
      import.meta.env.VITE_APP_API_URL + "/ProductCatalog/All-Data"
    )
      .then(({ data }) => {
        getProductCatalog1List1.value = data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const updateProductCatalog1 = (data): Promise<boolean> => {
    loading.value = true;
    const params: AxiosRequestConfig = { ...data };
    return ApiService.put(
      import.meta.env.VITE_APP_API_URL + "/ProductCatalog/Update",
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

  const createProductCatalog1 = (data): Promise<boolean> => {
    loading.value = true;
    const params: AxiosRequestConfig = { ...data };
    return ApiService.post(
      import.meta.env.VITE_APP_API_URL + "/ProductCatalog/create",
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
    productCatalog1List,
    getProductCatalog1,
    getProductCatalog1List,
    getProductCatalog1List1,
    updateProductCatalog1,
    createProductCatalog1,
    saveProductCatalog1,
    productCatalog1Details,
  };
});

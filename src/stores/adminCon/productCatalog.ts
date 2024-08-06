import ApiService from "@/core/services/ApiService";
import type { IPagination } from "@/schema/IPagination";
import type { IProductCatalog } from "@/schema/admin-con/IProductCatalog";
import type { AxiosRequestConfig } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductCatalogStore = defineStore("admin-con", () => {
  const loading = ref<boolean>(false);
  const url = import.meta.env.VITE_APP_API_URL + "/ProductCatalog";
  const productCatalogList = ref<IPagination>({
    page: 1,
    length: 10,
    parameters: [
      { name: "company", searchValue: "" },
      { name: "prodCatTier1", searchValue: "" },
    ],
    pageInfo: { data: [] },
    order: {
      parameterName: "modifiedDate",
      dir: "desc",
    },
  });
  const productCatalogDetails = ref<IProductCatalog>({});
  const productDetails = ref<IProductCatalog>({});
  const getProductCatalogList1 = ref<Array<IProductCatalog>>([]);

  const getProductCatalog = (productCatalog?: IProductCatalog) => {
    // begin::Filter
    productCatalogList.value.parameters[0].searchValue =
      productCatalog?.companyId ?? "";
    productCatalogList.value.parameters[1].searchValue =
      productCatalog?.prodCatTier1 ?? "";
    // begin::Filter

    // retrieve data
    // return ApiService.post(url, [...productCatalogList.value.parameters])
    //   .then(({ data }) => {
    //     productCatalogList.value.pageInfo!.data = [...data];
    //   })
    //   .then(() => {
    //     loading.value = false;
    //   });

    productCatalogList.value.pageInfo!.data = [
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

  const getProductCatalogList = () => {
    loading.value = true;
    return ApiService.get(
      import.meta.env.VITE_APP_API_URL + "/ProductCatalog/All-Data"
    )
      .then(({ data }) => {
        getProductCatalogList1.value = data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const updateProductCatalog = (data): Promise<boolean> => {
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

  const createProductCatalog = (data): Promise<boolean> => {
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

  const saveProductCatalog = (productCatalog?: IProductCatalog) => {
    let _productName = "";
    if (!productCatalog?.productName) {
      _productName =
        productCatalog?.manufacturer ?? "" + productCatalog?.modelVersion ?? "";
    }

    // save API
    productCatalog!.productName = _productName;
    loading.value = true;
    return ApiService.post(url + "save", productCatalog)
      .then(({ data }) => {
        // update old data
        productDetails.value = { ...data };
      })
      .then(() => {
        loading.value = false;
      });
  };

  return {
    loading,
    productCatalogList,
    getProductCatalog,
    getProductCatalogList,
    getProductCatalogList1,
    updateProductCatalog,
    createProductCatalog,
    saveProductCatalog,
    productCatalogDetails,
  };
});

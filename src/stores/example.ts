import ApiService from "@/core/services/ApiService";
import type { IPagination } from "@/schema/IPagination";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useExampleStore = defineStore("example", () => {
  const loading = ref<boolean>(false);
  const url = "";
  const exampleList = ref<IPagination>({
    parameters: [],
    order: {
      parameterName: "",
      dir: "asc",
    },
  });

  const getExampleList = () => {
    loading.value = true;
    ApiService.post(url + "/page", {
      page: exampleList.value.page,
      length: exampleList.value.length,
      parameters: exampleList.value.parameters,
      order: exampleList.value.order,
    })
      .then(({ data }) => {
        const res = data;
        exampleList.value.pageInfo = {
          currentPage: res.currentPage,
          totalPages: res.totalPages,
          pageSize: res.pageSize,
          hasPrevious: res.hasPrevious,
          hasNext: res.hasNext,
          recordsFiltered: res.recordsFiltered,
          recordsTotal: res.recordsTotal,
          data: res.data,
        };
        loading.value = false;
      })
      .catch(() => {
        loading.value = false;
      });
  };
  return {
    loading,
    getExampleList,
    exampleList,
  };
});

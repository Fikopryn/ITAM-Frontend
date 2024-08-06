import ApiService from "@/core/services/ApiService";
import type { ILov } from "@/schema/ILov";
import type { IPagination } from "@/schema/IPagination";
import type { ISampleUsers } from "@/schema/ISampleUsers";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useExampleTableStore = defineStore("example-table", () => {
  const url = import.meta.env.VITE_APP_API_URL;
  const urlExmampleTable = url + "ExampleTable";
  const loading = ref<boolean>(false);
  const users = ref<Array<ISampleUsers>>([]);
  const userDetails = ref<ISampleUsers>({});
  const userPage = ref<IPagination>({
    page: 1,
    length: 6,
    parameters: [
      {
        name: "",
        searchValue: "",
      },
    ],
    order: {
      parameterName: "city",
      dir: "asc",
    },
  });

  const getUsers = (paginationData: IPagination) => {
    loading.value = true;
    ApiService.post(url + "/ExamplePageView/page", paginationData)
      .then(({ data }) => {
        users.value = data.data;
        console.log(data);
        userPage.value = {
          page: paginationData.page,
          length: paginationData.length,
          order: paginationData.order,
          parameters: paginationData.parameters,
          pageInfo: {
            currentPage: data.currentPage,
            totalPages: data.totalPages,
            pageSize: data.pageSize,
            hasPrevious: data.hasPrevious,
            hasNext: data.hasNext,
            recordsFiltered: data.recordsFiltered,
            recordsTotal: data.recordsTotal,
          },
        };
        loading.value = false;
      })
      .catch(() => {
        loading.value = false;
      });
  };

  const getUserDetails = (userId: string) => {
    loading.value = true;
    ApiService.get(urlExmampleTable, userId)
      .then(({ data }) => {
        userDetails.value = data;
        loading.value = false;
      })
      .catch(() => {
        loading.value = false;
      });
  };

  return {
    loading,
    users,
    userDetails,
    userPage,
    getUsers,
    getUserDetails,
  };
});

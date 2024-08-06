import ApiService from "@/core/services/ApiService";
import type { IPagination } from "@/schema/IPagination";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAdminConStore = defineStore("admin-con", () => {
  const loading = ref<boolean>(false);
  const url = "https://dummyjson.com/products/";
  const addAdminCon = () => {
    return ApiService.post(url + "add", { title: "pc" }).then(({ data }) => {
      console.log(data);
    });
  };
  return {
    loading,
  };
});

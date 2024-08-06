import ApiService from "@/core/services/ApiService";
import type { IGQUser } from "@/schema/IGlobalQuery";
import type { IAuditTrailActivities } from "@/schema/IAuditTrailActivities";
import type { ITenant } from "@/schema/ITenant";
import { defineStore } from "pinia";
import { ref } from "vue";

interface payloadCurrentAssignment {
  moduleId: string;
  moduleName: string;
  moduleStatus: string;
  tenants: Array<ITenant>;
}
interface payloadActivity {
  moduleName: string;
  moduleId: string;
}
export const useActivityStore = defineStore("activity", () => {
  const loading = ref<boolean>(false);
  const urlCurrentAssignment =
    import.meta.env.VITE_APP_API_URL + "/MasterLov/currentassignment";
  const urlActivity = import.meta.env.VITE_APP_API_URL + "/AuditTrailActivity";
  const currentAssignment = ref<Array<IGQUser>>([]);
  const auditTrailActivities = ref<Array<IAuditTrailActivities>>([]);

  const getCurrentAssignment = (payload: payloadCurrentAssignment) => {
    loading.value = true;
    ApiService.post(urlCurrentAssignment, payload)
      .then(({ data }) => {
        currentAssignment.value = data;
      })
      .finally(() => (loading.value = false));
  };

  const getAuditTrailActivities = (payload: payloadActivity) => {
    loading.value = true;
    ApiService.query(urlActivity, {
      params: { modulName: payload.moduleName, modulId: payload.moduleId },
    })
      .then(({ data }) => {
        auditTrailActivities.value = data;
      })
      .finally(() => (loading.value = false));
  };
  return {
    loading,
    currentAssignment,
    auditTrailActivities,
    getCurrentAssignment,
    getAuditTrailActivities,
  };
});

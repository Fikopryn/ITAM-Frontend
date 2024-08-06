import type { IUserSession } from "../schema/IUserSession";
import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import ImpersonateService from "@/core/services/ImpersonateService";

export interface User {
  access_token: string;
  token_type: string;
  expires_at: string;
  users: UserDetail;
  func: string;
  subfunc: string;
  posname: string;
  role: Array<any>;
}

export interface UserDetail {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  guid: string;
  domain: string;
  username: string;
}

export const useImpersonateStore = defineStore("auth-impersonate", () => {
  const errors = ref({});
  const impersonateSession = ref<IUserSession>(
    ImpersonateService.getImpersonate() as IUserSession
  );

  function setImpersonate(userSession: IUserSession) {
    impersonateSession.value = userSession;
    errors.value = {};
    ImpersonateService.saveImpersonate(userSession);
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function loginImpersonate(userId: String) {
    return ApiService.post(
      import.meta.env.VITE_APP_API_URL + "/r3/user/impersonate",
      userId
    )
      .then(async ({ data }) => {
        setImpersonate(data);
      })
      .catch(({ response }) => {
        if (response) {
          const errMsg = response.data.message ?? "";
          const errors = [errMsg];
          setError(errors);
        }
      });
  }

  function logoutImpersonate() {
    ImpersonateService.destroyImpersonate();
    impersonateSession.value = {};
  }

  return {
    errors,
    impersonateSession,
    loginImpersonate,
    logoutImpersonate,
  };
});

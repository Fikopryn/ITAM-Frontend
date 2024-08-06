import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import type { IUserSession } from "@/schema/IUserSession";
import UserService from "@/core/services/UserService";
import TenantService from "@/core/services/TenantService";
import { useLovStore } from "./lov";

export interface UserSignInPayload {
  client_id: string;
  client_secret: string;
  grant_type: string;
  username?: string;
  password?: string;
  refresh_token: string;
  sysname: string;
}

export interface User {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  session_state: string;
  scoope: string;
  users: UserDetail;
  func: string;
  subfunc: string;
  posname: string;
  role: Array<any>;
}

export interface UserDetail {
  name: string;
  email: string;
  username: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const isAuthenticated = ref(!!JwtService.getToken());
  const isRefreshingToken = ref(false);
  const countRetryAttempt = ref(0);
  const lovStore = useLovStore();
  const loading = ref(false);

  async function setAuth(authUser: User) {
    isAuthenticated.value = true;
    errors.value = {};
    JwtService.saveToken(authUser);
    return true;
  }

  function setRefreshToken(authUser: User) {
    isAuthenticated.value = true;
    errors.value = {};
    JwtService.saveRefreshToken(authUser);
  }

  async function setUserRole() {
    const guestRole = {
      role: [
        { sysName: import.meta.env.VITE_APP_NAME, sysRole: "GUEST", acl: [] },
      ],
    };
    const guestSession: IUserSession = {
      roleInformation: guestRole,
    };

    return ApiService.get(
      import.meta.env.VITE_APP_API_URL,
      `r3/datamanagement/appuserdata`
    )
      .then(async ({ data }) => {
        const userSession: IUserSession = data;
        if ((userSession?.roleInformation?.role?.length ?? 0) > 0) {
          UserService.saveUserSession(userSession);

          const listOfTenantFromRole = await lovStore.lovTenantsFromRole();

          TenantService.saveSelectedTenant(listOfTenantFromRole);
        } else if (
          userSession?.userInformation &&
          !userSession.roleInformation
        ) {
          userSession.roleInformation = guestRole;
          UserService.saveUserSession(userSession);
        } else {
          UserService.saveUserSession(guestSession);
        }
      })
      .catch(() => {
        UserService.saveUserSession(guestSession);
      });
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = [];
    JwtService.destroyToken();
    UserService.destroyUserSession();
    TenantService.destroySelectedTenant();
  }

  async function login(credentials: UserSignInPayload) {
    // begin::Set credential
    credentials.client_id = import.meta.env.VITE_CLIENT_ID;
    credentials.client_secret = import.meta.env.VITE_CLIENT_SECRET;
    credentials.grant_type = "password";
    credentials.refresh_token = "";
    credentials.sysname = import.meta.env.VITE_APP_NAME;
    // end::Set credential

    return ApiService.post(
      import.meta.env.VITE_APP_API_URL + "/r3/oauth/login",
      credentials
    )
      .then(async ({ data }) => {
        await setAuth(data);
        await setUserRole();
      })
      .catch(({ response }) => {
        if (response) {
          const errMsg = response.data.message ?? "";
          const errors = [errMsg];
          setError(errors);
        }
      });
  }

  function logout() {
    purgeAuth();
  }

  function register(credentials: User) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function forgotPassword(email: string) {
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  async function verifyAuth(): Promise<boolean> {
    if (JwtService.getToken()) {
      const payload = {
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        token: JwtService.getToken(),
      };

      return await ApiService.post(
        import.meta.env.VITE_APP_API_URL + "/r3/oauth/introspect",
        payload
      )
        .then(async ({ data }) => {
          return data?.active;
          //if (data?.active) {
          //const res = await refreshToken();
          //if (res) return true;

          //return false;
          //} else {
          //return false;
          //}
          // setAuth(data);
        })
        .catch(({ response }) => {
          setError(response?.data?.errors ?? "");
          purgeAuth();
          return false;
        });
    } else {
      purgeAuth();
      return false;
    }
  }

  async function refreshToken(): Promise<boolean> {
    if (JwtService.getRefreshToken()) {
      isRefreshingToken.value = true;
      // begin::Set credential
      const credentials: UserSignInPayload = {
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: JwtService.getRefreshToken() ?? "",
        sysname: import.meta.env.VITE_APP_NAME,
      };
      // end::Set credential

      await ApiService.post(
        import.meta.env.VITE_APP_API_URL + "/r3/oauth/refresh_token",
        credentials
      )
        .then(({ data }) => {
          setRefreshToken(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
          logout();
          return false;
        })
        .finally(() => {
          isRefreshingToken.value = false;
        });
    } else {
      logout();
      return false;
    }

    return true;
  }
  return {
    errors,
    user,
    isAuthenticated,
    isRefreshingToken,
    countRetryAttempt,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
    refreshToken,
    loading,
  };
});

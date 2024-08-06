import { useAuthStore } from "@/stores/auth";
import type { App } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/JwtService";
import ImpersonateService from "@/core/services/ImpersonateService";
import type { AxiosResponse } from "axios";
import type { IAxiosMiddlewareParams } from "@/schema/IAxiosMiddlewareParams";
import { isAclHasAccess } from "./PermissionService";
import Swal from "sweetalert2";
import router from "@/router/index";

interface IMiddlewareCheck {
  success: boolean;
  data?: {
    message?: string;
  };
}

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL =
      import.meta.env.VITE_APP_API_URL;
    ApiService.vueInstance.axios.interceptors.request.use(
      (successRes) => {
        return successRes;
      },
      async (errorRes) => {
        const originalRequest = errorRes.config;
        if (errorRes.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          const store = useAuthStore();
          await store.refreshToken();
          ApiService.vueInstance.axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${JwtService.getToken()}`;
          return ApiService.vueInstance.axios(originalRequest);
        }
        return Promise.reject(errorRes);
      }
    );
  }

  /**
   * @description set the default HTTP request middleware
   */
  public static async setMiddleware(
    apiMiddleware?: IAxiosMiddlewareParams
  ): Promise<IMiddlewareCheck> {
    // const userHasPermission = await isAclHasAccess(apiMiddleware?.permissions);
    // if (userHasPermission) {
    //   return { success: true };
    // } else {
    //   Swal.fire({
    //     title: "Error",
    //     text: "You dont have permissions to do thats",
    //     icon: "error",
    //     buttonsStyling: false,
    //     confirmButtonText: "Try again!",
    //     heightAuto: false,
    //     customClass: {
    //       confirmButton: "btn fw-semobold btn-light-danger",
    //     },
    //   }).then(() => {});

    //   return {
    //     success: false,
    //     data: {
    //       message: "You dont have permissions to do that",
    //     },
    //   };
    // }
    return { success: true };
  }

  public static getImpersonateUserId(): string | null {
    const impersonateSession = ImpersonateService.getImpersonate();

    if (
      impersonateSession &&
      impersonateSession.userInformation &&
      impersonateSession.userInformation.userId
    ) {
      return impersonateSession.userInformation.userId;
    }
    return null;
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    // if (!ApiService.vueInstance.axios) {
    //   console.log("need to refresh page", ApiService.vueInstance);
    // }
    const impersonateUserId = this.getImpersonateUserId();

    ApiService.vueInstance.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] =
      "application/json";

    // set impersonate user id if user impersonate
    if (impersonateUserId) {
      ApiService.vueInstance.axios.defaults.headers.common["ImpersonateAs"] =
        impersonateUserId;
    }
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(resource: string, params: any): Promise<AxiosResponse> {
    this.setHeader();
    this.setMiddleware();

    const apiResponse = ApiService.vueInstance.axios.get(`${resource}`, params);

    this.showErrorResponse(apiResponse, () => this.get(resource, params));

    return apiResponse;
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(
    resource: string,
    slug = "" as string
  ): Promise<AxiosResponse> {
    this.setHeader();
    this.setMiddleware();

    const apiResponse = ApiService.vueInstance.axios.get(`${resource}/${slug}`);

    this.showErrorResponse(apiResponse, () => this.get(`${resource}/${slug}`));

    return apiResponse;
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static async post(
    resource: string,
    params: any,
    apiMiddleware?: IAxiosMiddlewareParams
  ): Promise<AxiosResponse> {
    this.setHeader();
    const middleware = await this.setMiddleware(apiMiddleware);

    if (middleware.success) {
      const apiResponse = ApiService.vueInstance.axios.post(
        `${resource}`,
        params
      );

      this.showErrorResponse(apiResponse, () =>
        this.post(resource, params, apiMiddleware)
      );

      return apiResponse;
    }

    return Promise.reject({ response: middleware });
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static async update(
    resource: string,
    slug: string,
    params: any,
    apiMiddleware?: IAxiosMiddlewareParams
  ): Promise<AxiosResponse> {
    this.setHeader();
    const middleware = await this.setMiddleware(apiMiddleware);

    if (middleware.success) {
      const apiResponse = ApiService.vueInstance.axios.put(
        `${resource}/${slug}`,
        params
      );

      this.showErrorResponse(apiResponse, () =>
        this.post(resource, params, apiMiddleware)
      );

      return apiResponse;
    }

    return Promise.reject({ response: middleware });
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(resource: string, params: any): Promise<AxiosResponse> {
    this.setHeader();
    this.setMiddleware();

    const apiResponse = ApiService.vueInstance.axios.put(`${resource}`, params);

    this.showErrorResponse(apiResponse, () => this.put(`${resource}`, params));

    return apiResponse;
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string): Promise<AxiosResponse> {
    this.setHeader();
    this.setMiddleware();

    const apiResponse = ApiService.vueInstance.axios.delete(resource);

    this.showErrorResponse(apiResponse, () => this.delete(resource));

    return apiResponse;
  }

  public static showErrorResponse(
    apiResponse: Promise<AxiosResponse>,
    callbackFunction
  ): void {
    apiResponse.catch(async ({ response }) => {
      if (response?.status == 401 || response?.status == 403) {
        const store = useAuthStore();
        const isRefreshSuccess = await store.refreshToken();
        if (isRefreshSuccess) {
          callbackFunction();
        } else {
          router.push({ name: "sign-in" });
        }
      }
      if (response?.code === "ERR_NETWORK") {
        Swal.fire({
          title: "Ooops!",
          text: "There is something wrong with your network connection. Please try again.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          showCancelButton: true,
          cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: "Close",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            callbackFunction();
          }
        });
      } else {
        const errorMessage = response?.data?.message ?? "";
        if (
          errorMessage &&
          (errorMessage == "Refresh Token Expired" ||
            errorMessage == "Different IpAddress & Refresh Token Expired")
        ) {
          Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. Please login again.",
            icon: "error",
            buttonsStyling: false,
            showConfirmButton: true,
            confirmButtonText: "Ok",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semibold btn-danger text-light",
            },
          });
        } else if (
          response?.status == 500 &&
          response?.data?.message ==
            "Response status code does not indicate success: 401 (Unauthorized)."
        ) {
          Swal.fire({
            title: "Error",
            text: "Login Failed. Please check your username and password.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semibold btn-danger text-light",
            },
          });
        } else {
          if (response?.status != 403) {
            Swal.fire({
              title: "Something Error",
              text: errorMessage,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok",
              heightAuto: false,
              customClass: {
                confirmButton: "btn fw-semibold btn-danger text-light",
              },
            });
          }
        }
      }
    });
  }
}

export default ApiService;

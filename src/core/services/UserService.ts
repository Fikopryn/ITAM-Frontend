import type { IUserSession } from "./../../schema/IUserSession";
import type { IRoleInformation, IAcl } from "@/schema/IRoleInformation";
const ID_USER_ROLE_KEY = "user_session" as string;
const ID_USER_INFO = "user_session" as string;
const ID_IMPERSONATE = "impersonate" as string;

/**
 * @description get user role form localStorage
 */
export const getUserRole = (): Array<IRoleInformation> => {
  const impersonateSession = window.localStorage.getItem(ID_IMPERSONATE);
  const userSession = window.localStorage.getItem(ID_USER_ROLE_KEY);

  let roleInformation: Array<IRoleInformation> = [];

  if (impersonateSession) {
    const impersonateSessionParse: IUserSession =
      JSON.parse(impersonateSession);

    roleInformation = impersonateSessionParse.roleInformation?.role!;
  } else if (userSession) {
    const userSessionParse: IUserSession = JSON.parse(userSession);

    roleInformation = userSessionParse.roleInformation?.role!;
  }

  return roleInformation;
};

/**
 * @description check if user has access (ACL)
 * @param sysname: string
 * @param sysrole: string
 */

export const getUserInfo = (): any => {
  const impersonateSession = window.localStorage.getItem(ID_IMPERSONATE);
  const userInfo = window.localStorage.getItem(ID_USER_INFO);

  let userInfoParse: any = {};

  if (userInfo) {
    userInfoParse = JSON.parse(userInfo);
  }
  // if (impersonateSession) {
  //   const impersonateSessionParse: IUserSession =
  //     JSON.parse(impersonateSession);
  //   userInfoParse = impersonateSessionParse.userInformation;
  // } else if (userInfo) {
  // userInfoParse = JSON.parse(userInfo);
  // }

  return userInfoParse.userInformation;
};

/**
 * @description save user role into localStorage
 * @param userRole: IUserSession
 */
export const saveUserSession = (userRole: IUserSession): void => {
  window.localStorage.setItem(ID_USER_ROLE_KEY, JSON.stringify(userRole));
};

/**
 * @description remove user role form localStorage
 */
export const destroyUserSession = (): void => {
  window.localStorage.removeItem(ID_USER_ROLE_KEY);
};

export default {
  getUserInfo,
  getUserRole,
  saveUserSession,
  destroyUserSession,
};

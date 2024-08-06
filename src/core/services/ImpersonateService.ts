import type { IUserSession } from "@/schema/IUserSession";

const IMPERSONATE_KEY = "impersonate" as string;

/**
 * @description get impersonate form localStorage
 */
export const getImpersonate = (): IUserSession | null => {
  const impersonateSession = window.localStorage.getItem(IMPERSONATE_KEY);

  if (impersonateSession) {
    const impersonateSessionParse: IUserSession =
      JSON.parse(impersonateSession);
    return impersonateSessionParse;
  }

  return null;
};

/**
 * @description save impersonate into localStorage
 * @param impersonate: IUserSession
 */
export const saveImpersonate = (impersonate: IUserSession): void => {
  window.localStorage.setItem(IMPERSONATE_KEY, JSON.stringify(impersonate));
};

/**
 * @description remove token form localStorage
 */
export const destroyImpersonate = (): void => {
  window.localStorage.removeItem(IMPERSONATE_KEY);
};

export default { getImpersonate, saveImpersonate, destroyImpersonate };

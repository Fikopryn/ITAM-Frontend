import type { User } from "@/stores/auth";

const ID_JWT_KEY = "jwt_service" as string;

/**
 * @description get token form localStorage
 */
export const getToken = (): string | null => {
  const jwt = window.localStorage.getItem(ID_JWT_KEY);

  if (jwt) {
    const jwtParse = JSON.parse(jwt) as User;
    return jwtParse.access_token;
  }
  return null;
};

/**
 * @description get refresh token form localStorage
 */
export const getRefreshToken = (): string | null => {
  const jwt = window.localStorage.getItem(ID_JWT_KEY);

  if (jwt) {
    const jwtParse = JSON.parse(jwt) as User;
    return jwtParse.refresh_token;
  }
  return null;
};

/**
 * @description save token into localStorage
 * @param token: User
 */
export const saveToken = (token: User): void => {
  window.localStorage.setItem(ID_JWT_KEY, JSON.stringify(token));
};

/**
 * @description save token into localStorage
 * @param token: User
 */
export const saveRefreshToken = (token: User): void => {
  const jwt = window.localStorage.getItem(ID_JWT_KEY);
  if (jwt) {
    const jwtParse = JSON.parse(jwt) as User;

    jwtParse.access_token = token.access_token;
    jwtParse.refresh_token = token.refresh_token;
    saveToken(jwtParse);
  }
};

/**
 * @description remove token form localStorage
 */
export const destroyToken = (): void => {
  window.localStorage.removeItem(ID_JWT_KEY);
};

export default {
  getToken,
  saveToken,
  destroyToken,
  getRefreshToken,
  saveRefreshToken,
};

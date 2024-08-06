import type { ILov } from "@/schema/ILov";
import { getAllTenantFromRoleAdmin } from "./PermissionService";

const ID_SELECTED_TENANT = "list_selected_tenant" as string;

/**
 * @description get selected tenant key form localStorage
 */

export const getSelectedTenant = (type = "all", role = ""): any => {
  const selectedTenant = window.localStorage.getItem(ID_SELECTED_TENANT);

  let selectedTenantParse = new Array<ILov>();

  if (role == "admin") {
    const listAdminTenant = getAllTenantFromRoleAdmin();
    if (selectedTenant) {
      const selectedTenantAdmin = new Array<ILov>();
      selectedTenantParse = JSON.parse(selectedTenant);
      selectedTenantParse.forEach((item) => {
        const isAdmin = listAdminTenant.findIndex(
          (element) => element.lovKey == item.lovKey
        );

        if (isAdmin != -1) {
          selectedTenantAdmin.push(item);
        }
      });

      selectedTenantParse = selectedTenantAdmin;
      if (selectedTenantParse.length < 1) {
        console.log("No tenant admin access.");
        const invalidTenant: ILov = {
          lovKey: "XXXXXX",
          lovName: "XXXXXX",
        };
        selectedTenantParse.push(invalidTenant);
      }
    }
  } else {
    if (selectedTenant) {
      selectedTenantParse = JSON.parse(selectedTenant);
    }
  }

  if (selectedTenantParse.length > 0) {
    if (type == "key") {
      const selectedTenantToArrayKey = selectedTenantParse.map((item) => {
        return item.lovKey;
      });

      return selectedTenantToArrayKey ?? [];
    }
    if (type == "value") {
      const selectedTenantToArrayValue = selectedTenantParse.map((item) => {
        return item.lovValue;
      });

      return selectedTenantToArrayValue ?? [];
    }
  }

  return selectedTenantParse;
};

/**
 * @description save selected tenant into localStorage
 * @param userRole: IUserSession
 */
export const saveSelectedTenant = (selectedTenant: Array<ILov>): void => {
  window.localStorage.setItem(
    ID_SELECTED_TENANT,
    JSON.stringify(selectedTenant)
  );
};

/**
 * @description remove selected tenant form localStorage
 */
export const destroySelectedTenant = (): void => {
  window.localStorage.removeItem(ID_SELECTED_TENANT);
};

export default {
  getSelectedTenant,
  saveSelectedTenant,
  destroySelectedTenant,
};

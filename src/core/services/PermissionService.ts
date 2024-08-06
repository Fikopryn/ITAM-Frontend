import type { IAcl, IRoleInformation } from "@/schema/IRoleInformation";
import { getUserRole } from "./UserService";
import type { ILov } from "@/schema/ILov";

/**
 * @description Check if user has role
 */
export const isRoleHasAccess = (
  sysRole: string,
  tenantKey?: string
): boolean => {
  const userRole = getUserRole();
  const isSysRoleExist = userRole.find((item) => {
    const _roleName = item.sysRole.split("_");

    if (_roleName) {
      // if user has superAdmin
      // if (_roleName[0] == "SUPERADMIN") {
      //   return true;
      // } else {
      // check for tenant
      if (tenantKey) {
        return _roleName[0] == sysRole && _roleName[2] == tenantKey;
      }
      return _roleName[0] == sysRole;
      // }
    } else {
      return false;
    }
  });

  if (isSysRoleExist) {
    return true;
  }
  return false;
};

/**
 * @description Get all acl from role
 */
export const getAcl = (role?: string | null): Array<IAcl> => {
  const sysName = import.meta.env.VITE_APP_NAME;
  const userRole = getUserRole();

  let userAcl = [] as Array<IAcl>;

  if (role) {
    userRole.forEach((element) => {
      if (element.sysName == sysName && role == element.sysRole) {
        userAcl = [...userAcl, ...element.acl];
      }
    });
  } else {
    userRole.forEach((element) => {
      if (element.sysName == sysName) {
        userAcl = [...userAcl, ...element.acl];
      }
    });
  }

  return userAcl;
};

/**
 * @description Check if acl has access
 */
export const isAclHasAccess = (
  aclList?: Array<string> | null
): boolean | null => {
  const sysname = import.meta.env.VITE_APP_NAME;
  const userRole = getUserRole();

  if (userRole[0]?.sysRole == "GUEST") {
    return false;
  }

  let userHasAccess = true;
  let userAcl = [] as Array<IAcl>;

  const userRoleSorted = setRolePriority(userRole);
  userRoleSorted.forEach((element) => {
    if (element.sysName == sysname) {
      userAcl = [...userAcl, ...element.acl];
    }
  });

  if (!isRoleHasAccess("ADMIN")) {
    if (aclList) {
      for (let i = 0; i < aclList.length; i++) {
        const aclExist: IAcl | undefined = userAcl?.find(
          (item) => item.componentId == aclList[i]
        );

        if (aclExist) {
          const hidden = aclExist.hidden;
          const disabled = aclExist.disabled;
          if (hidden == 0 && disabled == 0) {
            userHasAccess = true;
          } else {
            userHasAccess = false;
          }
          break;
        }
      }
    } else {
      userHasAccess = true;
    }
  } else {
    userHasAccess = true;
  }
  return userHasAccess;
};

const setRolePriority = (role): Array<IRoleInformation> => {
  return role.sort(function (a, b) {
    return a.seqrole.localeCompare(b.seqrole);
  });
};

export const getAllTenantFromRole = () => {
  const sysname = import.meta.env.VITE_APP_NAME;

  const userRole = getUserRole();
  const getPreciseRole = userRole.filter((item) => item.sysName == sysname);
  const tenants = new Array<ILov>();

  getPreciseRole.forEach((element) => {
    const tenantKey = element.sysRole.split("_")[2] ?? "";
    const tenantName = element.sysRole.split("_")[1] ?? "";
    const roleName = element.sysRole.split("_")[0] ?? "";

    if (roleName != "SUPERADMIN") {
      const isTenantExist = tenants.findIndex(
        (item) => item.lovKey == tenantKey
      );
      if (isTenantExist == -1) {
        tenants.push({ lovKey: tenantKey, lovValue: tenantName });
      }
    }
  });

  return tenants;
};

export const getAllTenantFromRoleAdmin = () => {
  const sysname = import.meta.env.VITE_APP_NAME;

  const userRole = getUserRole();
  const getPreciseRole = userRole.filter(
    (item) => item.sysName == sysname && item.sysRole.split("_")[0] == "ADMIN"
  );
  const tenants = [] as Array<ILov>;

  getPreciseRole.forEach((element) => {
    const tenantKey = element.sysRole.split("_")[2] ?? "";
    const tenantName = element.sysRole.split("_")[1] ?? "";
    tenants.push({ lovKey: tenantKey, lovValue: tenantName });
  });

  return tenants;
};

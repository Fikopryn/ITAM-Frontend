import { getValueFromGlobalQuery } from "@/core/helpers/common";
import { useR3DataManagementStore } from "@/stores/r3DataManagement";
import { computed } from "vue";

const r3DataManagementStore = useR3DataManagementStore();
const orgHierarchyRaw = computed(() => r3DataManagementStore.orgHierarchyRaw);
const userList = computed(() => r3DataManagementStore.userList);

r3DataManagementStore.getAllOrgHierarchy();
r3DataManagementStore.getUserList();

export const getPermitHolderNameWithPath = (
  permitHolderIdArray: Array<string>
): Array<string> => {
  const permitHolderNameArray = new Array<string>();
  permitHolderIdArray.forEach((permitHolderId) => {
    orgHierarchyRaw.value.every((item) => {
      if (item.divisionid == permitHolderId) {
        permitHolderNameArray.push(item.division);
        return false;
      } else if (item.subdivisionid == permitHolderId) {
        permitHolderNameArray.push(item.subdivision);
        return false;
      } else if (item.departmentid == permitHolderId) {
        permitHolderNameArray.push(item.department);
        return false;
      } else if (item.sectionid == permitHolderId) {
        permitHolderNameArray.push(item.section);
        return false;
      }
      return true;
    });
  });

  return permitHolderNameArray;
};

export const getDepartmentNameWithPath = (
  departmentIdArray: Array<string>
): Array<string> => {
  const departmentNameArray = new Array<string>();

  departmentIdArray.forEach((element, index) => {
    const departmentId = orgHierarchyRaw.value.find((data) => {
      if (index == 0) {
        return data.divisionid == element;
      }
      if (index == 1) {
        return data.subdivisionid == element;
      }
      if (index == 2) {
        return data.departmentid == element;
      }
      if (index == 3) {
        return data.sectionid == element;
      }
    });

    if (departmentId) {
      if (index == 0) {
        departmentNameArray.push(departmentId.division);
      }
      if (index == 1) {
        departmentNameArray.push(departmentId.subdivision);
      }
      if (index == 2) {
        departmentNameArray.push(departmentId.department);
      }
      if (index == 3) {
        departmentNameArray.push(departmentId.section);
      }
    }
  });

  return departmentNameArray;
};

export const getDepartmentNameWithPathArray = (
  departmentIdArray: Array<Array<string>>
): Array<Array<string>> => {
  const departmentNameArray = new Array<Array<string>>();

  departmentIdArray.forEach((departmentIdPath, index) => {
    const _departmentIdPath = new Array<string>();
    departmentIdPath.forEach((element, index) => {
      const departmentId = orgHierarchyRaw.value.find((data) => {
        if (index == 0) {
          return data.divisionid == element;
        }
        if (index == 1) {
          return data.subdivisionid == element;
        }
        if (index == 2) {
          return data.departmentid == element;
        }
        if (index == 3) {
          return data.sectionid == element;
        }
      });

      if (departmentId) {
        if (index == 0) {
          _departmentIdPath.push(departmentId.division);
        }
        if (index == 1) {
          _departmentIdPath.push(departmentId.subdivision);
        }
        if (index == 2) {
          _departmentIdPath.push(departmentId.department);
        }
        if (index == 3) {
          _departmentIdPath.push(departmentId.section);
        }
      }
    });
    if (_departmentIdPath.length > 0) {
      departmentNameArray.push(_departmentIdPath);
    }
  });

  return departmentNameArray;
};

export const getDepartmentNameWithPathString = (
  departmentIdArray: Array<string>
): Array<Array<string>> => {
  const departmentNameArray = new Array<Array<string>>();
  const _departmentIdArray = new Array<Array<string>>();

  // const departmentIdPathArrayParse = departmentIdArray.split("|");
  departmentIdArray.forEach((item) => {
    _departmentIdArray.push(item.split("/"));
  });

  _departmentIdArray.forEach((departmentIdPath, index) => {
    const _departmentIdPath = new Array<string>();
    departmentIdPath.forEach((element, index) => {
      const departmentId = orgHierarchyRaw.value.find((data) => {
        if (index == 0) {
          return data.divisionid == element;
        }
        if (index == 1) {
          return data.subdivisionid == element;
        }
        if (index == 2) {
          return data.departmentid == element;
        }
        if (index == 3) {
          return data.sectionid == element;
        }
      });

      if (departmentId) {
        if (index == 0) {
          _departmentIdPath.push(departmentId.division);
        }
        if (index == 1) {
          _departmentIdPath.push(departmentId.subdivision);
        }
        if (index == 2) {
          _departmentIdPath.push(departmentId.department);
        }
        if (index == 3) {
          _departmentIdPath.push(departmentId.section);
        }
      }
    });
    if (_departmentIdPath.length > 0) {
      departmentNameArray.push(_departmentIdPath);
    }
  });

  return departmentNameArray;
};

export const getDistributionUserArray = (
  returnAttribute: string,
  userArray: Array<string>
): Array<string> => {
  const userNameArray = new Array<string>();
  const fromAttr = returnAttribute == "USERID" ? "USERNAME" : "USERID";
  const toAttr = returnAttribute;
  userArray.forEach((user) => {
    const userName =
      getValueFromGlobalQuery(user, fromAttr, toAttr, userList.value) ?? "";

    userNameArray.push(userName);
  });

  return userNameArray;
};

export const getLatestOrganizationFromStringPath = (organization: string) => {
  const organizationParse = organization.split("/");
  if (organizationParse.length > 0) {
    return organizationParse[organizationParse.length - 1];
  }
  return "";
};

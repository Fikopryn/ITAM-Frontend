import ApiService from "@/core/services/ApiService";
import { getUserInfo } from "@/core/services/UserService";
import type { IGQUser } from "@/schema/IGlobalQuery";
import type { IUserInfo } from "@/schema/IUserInfo";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useR3DataManagementStore = defineStore(
  "r3-data-management",
  () => {
    const url = import.meta.env.VITE_APP_API_URL + "/r3/datamanagement";
    const loading = ref<boolean>(false);
    const loadingOrgHierarchy = ref<boolean>(false);
    const userList = ref<Array<IGQUser>>([]);
    const orgHierarchy = ref<Array<any>>([]);
    const orgHierarchyName = ref<Array<any>>([]);
    const orgHierarchyRaw = ref<Array<any>>([]);
    const currentUserOrganizationWithPath = ref<string>("");
    const getOrgHierarchy = async (orgHierarchy) => {
      loadingOrgHierarchy.value = true;
      const res = await ApiService.query(url + "/cascaderhierarchy", {
        params: {
          Tenant: orgHierarchy.Tenant,
          Division: orgHierarchy.Division,
          Subdivision: orgHierarchy.Subdivision,
          Department: orgHierarchy.Department,
          Section: orgHierarchy.Section,
          Level: orgHierarchy.Level,
        },
      })
        .then(({ data }) => {
          loadingOrgHierarchy.value = false;
          return data.data;
        })
        .catch(() => {
          loadingOrgHierarchy.value = false;
          return {};
        });

      return res;
    };

    const getAllOrgHierarchy = () => {
      loadingOrgHierarchy.value = true;
      getOrgHierarchyStructure();

      ApiService.get(url + "/cascaderraw")
        .then(({ data }) => {
          loadingOrgHierarchy.value = false;
          const res = data.data;

          orgHierarchyRaw.value = res;
        })
        .catch(() => {
          loadingOrgHierarchy.value = false;
        });
    };

    const getOrgHierarchyStructure = (maxLev = 4) => {
      loadingOrgHierarchy.value = true;
      // mode: 0
      ApiService.query(url + "/cascaderfullstructure", {
        params: {
          maxLvl: maxLev,
        },
      })
        .then(({ data }) => {
          loadingOrgHierarchy.value = false;
          const res = data;

          if (res) {
            const resParse = JSON.parse(res);
            orgHierarchy.value = resParse.data;
          }
        })
        .catch(() => {
          loadingOrgHierarchy.value = false;
        });

      // mode: 1
      ApiService.query(url + "/cascaderfullstructure", {
        params: {
          maxLvl: maxLev,
          mode: 1,
        },
      })
        .then(({ data }) => {
          loadingOrgHierarchy.value = false;
          const res = data;

          if (res) {
            const resParse = JSON.parse(res);
            orgHierarchyName.value = resParse.data;
          }
        })
        .catch(() => {
          loadingOrgHierarchy.value = false;
        });
    };

    const getUniqueOrg = (list, key) => {
      return [...new Map(list.map((item) => [item[key], item])).values()];
    };

    const getUserList = () => {
      loading.value = true;
      return ApiService.post(url + "/globalquery", {
        queryid: "49",
        param: [
          {
            paramnumber: 0,
            value: "string",
            type: "string",
          },
        ],
      })
        .then(({ data }) => {
          loading.value = false;
          userList.value = data;
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const setOrgHierarchyName = (orgHierarchy) => {
      const _division: any = getUniqueOrg(orgHierarchy, "divisionid");
      const _subdivision: any = getUniqueOrg(orgHierarchy, "subdivisionid");
      const _department: any = getUniqueOrg(orgHierarchy, "departmentid");
      const _section: any = getUniqueOrg(orgHierarchy, "sectionid");

      const _orgHierarchy = _division.map((element) => {
        const _divisionId = element.divisionid;

        const _hasSubDivision = _subdivision
          .filter((item2) => {
            return item2.divisionid == _divisionId;
          })
          .map((element2) => {
            const _subdivisionId = element2.subdivisionid;
            const _hasDepartment = _department
              .filter((item3) => item3.subdivisionid == _subdivisionId)
              .map((element3) => {
                const _departmentId = element3.departmentid;
                const _hasSection = _section
                  .filter((item4) => item4.depatmentid == _departmentId)
                  .map((element4) => {
                    return {
                      value: element4.department ?? "",
                      label: element4.department ?? "-",
                      disabled: !(
                        element4.department && element4.department != ""
                      ),
                    };
                  });
                return {
                  value: element3.department ?? "",
                  label: element3.department ?? "-",
                  children: _hasSection,
                  disabled: !(element3.department && element3.department != ""),
                };
              });

            return {
              value: element2.subdivision ?? "",
              label: element2.subdivision ?? "-",
              children: _hasDepartment,
              disabled: !(element2.subdivision && element2.subdivision != ""),
            };
          });

        return {
          value: element.division ?? "",
          label: element.division ?? "-",
          children: _hasSubDivision,
          disabled: !(element.division && element.division != ""),
        };
      });

      orgHierarchyName.value = _orgHierarchy;
    };

    const getCurrentUserOrganizationWithPath = async (): Promise<string> => {
      loading.value = false;
      const userId = getUserInfo().userId;
      return await ApiService.post(url + "/globalquery", {
        queryid: "63",
        param: [
          {
            paramnumber: 1,
            value: userId,
            type: "string",
          },
        ],
      })
        .then((res) => {
          loading.value = false;
          if (res.data.length > 0) {
            currentUserOrganizationWithPath.value = res.data[0].ORGNAMEPATH;

            return res.data[0].ORGNAMEPATH ?? "";
          }
        })
        .catch(() => {
          return "";
        })
        .finally(() => {
          loading.value = false;
        });
    };
    return {
      loading,
      loadingOrgHierarchy,
      getUserList,
      getOrgHierarchy,
      getAllOrgHierarchy,
      orgHierarchy,
      orgHierarchyName,
      orgHierarchyRaw,
      userList,
      getCurrentUserOrganizationWithPath,
    };
  }
);

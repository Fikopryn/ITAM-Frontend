import ApiService from "@/core/services/ApiService";
import type { IPagination } from "@/schema/IPagination";
import type { IPeople } from "@/schema/admin-con/IPeople";
import type { AxiosRequestConfig } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePeopleStore = defineStore("people-employee", () => {
  const loading = ref<boolean>(false);
  const url = "";
  const peopleList = ref<IPagination>({
    page: 1,
    length: 10,
    parameters: [{ name: "userId", searchValue: "" }],
    pageInfo: { data: [] },
    order: {
      parameterName: "modifiedDate",
      dir: "desc",
    },
  });
  const peopleDetails = ref<IPeople>({});
  const getPeopleList1 = ref<Array<IPeople>>([]);

  const getPeople = (people?: IPeople) => {
    // begin::Filter
    peopleList.value.parameters[0].searchValue = people?.userName ?? "";
    // begin::Filter

    // retrieve data
    // return ApiService.post(url, [...productCompany.value.parameters])
    //   .then(({ data }) => {
    //     productCompany.value.pageInfo!.data = [...data];
    //   })
    //   .then(() => {
    //     loading.value = false;
    //   });

    peopleList.value.pageInfo!.data = [
      {
        userId: "ARGO.WURYANTO",
        company: "PHI HOLDING",
        empNum: "19251607",
        persNo: "88007147",
        userName: "Argo Wuryanto",
        email: "ARGO.WURYANTO@PERTAMINA.COM",
        idType: "KTP",
        idNumber: "6471032309810008",
        sex: "MALE",
        assignmentType: "PWTT",
        isActive: "1",
        ccid: "2181B1003",
        ccName: "R3 SM SUBSURFACE EXPLORATION AREA 1",
        kbo: "PHI31200",
        kboName: "Subsurface Exploration Area 1",
        posId: "30239585",
        posName: "SR GEOSCIENTIST SUBSURFACE EXPL AREA 1",
        parentPosId: "30239580",
        parentPosName: "SR MANAGER SUBSURFACE EXPLORATION AREA 1",
        parentUserId: "DADAN.RAMDAN",
        function: "SUBSURFACE EXPLORATION AREA 1",
        subFunction: " ",
        sectionId: " ",
        section: " ",
        unitId: " ",
        unitName: " ",
        locCategory: "OFFICE",
        locGroup: "REGIONAL 3",
        areaId: "PHI1",
        areaName: "Upstream Reg 3 Head Office",
        subAreaId: "PHI1",
        subAreaName: "Jakarta",
        backToBack: "KELIK.MOERSIDIN",
      },
      {
        userId: "EDWIN.ANDRIANUS",
        company: "PHI HOLDING",
        empNum: "19012399",
        persNo: "88007150",
        userName: "Edwin Andrianus Juniar",
        email: "EDWIN.ANDRIANUS@PERTAMINA.COM",
        idType: "KTP",
        idNumber: "3273241203860001",
        sex: "MALE",
        assignmentType: "PWTT",
        isActive: "1",
        ccid: "2181B1003",
        ccName: "R3 SM SUBSURFACE EXPLORATION AREA 1",
        kbo: "PHI31200",
        kboName: "Subsurface Exploration Area 1",
        posId: "30239587",
        posName: "SR GEOSCIENTIST SUBSURFACE EXPL AREA 1",
        parentPosId: "30239580",
        parentPosName: "SR MANAGER SUBSURFACE EXPLORATION AREA 1",
        parentUserId: "DADAN.RAMDAN",
        function: "SUBSURFACE EXPLORATION AREA 1",
        subFunction: " ",
        sectionId: " ",
        section: " ",
        unitId: " ",
        unitName: " ",
        locCategory: "OFFICE",
        locGroup: "REGIONAL 3",
        areaId: "PHI1",
        areaName: "Upstream Reg 3 Head Office",
        subAreaId: "PHI1",
        subAreaName: "Jakarta",
        backToBack: "KELIK.MOERSIDIN",
      },
      {
        company: "PERTAMINA HULU MAHAKAM",
        userId: "GILANG.ARIESTYA",
        empNum: "19251596",
        persNo: "19251596",
        userName: "Gilang Ariestya",
        email: "GILANG.ARIESTYA@PERTAMINA.COM",
        idType: "KTP",
        idNumber: "3275092803880005",
        sex: "MALE",
        assignmentType: "PWTT",
        isActive: "1",
        ccid: "2210K700A1",
        ccName: "Z8 Mgr Well Operation,Petrophysics & Dat",
        kbo: "PHI62120",
        kboName: "Well Operation, Petrophysics & Data Mgmt",
        posId: "30240059",
        posName: "SR GGR WELL OPERATIONS & PETROPHYSICS",
        parentPosId: "30240053",
        parentPosName: "MANAGER WELL OPERATION, PETRO.&DATAMGMT",
        parentUserId: "RIO.SITORUS",
        function: "SUBSURFACE DEVELOPMENT & PLANNING",
        subFunction: "WELL OPERATION, PETROPHYSICS & DATA MGMT",
        sectionId: " ",
        section: " ",
        unitId: "10124188",
        unitName: "GGR WELL OPERATIONS & PETROPHYSICS",
        locCategory: "OFFICE",
        locGroup: "ZONA 8",
        areaId: "9500",
        areaName: "Upstream Reg 3 Zona 8 Office",
        subAreaId: "9M02",
        subAreaName: "Balikpapan",
        backToBack: "0",
      },
      {
        company: "PERTAMINA HULU MAHAKAM",
        userId: "MAHENDRA-RIAN.PUTRA",
        empNum: "19251514",
        persNo: "19251514",
        userName: "Mahendra Rian Putra",
        email: "MAHENDRA-RIAN.PUTRA@PERTAMINA.COM",
        idType: "KTP",
        idNumber: "3578130112860005",
        sex: "MALE",
        assignmentType: "PWTT",
        isActive: "1",
        ccid: "2210N100A1",
        ccName: "PHM-SWAMP WLI SPV",
        kbo: "PHI62220",
        kboName: "Well Intervention",
        posId: "30241109",
        posName: "SR SUPERVISOR OFFSHORE WLI OPERATIONS",
        parentPosId: "30241098",
        parentPosName: "ASST. MANAGER OFFSHORE WLI OPERATIONS",
        parentUserId: "RAHADYAN.KUSUMA",
        function: "DRILLING & WELL INTERVENTION",
        subFunction: "WELL INTERVENTION",
        sectionId: "10124462",
        section: "Offshore WLI Operations",
        unitId: "10124464",
        unitName: "OFFSHORE WLI OPERATIONS",
        locCategory: "ONSHORE",
        locGroup: "ZONA 8",
        areaId: "9502",
        areaName: "Upstream Reg 3 Zona 8 Offshore",
        subAreaId: "9M31",
        subAreaName: "Accomdtn Barge",
        backToBack:
          "ARIES.KURNIAWAN/GUGUN.GUNAWAN/IRWAN.SETYAJI/NICO-TAUFIK.HIDAYAT/NIKITA.ADAM",
      },
      {
        company: "PT. ORYX SERVICES",
        userId: "MK.TIURMAULI.ERNITA",
        empNum: "1130000206",
        persNo: " ",
        userName: "Tiurmauli Rahel Ernita",
        email: "MK.TIURMAULI.ERNITA@MITRAKERJA.PERTAMINA.COM",
        idType: " ",
        idNumber: "3275035612980018",
        sex: "FEMALE",
        assignmentType: "TKJP",
        isActive: "1",
        ccid: "2181A1002",
        ccName: "R3 Mgr Planning  & Strategy",
        kbo: "PHI11110",
        kboName: "Planning & Strategy",
        posId: "100001948",
        posName: "TECHNICAL SYSTEM ADMIN",
        parentPosId: "30283720",
        parentPosName: "SR ANALYST PORTFOLIO",
        parentUserId: "MELINDA.CAROLINE",
        function: "STRATEGIC PLANNING",
        subFunction: "PLANNING & STRATEGY",
        sectionId: " ",
        section: " ",
        unitId: "10145367",
        unitName: "ANALYST PORTFOLIO",
        locCategory: "OFFICE",
        locGroup: "REGIONAL 3",
        areaId: "PHI1",
        areaName: "Upstream Reg 3 Head Office",
        subAreaId: "PHI1",
        subAreaName: "Jakarta",
        backToBack: " ",
      },
      {
        company: "PERTAMINA HULU MAHAKAM",
        userId: "RANI.HERESPATIAGNI",
        empNum: "19250259",
        persNo: "19250259",
        userName: "Rani Herespatiagni",
        email: "RANI.HERESPATIAGNI@PERTAMINA.COM",
        idType: "KTP",
        idNumber: "1802075406790008",
        sex: "FEMALE",
        assignmentType: "PWTT",
        isActive: "1",
        ccid: "2210H000A1",
        ccName: "Z8 MGR HSSE OPERATIONS ZONA 8",
        kbo: "PHI60410",
        kboName: "HSSE Operations Zona 8",
        posId: "30239960",
        posName: "ASST. MANAGER HEALTH",
        parentPosId: "30239958",
        parentPosName: "MANAGER HSSE OPERATIONS ZONA 8",
        parentUserId: "ROMY-IRVAN.PRASETYO",
        function: "HSSE OPERATIONS ZONA 8",
        subFunction: " ",
        sectionId: "10124159",
        section: "Health",
        unitId: " ",
        unitName: " ",
        locCategory: "OFFICE",
        locGroup: "ZONA 8",
        areaId: "9500",
        areaName: "Upstream Reg 3 Zona 8 Office",
        subAreaId: "9M02",
        subAreaName: "Balikpapan",
        backToBack: "0",
      },
    ] as unknown as Array<IPeople>;
  };

  const savePeople = (people?: IPeople) => {
    // save API
    people!.empNum;
    loading.value = true;
    return ApiService.post(url + "save", people)
      .then(({ data }) => {
        // update old data
        peopleDetails.value = { ...data };
      })
      .then(() => {
        loading.value = false;
      });
  };

  const getPeopleList = () => {
    loading.value = true;
    return ApiService.get(
      import.meta.env.VITE_APP_API_URL + "/Employee/All-Data"
    )
      .then(({ data }) => {
        getPeopleList1.value = data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const updatePeople = (data): Promise<boolean> => {
    loading.value = true;
    const params: AxiosRequestConfig = { ...data };
    return ApiService.put(
      import.meta.env.VITE_APP_API_URL + "/Employee/Update",
      params
    )
      .then((rest) => {
        if (rest.status == 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const createPeople = (data): Promise<boolean> => {
    loading.value = true;
    const params: AxiosRequestConfig = { ...data };
    return ApiService.post(
      import.meta.env.VITE_APP_API_URL + "/Employee/create",
      params
    )
      .then((rest) => {
        if (rest.status == 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return {
    loading,
    peopleList,
    getPeople,
    getPeopleList1,
    getPeopleList,
    createPeople,
    savePeople,
    updatePeople,
    peopleDetails,
  };
});

import type { ITableHeader } from "@/schema/ITableHeader";
import type { IPeople } from "@/schema/admin-con/IPeople";
import { computed, defineComponent, onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getMediaPath } from "@/core/helpers/assets";
import { getValueFromList } from "@/core/helpers/common";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { formatDate } from "@/core/helpers/common";
import type { ILov } from "@/schema/ILov";
import { usePeopleStore } from "@/stores/adminCon/people";
import { successPopUp } from "@/core/helpers/popup";
export default defineComponent({
  name: "people-employee",
  components: { Datatable },
  setup() {
    const peopleStore = usePeopleStore();

    const loading = ref<boolean>(false);
    const loadingFilter = computed(() => peopleStore.loading);

    const isFieldEdit = ref<boolean>(false);
    const filter = ref<any>({});
    const peopleHeader = ref<Array<ITableHeader>>([
      {
        columnName: "Company",
        columnLabel: "company",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "User Id",
        columnLabel: "userId",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Employee Number",
        columnLabel: "empNum",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Personal Number ",
        columnLabel: "persNo",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Username ",
        columnLabel: "userName",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Email",
        columnLabel: "email",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "ID Type",
        columnLabel: "idType",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "ID Number",
        columnLabel: "idNumber",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Sex",
        columnLabel: "sex",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Assignment Type",
        columnLabel: "assignmentType",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Is Active",
        columnLabel: "isActive",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "CCID",
        columnLabel: "ccid",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "CC Name",
        columnLabel: "ccName",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "KBO",
        columnLabel: "kbo",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "KBO Name",
        columnLabel: "kboName",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Position ID",
        columnLabel: "posId",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Position Name",
        columnLabel: "posName",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Parent Position ID",
        columnLabel: "parentPosId",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Parent Position Name",
        columnLabel: "parentPosName",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Parent User ID",
        columnLabel: "parentUserId",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Function",
        columnLabel: "function",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Sub Function",
        columnLabel: "subFunction",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Section ID",
        columnLabel: "sectionId",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Section",
        columnLabel: "section",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Unit ID",
        columnLabel: "unitId",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Unit Name",
        columnLabel: "unitName",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Location Category",
        columnLabel: "locCategory",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Location Group",
        columnLabel: "locGroup",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Area ID",
        columnLabel: "areaId",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Area Name",
        columnLabel: "areaName",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Sub Area ID",
        columnLabel: "subAreaId",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Sub Area Name",
        columnLabel: "subAreaName",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Back To Back",
        columnLabel: "backToBack",
        sortEnabled: true,
      },
    ]);
    const peopleRules = ref({
      userId: [
        {
          required: true,
          message: "User ID is required",
          trigger: "focus",
        },
      ],
    });

    const peopleFormRef = ref<null | HTMLFormElement>(null);
    const listOfSample = ref<Array<ILov>>([
      {
        lovKey: "company",
        lovValue: "PHM",
      },
    ]);

    const peopleDetails = computed({
      get: () =>
        ref<IPeople>({
          ...peopleStore.peopleDetails,
        }).value,
      set: (val) => {
        peopleStore.peopleDetails = val;
      },
    });

    const peopleList = computed(
      () => ref<Array<IPeople>>([...(peopleStore.getPeopleList1 ?? [])]).value
    );

    const peoplePageInfo = computed(() => peopleStore.peopleList);

    onMounted(() => {
      getPeople();
      getPeopleList();
    });

    const getPeopleList = () => {
      peopleStore.getPeopleList();
    };

    const getPeople = () => {
      peopleStore.getPeople();
    };

    const onSave = () => {
      peopleFormRef.value!.validate(async (valid) => {
        if (valid) {
          if (peopleDetails.value.userId) {
            const rest = await peopleStore.updatePeople(peopleDetails.value);
            if (rest == true) {
              successPopUp({ desc: "Berhasil Update Data" });
              getPeople();
            }
          } else {
            const rest = await peopleStore.createPeople(peopleDetails.value);
            if (rest == true) {
              successPopUp({ desc: "Berhasil Menyimpan Data" });
              getPeopleList();
            }
          }

          //assetStatusStore.saveAssetStatus(assetStatusDetails.value);
        }
      });
    };

    const onClear = () => {
      peopleDetails.value = {};
      peopleFormRef.value!.resetFields();
    };

    const onSearch = () => {
      peopleStore.getPeople(peopleDetails.value);
    };

    const onEdit = (purchaseType: IPeople) => {
      peopleDetails.value = { ...purchaseType };
    };

    return {
      listOfSample,
      loading,
      isFieldEdit,
      peopleHeader,
      peopleList,
      peopleDetails,
      peopleRules,
      peopleFormRef,
      onSave,
      onSearch,
      onClear,
      Search,
      getMediaPath,
      loadingFilter,
      filter,
      getValueFromList,
      formatDate,
      peoplePageInfo,
      onEdit,
    };
  },
});

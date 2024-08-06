import { formatDatetime } from "@/core/helpers/common";
import { computed, defineComponent, ref, watch } from "vue";
import { getMediaPath } from "@/core/helpers/assets";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import EmptyData from "@/components/data-state/EmptyData.vue";
import type { IAuditTrailActivities } from "@/schema/IAuditTrailActivities";
import type { IGQUser } from "@/schema/IGlobalQuery";
import ModalCurrentAssignment from "./components/modal-current-assignment/ModalCurrentAssignment.vue";
import type { ITenant } from "@/schema/ITenant";
import { useActivityStore } from "@/stores/activity";
import type { ITableHeader } from "@/schema/ITableHeader";

export default defineComponent({
  name: "activity-log",
  components: { ModalCurrentAssignment, EmptyData, Datatable },
  props: {
    loading: { type: Boolean, default: false },
    moduleId: { type: String, default: "" },
    moduleName: { type: String, default: "" },
    moduleStatus: { type: String, default: "" },
    logType: {
      type: String as () => "COMMENT" | "DETAILS",
      default: "COMMENT",
    },
    tenants: { type: Array<ITenant>, default: () => [] },
  },
  emits: ["current-assignment"],
  setup(props, { emit }) {
    const loadingData = ref<boolean>(false);
    const isShowAll = ref<boolean>(true);
    const activityStore = useActivityStore();
    const currentAssignment = ref<Array<IGQUser>>([]);
    const logActivity = ref<Array<IAuditTrailActivities>>([]);
    const activityDetailsHeader = ref<Array<ITableHeader>>([
      {
        columnName: "Revision",
        columnLabel: "revision",
        sortEnabled: false,
      },
      {
        columnName: "Column",
        columnLabel: "column",
        columnWidth: "120",
        sortEnabled: false,
      },
      {
        columnName: "Before",
        columnLabel: "before",
        columnWidth: "120",
        sortEnabled: false,
      },
      {
        columnName: "After",
        columnLabel: "after",
        columnWidth: "120",
        sortEnabled: false,
      },
    ]);
    const previewCurrentAssignment = computed({
      get: () => {
        if (isShowAll.value) {
          return currentAssignment.value.slice(0, 2);
        } else {
          return currentAssignment.value;
        }
      },
      set: (_) => {},
    });
    /* --------------------------- begin::Sample data --------------------------- */
    logActivity.value = [
      {
        activityNumber: 36740,
        modulName: "REPO",
        modulId: "2df12375-efe2-406a-aee4-f825e67486c0",
        userId: "MK.CHURIN.HASYIM",
        userName: "Churin Ain Hasyim",
        action: "REVISED",
        timestamp: "2023-12-08T15:05:51.77",
        remarks: "Belum menggunakan data terbaru",
        details: [
          {
            revision: "02",
            column: "Amount",
            before: "USD 300,000,000.00",
            after: "USD 350,000,000.00",
          },
          {
            revision: "02",
            column: "Capital Expenditure",
            before: "USD 300,000,000.00",
            after: "USD 350,000,000.00",
          },
          {
            revision: "02",
            column: "Non-Capital Expenditure",
            before: "USD 300,000,000.00",
            after: "USD 350,000,000.00",
          },
        ],
      },
      {
        activityNumber: 36739,
        modulName: "REPO",
        modulId: "2df12375-efe2-406a-aee4-f825e67486c0",
        userId: "sebastian.alber",
        userName: "Sebastian Albert",
        action: "WAPPRBUDGET",
        timestamp: "2023-12-08T15:05:51.41",
        remarks:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quisquam minus debitis maiores pariatur excepturi, porro non numquam. Blanditiis obcaecati iusto impedit, unde expedita velit nesciunt ex harum repudiandae nisi.",
      },
      {
        activityNumber: 36736,
        modulName: "REPO",
        modulId: "2df12375-efe2-406a-aee4-f825e67486c0",
        userId: "MK.CHURIN.HASYIM",
        userName: "Churin Ain Hasyim",
        action: "DRAFT",
        timestamp: "2023-12-08T15:05:45.76",
        remarks: "test",
        details: [
          {
            revision: "02",
            column: "Amount",
            before: "USD 200,000,000.00",
            after: "USD 250,000,000.00",
          },
          {
            revision: "02",
            column: "Capital Expenditure",
            before: "USD 200,000,000.00",
            after: "USD 250,000,000.00",
          },
          {
            revision: "02",
            column: "Non-Capital Expenditure",
            before: "USD 200,000,000.00",
            after: "USD 250,000,000.00",
          },
        ],
      },
    ];
    currentAssignment.value = [
      {
        "@num": "5",
        SYSROLE:
          "VALIDATORCAP_Z10_T2191, VALIDATOR_R3HO_T2181, VALIDATOR_Z10_T2191",
        USERID: "R3TEST.MGR",
        USERNAME: "TEST ERIK3",
        EMAIL: "R3TEST.ASMGR@PERTAMINA.COM",
        ORGNAMEPATH:
          "Zona 10/-/HSSE Operations/HSSE Performance, Assurance & ERCM",
      },
      {
        "@num": "44",
        SYSROLE: "VALIDATORCAP_Z10_T2191, VALIDATOR_Z10_T2191",
        USERID: "MK.ROSA.ELVANDARY",
        USERNAME: "Rosa Elvandary",
        EMAIL: "MK.ROSA.ELVANDARY@PERTAMINA.COM",
        ORGNAMEPATH:
          "Zona 10/-/HSSE Operations/HSSE Performance, Assurance & ERCM",
      },
      {
        "@num": "45",
        SYSROLE: "VALIDATORCAP_Z10_T2191, VALIDATOR_Z10_T2191",
        USERID: "MK.ALIROHMANSYAH",
        USERNAME: "Ali Rohmansyah",
        EMAIL: "MK.ALIROHMANSYAH@PERTAMINA.COM",
        ORGNAMEPATH:
          "Zona 10/-/HSSE Operations/HSSE Performance, Assurance & ERCM",
      },
    ];
    /* --------------------------- end::Sample data --------------------------- */

    watch(
      () => props.moduleStatus,
      (val) => {
        activityStore.getCurrentAssignment({
          moduleId: props.moduleId,
          moduleName: props.moduleName,
          moduleStatus: val,
          tenants: props.tenants,
        });
      }
    );

    watch(
      () =>
        props.moduleId ||
        props.moduleName ||
        props.moduleStatus ||
        props.tenants,
      () => {
        if (props.moduleName && props.moduleId) {
          activityStore.getAuditTrailActivities({
            moduleName: props.moduleName,
            moduleId: props.moduleId,
          });
        }
        if (props.moduleName && props.moduleStatus && props.tenants) {
          activityStore.getCurrentAssignment({
            moduleId: props.moduleId,
            moduleName: props.moduleName,
            moduleStatus: props.moduleStatus,
            tenants: props.tenants,
          });
        }
      }
    );

    watch(
      () => props.loading,
      (val) => {
        loadingData.value = val;
      }
    );

    watch(
      () => activityStore.loading,
      (val) => {
        loadingData.value = val;
      }
    );

    watch(
      () => activityStore.currentAssignment,
      (val) => {
        currentAssignment.value = [...val];
        emit("current-assignment", currentAssignment.value);
      }
    );

    watch(
      () => activityStore.auditTrailActivities,
      (val) => {
        logActivity.value = [...val];
      }
    );
    const logColor = (id) => {
      const badgeColor = "";

      return badgeColor;
    };

    const showAll = (val) => {
      isShowAll.value = !val;
    };

    return {
      getMediaPath,
      formatDatetime,
      previewCurrentAssignment,
      isShowAll,
      showAll,
      activityDetailsHeader,
      currentAssignment,
      logActivity,
      logColor,
      loadingData,
    };
  },
});

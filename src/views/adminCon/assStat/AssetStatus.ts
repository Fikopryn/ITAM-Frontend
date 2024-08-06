import type { ITableHeader } from "@/schema/ITableHeader";
import type { IAssetStatus } from "@/schema/admin-con/IAssetStat";
import { computed, defineComponent, onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getMediaPath } from "@/core/helpers/assets";
import { getValueFromList } from "@/core/helpers/common";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { formatDate } from "@/core/helpers/common";
import type { ILov } from "@/schema/ILov";
import { useAssetStatusStore } from "@/stores/adminCon/assetStatus";
import { successPopUp } from "@/core/helpers/popup";
export default defineComponent({
  name: "asset-status",
  components: { Datatable },
  setup() {
    const assetStatusStore = useAssetStatusStore();

    const loading = ref<boolean>(false);
    const loadingFilter = computed(() => assetStatusStore.loading);

    const isFieldEdit = ref<boolean>(false);
    const filter = ref<any>({});
    const assetStatusHeader = ref<Array<ITableHeader>>([
      {
        columnName: "Asset Status ID",
        columnLabel: "assetStatusId",
        sortEnabled: true,
      },
      {
        columnName: "Asset Status Name",
        columnLabel: "assetStatus1",
        sortEnabled: true,
      },
      {
        columnName: "Asset  Status Description",
        columnLabel: "assetStatusDescription",
        columnWidth: "300",
        sortEnabled: true,
      },
      {
        columnName: "Modified By",
        columnLabel: "modifiedBy",
        sortEnabled: true,
      },
      {
        columnName: "Last Modified date",
        columnLabel: "lastModifiedDate",
        sortEnabled: true,
      },
      {
        columnName: "Association Status",
        columnLabel: "associationStatus",
        sortEnabled: true,
      },
    ]);
    const assetStatusRules = ref({
      // assetStatusId: [
      //   {
      //     required: true,
      //     message: "assetStatusId is required",
      //     trigger: "focus",
      //   },
      // ],
      assetStatus1: [
        {
          required: true,
          message: "Asset Status Name is required",
          trigger: "focus",
        },
      ],
      assetStatusDescription: [
        {
          required: true,
          message: "Asset Status Description is required",
          trigger: "focus",
        },
      ],
      associationStatus: [
        {
          required: true,
          message: "Association Status is required",
          trigger: "focus",
        },
      ],
    });

    const assetStatusFormRef = ref<null | HTMLFormElement>(null);
    const listOfSample = ref<Array<ILov>>([
      { lovKey: "test", lovValue: "COmpany Sample 1" },
    ]);

    const assetStatusDetails = computed({
      get: () =>
        ref<IAssetStatus>({ ...assetStatusStore.assetStatusDetails }).value,
      set: (val) => {
        assetStatusStore.assetStatusDetails = val;
      },
    });
    const assetStatusList = computed(
      () =>
        ref<Array<IAssetStatus>>([
          ...(assetStatusStore.getAssetStatusList1 ?? []),
        ]).value
    );
    const assetStatusPageInfo = computed(
      () => assetStatusStore.assetStatusList
    );

    onMounted(() => {
      getAssetStatus();
      getAssetStatusList();
    });
    const getAssetStatusList = () => {
      assetStatusStore.getAssetStatusList();
    };

    const getAssetStatus = () => {
      assetStatusStore.getAssetStatus();
    };

    const onSave = () => {
      assetStatusFormRef.value!.validate(async (valid) => {
        if (valid) {
          if (assetStatusDetails.value.assetStatusId) {
            const rest = await assetStatusStore.updateAssetStatus(
              assetStatusDetails.value
            );
            if (rest == true) {
              successPopUp({ desc: "Berhasil Update Data" });
              getAssetStatusList();
            }
          } else {
            const rest = await assetStatusStore.createAssetStatus(
              assetStatusDetails.value
            );
            if (rest == true) {
              successPopUp({ desc: "Berhasil Menyimpan Data" });
              getAssetStatusList();
            }
          }

          //assetStatusStore.saveAssetStatus(assetStatusDetails.value);
        }
      });
    };
    const onClear = () => {
      assetStatusDetails.value = {};
      assetStatusFormRef.value!.resetFields();
    };
    const onSearch = () => {
      assetStatusStore.getAssetStatus(assetStatusDetails.value);
    };
    const onEdit = (assetStatus: IAssetStatus) => {
      assetStatusDetails.value = { ...assetStatus };
    };
    return {
      listOfSample,
      loading,
      isFieldEdit,
      assetStatusHeader,
      assetStatusList,
      assetStatusDetails,
      assetStatusRules,
      assetStatusFormRef,
      onSave,
      onSearch,
      onClear,
      Search,
      getMediaPath,
      loadingFilter,
      filter,
      getValueFromList,
      formatDate,
      assetStatusPageInfo,
      onEdit,
    };
  },
});

import type { ITableHeader } from "@/schema/ITableHeader";
import type { IAssetStatusFinance } from "@/schema/admin-con/IAssetStatusFinance";
import { computed, defineComponent, onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getMediaPath } from "@/core/helpers/assets";
import { getValueFromList } from "@/core/helpers/common";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { formatDate } from "@/core/helpers/common";
import type { ILov } from "@/schema/ILov";
import { useAssetStatusFinanceStore } from "@/stores/adminCon/assetStatusFinance";
import { successPopUp } from "@/core/helpers/popup";
export default defineComponent({
  name: "asset-status-finance",
  components: { Datatable },
  setup() {
    const assetStatusFinanceStore = useAssetStatusFinanceStore();

    const loading = ref<boolean>(false);
    const loadingFilter = computed(() => assetStatusFinanceStore.loading);

    const isFieldEdit = ref<boolean>(false);
    const filter = ref<any>({});
    const assetStatusFinanceHeader = ref<Array<ITableHeader>>([
      {
        columnName: "Asset Status Finance ID",
        columnLabel: "assetStatusFinId",
        sortEnabled: true,
      },
      {
        columnName: "Asset Status Finance Name",
        columnLabel: "assetStatusFin1",
        sortEnabled: true,
      },
      {
        columnName: "Asset Status Finance Description",
        columnLabel: "assetStatusFinDesc",
        columnWidth: "300",
        sortEnabled: true,
      },
      {
        columnName: "Association Status",
        columnLabel: "associationStatus",
        sortEnabled: true,
      },
      {
        columnName: "last Modified date",
        columnLabel: "lastModifiedDate",
        sortEnabled: true,
      },
      {
        columnName: "Modified By",
        columnLabel: "modifiedBy",
        sortEnabled: true,
      },
    ]);
    const assetStatusFinanceRules = ref({
      // assetStatusFinId: [
      //   {
      //     required: true,
      //     message: "ID is required",
      //     trigger: "focus",
      //   },
      // ],
      assetStatusFin1: [
        {
          required: true,
          message: "Name is required",
          trigger: "focus",
        },
      ],
      assetStatusFinDesc: [
        {
          required: true,
          message: "Description is required",
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

    const assetStatusFinanceFormRef = ref<null | HTMLFormElement>(null);
    const listOfSample = ref<Array<ILov>>([
      { lovKey: "test", lovValue: "PHM" },
      { lovKey: "test", lovValue: "PHKT" },
      { lovKey: "test", lovValue: "PHSS" },
      { lovKey: "test", lovValue: "PHI" },
    ]);

    const assetStatusFinanceDetails = computed({
      get: () =>
        ref<IAssetStatusFinance>({
          ...assetStatusFinanceStore.assetStatusFinanceDetails,
        }).value,
      set: (val) => {
        assetStatusFinanceStore.assetStatusFinanceDetails = val;
      },
    });
    const assetStatusFinanceList = computed(
      () =>
        ref<Array<IAssetStatusFinance>>([
          ...(assetStatusFinanceStore.getAssetStatusFinanceList1 ?? []),
        ]).value
    );
    const assetStatusFinancePageInfo = computed(
      () => assetStatusFinanceStore.assetStatusFinanceList
    );

    onMounted(() => {
      getAssetStatusFinance();
      getAssetStatusFinanceList();
    });

    const getAssetStatusFinanceList = () => {
      assetStatusFinanceStore.getAssetStatusFinanceList();
    };

    const getAssetStatusFinance = () => {
      assetStatusFinanceStore.getAssetStatusFinance();
    };

    const onSave = () => {
      assetStatusFinanceFormRef.value!.validate(async (valid) => {
        if (valid) {
          if (assetStatusFinanceDetails.value.assetStatusFinId) {
            const rest = await assetStatusFinanceStore.updateAssetStatusFinance(
              assetStatusFinanceDetails.value
            );
            if (rest == true) {
              successPopUp({ desc: "Berhasil Update Data" });
              getAssetStatusFinance();
            }
          } else {
            const rest = await assetStatusFinanceStore.createAssetStatusFinance(
              assetStatusFinanceDetails.value
            );
            if (rest == true) {
              successPopUp({ desc: "Berhasil Menyimpan Data" });
              getAssetStatusFinanceList();
            }
          }

          //assetStatusStore.saveAssetStatus(assetStatusDetails.value);
        }
      });
    };
    const onClear = () => {
      assetStatusFinanceDetails.value = {};
      assetStatusFinanceFormRef.value!.resetFields();
    };
    const onSearch = () => {
      assetStatusFinanceStore.getAssetStatusFinance(
        assetStatusFinanceDetails.value
      );
    };
    const onEdit = (assetStatusFinance: IAssetStatusFinance) => {
      assetStatusFinanceDetails.value = { ...assetStatusFinance };
    };
    return {
      listOfSample,
      loading,
      isFieldEdit,
      assetStatusFinanceHeader,
      assetStatusFinanceList,
      assetStatusFinanceDetails,
      assetStatusFinanceRules,
      assetStatusFinanceFormRef,
      onSave,
      onSearch,
      onClear,
      Search,
      getMediaPath,
      loadingFilter,
      filter,
      getValueFromList,
      formatDate,
      assetStatusFinancePageInfo,
      onEdit,
    };
  },
});

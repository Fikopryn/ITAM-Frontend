import type { ITableHeader } from "@/schema/ITableHeader";
import type { IPurchaseType } from "@/schema/admin-con/IPurchaseType";
import { computed, defineComponent, onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getMediaPath } from "@/core/helpers/assets";
import { getValueFromList } from "@/core/helpers/common";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { formatDate } from "@/core/helpers/common";
import type { ILov } from "@/schema/ILov";
import { usePurchaseTypeStore } from "@/stores/adminCon/purchaseType";
export default defineComponent({
  name: "purchase-type",
  components: { Datatable },
  setup() {
    const purchaseTypeStore = usePurchaseTypeStore();

    const loading = ref<boolean>(false);
    const loadingFilter = ref<boolean>(false);

    const isFieldEdit = ref<boolean>(false);
    const filter = ref<any>({});
    const purchaseTypeHeader = ref<Array<ITableHeader>>([
      {
        columnName: "Purchasing Type ID",
        columnLabel: "purchasingTypeId",
        sortEnabled: true,
      },
      {
        columnName: "Purchasing Type Name",
        columnLabel: "purchasingTypeName",
        sortEnabled: true,
      },
      {
        columnName: "Purchasing Type Description ",
        columnLabel: "purchasingTypeDescription",
        columnWidth: "300",
        sortEnabled: true,
      },
      {
        columnName: "Modified By",
        columnLabel: "modifiedBy",
        sortEnabled: true,
      },
      {
        columnName: "last Modified Date",
        columnLabel: "lastModifiedDate",
        sortEnabled: true,
      },
      {
        columnName: "Association Status",
        columnLabel: "associationStatus",
        sortEnabled: true,
      },
    ]);
    const purchaseTypeRules = ref({
      purchasingTypeId: [
        {
          required: true,
          message: "Purchasing Type ID is required",
          trigger: "focus",
        },
      ],
      purchasingTypeName: [
        {
          required: true,
          message: "Purchasing Type Name is required",
          trigger: "focus",
        },
      ],
      purchasingTypeDescription: [
        {
          required: true,
          message: "Purchasing Type Desc is required",
          trigger: "focus",
        },
      ],
      associationStatus: [
        {
          required: true,
          message: "Asscociation Status is required",
          trigger: "focus",
        },
      ],
    });

    const purchaseTypeFormRef = ref<null | HTMLFormElement>(null);
    const listOfSample = ref<Array<ILov>>([
      { lovKey: "test", lovValue: "COmpany Sample 1" },
    ]);

    const purchaseTypeDetails = computed({
      get: () =>
        ref<IPurchaseType>({ ...purchaseTypeStore.purchaseTypeDetails }).value,
      set: (val) => {
        purchaseTypeStore.purchaseTypeDetails = val;
      },
    });
    const purchaseTypeList = computed(
      () =>
        ref<Array<IPurchaseType>>([
          ...(purchaseTypeStore.purchaseTypeList.pageInfo?.data ?? []),
        ]).value
    );
    const purchaseTypePageInfo = computed(
      () => purchaseTypeStore.purchaseTypeList
    );

    onMounted(() => {
      getPurchaseType();
    });

    const getPurchaseType = () => {
      purchaseTypeStore.getPurchaseType();
    };

    const onSave = () => {
      purchaseTypeFormRef.value!.validate((valid) => {
        if (valid) {
          purchaseTypeStore.savePurchaseType(purchaseTypeDetails.value);
        }
      });
    };
    const onClear = () => {
      purchaseTypeDetails.value = {};
      purchaseTypeFormRef.value!.resetFields();
    };
    const onSearch = () => {
      purchaseTypeStore.getPurchaseType(purchaseTypeDetails.value);
    };
    const onEdit = (purchaseType: IPurchaseType) => {
      purchaseTypeDetails.value = { ...purchaseType };
    };
    return {
      listOfSample,
      loading,
      isFieldEdit,
      purchaseTypeHeader,
      purchaseTypeList,
      purchaseTypeDetails,
      purchaseTypeRules,
      purchaseTypeFormRef,
      onSave,
      onSearch,
      onClear,
      Search,
      getMediaPath,
      loadingFilter,
      filter,
      getValueFromList,
      formatDate,
      purchaseTypePageInfo,
      onEdit,
    };
  },
});

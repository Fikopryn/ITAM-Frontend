import type { ITableHeader } from "@/schema/ITableHeader";
import type { IAssetRegistration } from "@/schema/asset-man-con/IAssetRegistration";
import { computed, defineComponent, onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getMediaPath } from "@/core/helpers/assets";
import { getValueFromList } from "@/core/helpers/common";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { formatDate } from "@/core/helpers/common";
import type { ILov } from "@/schema/ILov";
import { useAssetRegistrationStore } from "@/stores/assetManCon/assetRegistration";
export default defineComponent({
  name: "asset-registration",
  components: { Datatable },
  setup() {
    const assetRegistrationStore = useAssetRegistrationStore();

    const loading = ref<boolean>(false);
    const loadingFilter = ref<boolean>(false);

    const isFieldEdit = ref<boolean>(false);
    const filter = ref<any>({});
    const assetRegistrationHeader = ref<Array<ITableHeader>>([
      {
        columnName: "Company",
        columnLabel: "company",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Delivery Order",
        columnLabel: "deliveryOrder",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Delivery Order Date",
        columnLabel: "deliveryOrderDate",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Received Date",
        columnLabel: "receivedDate",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Supplier Name",
        columnLabel: "lastModifiedDate",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Contract",
        columnLabel: "contract",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Purchase Order",
        columnLabel: "purchaseOrder",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Invoice",
        columnLabel: "invoice",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Puchase Type",
        columnLabel: "purchaseType",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Acquistion Price",
        columnLabel: "acquistionPrice",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Lease Price",
        columnLabel: "leasePrice",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Last Modified Date",
        columnLabel: "lastModifiedDate",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Modified By",
        columnLabel: "modifiedBy",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Product Name",
        columnLabel: "productName",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Qty",
        columnLabel: "qty",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Unit",
        columnLabel: "unit",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Additional Info",
        columnLabel: "additionalInfo",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Document",
        columnLabel: "document",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Asset Site",
        columnLabel: "assetSite",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Building",
        columnLabel: "building",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Floor Room",
        columnLabel: "floorRoom",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Asset Status",
        columnLabel: "assetStatus",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Asset Status Finance",
        columnLabel: "assetStatusFinance",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Asset Knowledgement",
        columnLabel: "assetKnowledgement",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Association Status",
        columnLabel: "associationStatus",
        columnWidth: "160",
        sortEnabled: true,
      },
    ]);
    const assetRegistrationRules = ref({
      productName: [
        {
          required: true,
          message: "Product Name is required",
          trigger: "focus",
        },
      ],
    });

    const assetRegistrationFormRef = ref<null | HTMLFormElement>(null);
    const listOfSample = ref<Array<ILov>>([
      { lovKey: "test", lovValue: "PHM" },
    ]);

    const assetRegistrationDetails = computed({
      get: () =>
        ref<IAssetRegistration>({
          ...assetRegistrationStore.assetRegistrationDetails,
        }).value,
      set: (val) => {
        assetRegistrationStore.assetRegistrationDetails = val;
      },
    });
    const assetRegistrationList = computed(
      () =>
        ref<Array<IAssetRegistration>>([
          ...(assetRegistrationStore.assetRegistrationList.pageInfo?.data ??
            []),
        ]).value
    );
    const assetRegistrationPageInfo = computed(
      () => assetRegistrationStore.assetRegistrationList
    );

    onMounted(() => {
      getAssetRegistration();
    });

    const getAssetRegistration = () => {
      assetRegistrationStore.getAssetRegistration();
    };

    const onSave = () => {
      assetRegistrationFormRef.value!.validate((valid) => {
        if (valid) {
          assetRegistrationStore.saveAssetRegistration(
            assetRegistrationDetails.value
          );
        }
      });
    };
    const onClear = () => {
      assetRegistrationDetails.value = {};
      assetRegistrationFormRef.value!.resetFields();
    };
    const onSearch = () => {
      assetRegistrationStore.getAssetRegistration(
        assetRegistrationDetails.value
      );
    };
    const onEdit = (Company: IAssetRegistration) => {
      assetRegistrationDetails.value = { ...Company };
    };

    const parser = (value) => value.replace("/IDRs?|(,*)/g, ");

    const formatter = (value) =>
      `IDR ${value}`.replace("/B(?=(d{3})+(?!d))/g", ",");
    //Manggil di Vue
    //(:formatter="formatter"
    //:parser="parser"

    return {
      parser,
      formatter,
      listOfSample,
      loading,
      isFieldEdit,
      assetRegistrationHeader,
      assetRegistrationList,
      assetRegistrationDetails,
      assetRegistrationRules,
      assetRegistrationFormRef,
      onSave,
      onSearch,
      onClear,
      Search,
      getMediaPath,
      loadingFilter,
      filter,
      getValueFromList,
      formatDate,
      assetRegistrationPageInfo,
      onEdit,
    };
  },
});

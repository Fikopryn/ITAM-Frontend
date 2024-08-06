import type { ITableHeader } from "@/schema/ITableHeader";
import type { IProductCatalog } from "@/schema/admin-con/IProductCatalog";
import { computed, defineComponent, onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getMediaPath } from "@/core/helpers/assets";
import { getValueFromList } from "@/core/helpers/common";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { formatDate } from "@/core/helpers/common";
import type { ILov } from "@/schema/ILov";
import { useProductCatalog1Store } from "@/stores/adminCon/productCatalog1";
import { successPopUp } from "@/core/helpers/popup";
export default defineComponent({
  name: "product-catalog1",
  components: { Datatable },
  setup() {
    const productCatalog1store = useProductCatalog1Store();

    const loading = ref<boolean>(false);
    const loadingFilter = computed(() => productCatalog1store.loading);

    const isFieldEdit = ref<boolean>(false);
    const filter = ref<any>({});
    const productCatalogHeader = ref<Array<ITableHeader>>([
      {
        columnName: "Product Catalog Id",
        columnLabel: "productCatalogId",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Company",
        columnLabel: "companyId",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Product Category 1",
        columnLabel: "prodCatTier1",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Product Category 2",
        columnLabel: "prodCatTier2",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Product Category 3",
        columnLabel: "prodCatTier3",
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
        columnName: "Manufacturer",
        columnLabel: "manufacturer",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Model/Version",
        columnLabel: "modelVersion",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Product Number",
        columnLabel: "productNumber",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Association Status",
        columnLabel: "prodCatStatus",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Additional Information",
        columnLabel: "additionalInfo",
        columnWidth: "160",
        columnMaxWidth: "140",
        sortEnabled: true,
      },
      {
        columnName: "Last Modified Date",
        columnLabel: "lastModifiedDate",
        columnWidth: "120",
        columnMaxWidth: "150",
        sortEnabled: true,
      },
      {
        columnName: "Modified by",
        columnLabel: "modifiedBy",
        columnWidth: "140",
        columnMaxWidth: "140",
        sortEnabled: true,
      },
    ]);
    const productCatalogRules = ref({
      // assetStatusFinId: [
      //   {
      //     required: true,
      //     message: "ID is required",
      //     trigger: "focus",
      //   },
      // ],
      companyId: [
        {
          required: true,
          message: "Company is required",
          trigger: "focus",
        },
      ],
      prodCatTier1: [
        {
          required: true,
          message: "Product Category Tier 1 is required",
          trigger: "focus",
        },
      ],
      prodCatTier2: [
        {
          required: true,
          message: "Product Category Tier 2 is required",
          trigger: "focus",
        },
      ],
      prodCatTier3: [
        {
          required: true,
          message: "Product Category Tier 3 is required",
          trigger: "focus",
        },
      ],
      productName: [
        {
          required: true,
          message: "Product Name is required",
          trigger: "focus",
        },
      ],
      manufacturer: [
        {
          required: true,
          message: "Manufacturer is required",
          trigger: "focus",
        },
      ],
      modelVersion: [
        {
          required: true,
          message: "Model/Version is required",
          trigger: "focus",
        },
      ],
      additionalInfo: [
        {
          required: true,
          message: "Additional Information is required",
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

    const productCatalogFormRef = ref<null | HTMLFormElement>(null);
    const listOfSample = ref<Array<ILov>>([
      { lovKey: "Company", lovValue: "End User Support" },
      { lovKey: "Company", lovValue: "Computer Service" },
      { lovKey: "Company", lovValue: "Desktop - Standard (AIO)" },
    ]);

    const productCatalog1Details = computed({
      get: () =>
        ref<IProductCatalog>({
          ...productCatalog1store.productCatalog1Details,
        }).value,
      set: (val) => {
        productCatalog1store.productCatalog1Details = val;
      },
    });

    const productCatalogList = computed(
      () =>
        ref<Array<IProductCatalog>>([
          ...(productCatalog1store.getProductCatalog1List1 ?? []),
        ]).value
    );

    const productCatalogPageInfo = computed(
      () => productCatalog1store.productCatalog1List
    );

    onMounted(() => {
      getProductCatalog1();
      getProductCatalog1List();
    });

    const getProductCatalog1List = () => {
      productCatalog1store.getProductCatalog1List();
    };

    const getProductCatalog1 = () => {
      productCatalog1store.getProductCatalog1();
    };

    const onSave = () => {
      productCatalogFormRef.value!.validate(async (valid) => {
        if (valid) {
          if (productCatalog1Details.value.productCatalogId) {
            const rest = await productCatalog1store.updateProductCatalog1(
              productCatalog1Details.value
            );
            if (rest == true) {
              successPopUp({ desc: "Berhasil Update Data" });
              getProductCatalog1();
            }
          } else {
            const rest = await productCatalog1store.createProductCatalog1(
              productCatalog1Details.value
            );
            if (rest == true) {
              successPopUp({ desc: "Berhasil Menyimpan Data" });
              getProductCatalog1List();
            }
          }

          //assetStatusStore.saveAssetStatus(assetStatusDetails.value);
        }
      });
    };
    const onClear = () => {
      productCatalog1Details.value = {};
      productCatalogFormRef.value!.resetFields();
    };
    const onSearch = () => {
      productCatalog1store.getProductCatalog1(productCatalog1Details.value);
    };
    const onEdit = (productCatalog1: IProductCatalog) => {
      productCatalog1Details.value = { ...productCatalog1 };
    };
    return {
      listOfSample,
      loading,
      isFieldEdit,
      productCatalogHeader,
      productCatalogList,
      productCatalog1Details,
      productCatalogRules,
      productCatalogFormRef,
      onSave,
      onSearch,
      onClear,
      Search,
      getMediaPath,
      loadingFilter,
      filter,
      getValueFromList,
      formatDate,
      productCatalogPageInfo,
      onEdit,
    };
  },
});

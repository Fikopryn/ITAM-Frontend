import type { ITableHeader } from "@/schema/ITableHeader";
import type { IProductCatalog } from "@/schema/admin-con/IProductCatalog";
import { computed, defineComponent, onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getMediaPath } from "@/core/helpers/assets";
import { getValueFromList } from "@/core/helpers/common";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { formatDate } from "@/core/helpers/common";
import type { ILov } from "@/schema/ILov";
import { useProductCatalogStore } from "@/stores/adminCon/productCatalog";
import { successPopUp } from "@/core/helpers/popup";
export default defineComponent({
  name: "product-catalog",
  components: { Datatable },
  setup() {
    const productCatalogStore = useProductCatalogStore();

    const loading = ref<boolean>(false);
    const loadingFilter = computed(() => productCatalogStore.loading);

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

    const productCatalogDetails = computed({
      get: () =>
        ref<IProductCatalog>({ ...productCatalogStore.productCatalogDetails })
          .value,
      set: (val) => {
        productCatalogStore.productCatalogDetails = val;
      },
    });
    const productCatalogList = computed(
      () =>
        ref<Array<IProductCatalog>>([
          ...(productCatalogStore.getProductCatalogList1 ?? []),
        ]).value
    );
    const productCatalogPageInfo = computed(
      () => productCatalogStore.productCatalogList
    );

    onMounted(() => {
      getProductCatalog();
      getProductCatalogList();
    });
    const getProductCatalogList = () => {
      productCatalogStore.getProductCatalogList();
    };
    const getProductCatalog = () => {
      productCatalogStore.getProductCatalog();
    };

    const onSave = () => {
      productCatalogFormRef.value!.validate(async (valid) => {
        if (valid) {
          if (productCatalogDetails.value.companyId) {
            const rest = await productCatalogStore.updateProductCatalog(
              productCatalogDetails.value
            );
            if (rest == true) {
              successPopUp({ desc: "Berhasil Menyimpan Data" });
              getProductCatalogList();
            }
          } else {
            const rest = await productCatalogStore.createProductCatalog(
              productCatalogDetails.value
            );
            if (rest == true) {
              successPopUp({ desc: "Berhasil Menyimpan Data" });
              getProductCatalogList();
            }
          }
          //productCatalogStore.saveProductCatalog(productCatalogDetails.value);
        }
      });
    };

    const onClear = () => {
      productCatalogDetails.value = {};
      productCatalogFormRef.value!.resetFields();
    };
    const onSearch = () => {
      productCatalogStore.getProductCatalog(productCatalogDetails.value);
    };
    const onEdit = (productCatalog: IProductCatalog) => {
      productCatalogDetails.value = { ...productCatalog };
    };
    return {
      listOfSample,
      loading,
      isFieldEdit,
      productCatalogHeader,
      productCatalogList,
      productCatalogDetails,
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

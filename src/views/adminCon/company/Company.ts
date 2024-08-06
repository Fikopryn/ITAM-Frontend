import type { ITableHeader } from "@/schema/ITableHeader";
import type { ICompany } from "@/schema/admin-con/ICompany";
import { computed, defineComponent, onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getMediaPath } from "@/core/helpers/assets";
import { getValueFromList } from "@/core/helpers/common";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { formatDate } from "@/core/helpers/common";
import type { ILov } from "@/schema/ILov";
import { useCompanyStore } from "@/stores/adminCon/company";
import { successPopUp } from "@/core/helpers/popup";
export default defineComponent({
  name: "company-admincon",
  components: { Datatable },
  setup() {
    const CompanyStore = useCompanyStore();

    const loading = ref<boolean>(false);
    const loadingFilter = computed(() => CompanyStore.loading);

    const isFieldEdit = ref<boolean>(false);
    const filter = ref<any>({});
    const companyHeader = ref<Array<ITableHeader>>([
      {
        columnName: "CompanyID",
        columnLabel: "companyId",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Company Name",
        columnLabel: "companyName",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Company Type",
        columnLabel: "companyType",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Website",
        columnLabel: "website",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Abbreviation",
        columnLabel: "abbreviation",
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
        columnName: "Modified by",
        columnLabel: "modifiedBy",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Company Status",
        columnLabel: "companyStatus",
        columnWidth: "160",
        sortEnabled: true,
      },
    ]);
    const companyRules = ref({
      website: [
        {
          required: true,
          message: "Website is required",
          trigger: "focus",
        },
      ],
      companyName: [
        {
          required: true,
          message: "Company Name is required",
          trigger: "focus",
        },
      ],
      companyType: [
        {
          required: true,
          message: "Company Type is required",
          trigger: "focus",
        },
      ],
      abbreviation: [
        {
          required: true,
          message: "Abbreviation is required",
          trigger: "focus",
        },
      ],
      companyStatus: [
        {
          required: true,
          message: "Company Status is required",
          trigger: "focus",
        },
      ],
    });

    const companyFormRef = ref<null | HTMLFormElement>(null);
    const listOfSample = ref<Array<ILov>>([
      { lovKey: "test", lovValue: "PHM" },
      { lovKey: "test", lovValue: "PHKT" },
      { lovKey: "test", lovValue: "PHSS" },
      { lovKey: "test", lovValue: "PHI" },
    ]);

    const companyDetails = computed({
      get: () => ref<ICompany>({ ...CompanyStore.companyDetails }).value,
      set: (val) => {
        CompanyStore.companyDetails = val;
      },
    });

    const companyList = computed(
      () =>
        ref<Array<ICompany>>([...(CompanyStore.getCompanyList1 ?? [])]).value
    );

    const companyPageInfo = computed(() => CompanyStore.companyList);

    onMounted(() => {
      getCompany();
      getCompanyList();
    });

    const getCompany = () => {
      CompanyStore.getCompany();
    };

    const getCompanyList = () => {
      CompanyStore.getCompanyList();
    };

    const onSave = () => {
      companyFormRef.value!.validate(async (valid) => {
        if (valid) {
          if (companyDetails.value.companyId) {
            const rest = await CompanyStore.updateCompany(companyDetails.value);
            if (rest == true) {
              successPopUp({ desc: "Berhasil Update Data" });
              getCompany();
            }
          } else {
            const rest = await CompanyStore.createCompany(companyDetails.value);
            if (rest == true) {
              successPopUp({ desc: "Berhasil Menyimpan Data" });
              getCompanyList();
            }
          }

          //assetStatusStore.saveAssetStatus(assetStatusDetails.value);
        }
      });
    };

    const onClear = () => {
      companyDetails.value = {};
      companyFormRef.value!.resetFields();
    };
    const onSearch = () => {
      CompanyStore.getCompany(companyDetails.value);
    };
    const onEdit = (Company: ICompany) => {
      companyDetails.value = { ...Company };
    };
    return {
      listOfSample,
      loading,
      isFieldEdit,
      companyHeader,
      companyList,
      companyDetails,
      companyRules,
      companyFormRef,
      onSave,
      onSearch,
      onClear,
      Search,
      getMediaPath,
      loadingFilter,
      filter,
      getValueFromList,
      formatDate,
      companyPageInfo,
      onEdit,
    };
  },
});

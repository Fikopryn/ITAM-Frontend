import type { ITableHeader } from "@/schema/ITableHeader";
import type { IContractRegistration } from "@/schema/contract-man/IContractRegistration";
import { computed, defineComponent, onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getMediaPath } from "@/core/helpers/assets";
import { getValueFromList } from "@/core/helpers/common";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { formatDate } from "@/core/helpers/common";
import type { ILov } from "@/schema/ILov";
import { useContractRegistrationStore } from "@/stores/conManCon/contractRegistration";
export default defineComponent({
  name: "contractRegistration",
  components: { Datatable },
  setup() {
    const ContractRegistration = useContractRegistrationStore();

    const loading = ref<boolean>(false);
    const loadingFilter = ref<boolean>(false);

    const isFieldEdit = ref<boolean>(false);
    const filter = ref<any>({});
    const contractRegistrationHeader = ref<Array<ITableHeader>>([
      {
        columnName: "Company ID",
        columnLabel: "companyId",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Contract Owner",
        columnLabel: "contractOwner",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Contract Nomor",
        columnLabel: "contractNomor",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Subject",
        columnLabel: "subject",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Supplier ID",
        columnLabel: "supplierId",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Start Contract",
        columnLabel: "startContract",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "End Contract",
        columnLabel: "endContract",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Contract Value",
        columnLabel: "contractValue",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Contract Document",
        columnLabel: "contractDocument",
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
        columnName: "Association Status",
        columnLabel: "associationStatus",
        columnWidth: "160",
        sortEnabled: true,
      },
    ]);
    const contractRegistrationRules = ref({
      contractNomor: [
        {
          required: true,
          message: "Contract Nomor is required",
          trigger: "focus",
        },
      ],
    });

    const contractRegistrationFormRef = ref<null | HTMLFormElement>(null);
    const listOfSample = ref<Array<ILov>>([
      { lovKey: "test", lovValue: "END USER SUPPORT" },
      { lovKey: "test", lovValue: "NETTEL" },
      { lovKey: "test", lovValue: "APPLICATION" },
    ]);

    const listOfSample1 = ref<Array<ILov>>([
      { lovKey: "test", lovValue: "1" },
      { lovKey: "test", lovValue: "2" },
      { lovKey: "test", lovValue: "3" },
      { lovKey: "test", lovValue: "4" },
    ]);

    const listOfSample2 = ref<Array<ILov>>([
      { lovKey: "test", lovValue: "7" },
      { lovKey: "test", lovValue: "8" },
      { lovKey: "test", lovValue: "9" },
    ]);

    const contractRegistrationDetails = computed({
      get: () =>
        ref<IContractRegistration>({
          ...ContractRegistration.contractRegistrationDetails,
        }).value,
      set: (val) => {
        ContractRegistration.contractRegistrationDetails = val;
      },
    });
    const contractRegistrationList = computed(
      () =>
        ref<Array<IContractRegistration>>([
          ...(ContractRegistration.contractRegistrationList.pageInfo?.data ??
            []),
        ]).value
    );
    const contractRegistrationPageInfo = computed(
      () => ContractRegistration.contractRegistrationList
    );

    onMounted(() => {
      getContractRegistration();
    });

    const getContractRegistration = () => {
      ContractRegistration.getContractRegistration();
    };

    const onSave = () => {
      contractRegistrationFormRef.value!.validate((valid) => {
        if (valid) {
          ContractRegistration.getContractRegistration(
            contractRegistrationDetails.value
          );
        }
      });
    };
    const onClear = () => {
      contractRegistrationDetails.value = {};
      contractRegistrationFormRef.value!.resetFields();
    };
    const onSearch = () => {
      ContractRegistration.getContractRegistration(
        contractRegistrationDetails.value
      );
    };
    const onEdit = (ContractRegistration: IContractRegistration) => {
      contractRegistrationDetails.value = { ...ContractRegistration };
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
      listOfSample1,
      listOfSample2,
      loading,
      isFieldEdit,
      contractRegistrationHeader,
      contractRegistrationList,
      contractRegistrationDetails,
      contractRegistrationRules,
      contractRegistrationFormRef,
      onSave,
      onSearch,
      onClear,
      Search,
      getMediaPath,
      loadingFilter,
      filter,
      getValueFromList,
      formatDate,
      contractRegistrationPageInfo,
      onEdit,
    };
  },
});

import type { ITableHeader } from "@/schema/ITableHeader";
import type { IRequestPurchaseOrder } from "@/schema/contract-man/IRequestPurchaseOrder";
import { computed, defineComponent, onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getMediaPath } from "@/core/helpers/assets";
import { getValueFromList } from "@/core/helpers/common";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { formatDate } from "@/core/helpers/common";
import type { ILov } from "@/schema/ILov";
import { useRequestPurchaseOrderStore } from "@/stores/conManCon/requestPurchaseOrder";
export default defineComponent({
  name: "requestPurchaseOrder",
  components: { Datatable },
  setup() {
    const requestPurchaseOrderStore = useRequestPurchaseOrderStore();

    const loading = ref<boolean>(false);
    const loadingFilter = computed(() => requestPurchaseOrderStore.loading);

    const isFieldEdit = ref<boolean>(false);
    const filter = ref<any>({});
    const requestPurchaseOrderHeader = ref<Array<ITableHeader>>([
      {
        columnName: "Contract Nomor",
        columnLabel: "contractNo",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "RPO Nomor",
        columnLabel: "rpono",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "RPO Subject",
        columnLabel: "rpoSubject",
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
        columnName: "RO Start",
        columnLabel: "rostart",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "RO End",
        columnLabel: "roend",
        columnWidth: "160",
        sortEnabled: true,
      },
      {
        columnName: "Total RPO",
        columnLabel: "totalRpo",
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
    ]);
    const requestPurchaseOrderRules = ref({
      rpoNo: [
        {
          required: true,
          message: "Contract Nomor is required",
          trigger: "focus",
        },
      ],
    });

    const requestPurchaseOrderFormref = ref<null | HTMLFormElement>(null);
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

    const requestPurchaseOrderDetails = computed({
      get: () =>
        ref<IRequestPurchaseOrder>({
          ...requestPurchaseOrderStore.requestPurchaseOrderDetails,
        }).value,
      set: (val) => {
        requestPurchaseOrderStore.requestPurchaseOrderDetails = val;
      },
    });
    const requestPurchaseOrderList = computed(
      () =>
        ref<Array<IRequestPurchaseOrder>>([
          ...(requestPurchaseOrderStore.getRequestPurchaseOrderList1 ?? []),
        ]).value
    );
    const requestPurchaseOrderPageInfo = computed(
      () => requestPurchaseOrderStore.requestPurchaseOrderList
    );

    onMounted(() => {
      getRequestPurchaseOrder();
      getRequestPurchaseOrderList();
    });

    const getRequestPurchaseOrderList = () => {
      requestPurchaseOrderStore.getRequestPurchaseOrderList();
    };

    const getRequestPurchaseOrder = () => {
      requestPurchaseOrderStore.getRequestPurchaseOrder();
    };

    const onSave = () => {
      requestPurchaseOrderFormref.value!.validate((valid) => {
        if (valid) {
          requestPurchaseOrderStore.getRequestPurchaseOrder(
            requestPurchaseOrderDetails.value
          );
        }
      });
    };
    const onClear = () => {
      requestPurchaseOrderDetails.value = {};
      requestPurchaseOrderFormref.value!.resetFields();
    };
    const onSearch = () => {
      requestPurchaseOrderStore.getRequestPurchaseOrder(
        requestPurchaseOrderDetails.value
      );
    };
    const onEdit = (RequestPurchaseOrder: IRequestPurchaseOrder) => {
      requestPurchaseOrderDetails.value = { ...RequestPurchaseOrder };
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
      requestPurchaseOrderHeader,
      requestPurchaseOrderList,
      requestPurchaseOrderDetails,
      requestPurchaseOrderRules,
      requestPurchaseOrderFormref,
      onSave,
      onSearch,
      onClear,
      Search,
      getMediaPath,
      loadingFilter,
      filter,
      getValueFromList,
      formatDate,
      requestPurchaseOrderPageInfo,
      onEdit,
    };
  },
});

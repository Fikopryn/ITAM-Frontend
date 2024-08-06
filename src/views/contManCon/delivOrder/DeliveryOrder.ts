import type { ITableHeader } from "@/schema/ITableHeader";
import type { IDeliveryOrder } from "@/schema/contract-man/IDeliveryOrder";
import { computed, defineComponent, onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getMediaPath } from "@/core/helpers/assets";
import { getValueFromList } from "@/core/helpers/common";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { formatDate } from "@/core/helpers/common";
import type { ILov } from "@/schema/ILov";
import { useDeliveryOrderStore } from "@/stores/conManCon/deliveryOrder";
export default defineComponent({
  name: "deliveryOrder",
  components: { Datatable },
  setup() {
    const DeliveryOrder = useDeliveryOrderStore();

    const loading = ref<boolean>(false);
    const loadingFilter = ref<boolean>(false);

    const isFieldEdit = ref<boolean>(false);
    const filter = ref<any>({});
    const deliveryOrderHeader = ref<Array<ITableHeader>>([
      {
        columnName: "Company",
        columnLabel: "company",
        columnWidth: "110",
        sortEnabled: true,
      },
      {
        columnName: "Contract Nomor",
        columnLabel: "contractNomor",
        sortEnabled: true,
      },
      {
        columnName: "Delivery Order Nomor",
        columnLabel: "deliveryOrderNomor",
        sortEnabled: true,
      },
      {
        columnName: "Delivery Order Date",
        columnLabel: "deliveryOrderDate",
        sortEnabled: true,
      },
      {
        columnName: "Received Date",
        columnLabel: "receivedDate",
        sortEnabled: true,
      },
      {
        columnName: "Supplier Name",
        columnLabel: "supplierName",
        sortEnabled: true,
      },
      {
        columnName: "Delivery Order Document",
        columnLabel: "deliveryOrderDocument",
        sortEnabled: true,
      },
      {
        columnName: "Last Modified Date",
        columnLabel: "lastModifiedDate",
        sortEnabled: true,
      },
      {
        columnName: "Modified by",
        columnLabel: "modifiedBy",
        sortEnabled: true,
      },
      {
        columnName: "Association Status",
        columnLabel: "associationStatus",
        sortEnabled: true,
      },
    ]);

    const deliveryOrderRules = ref({
      DeliveryOrderNomor: [
        {
          required: true,
          message: "Delivery Order Nomor is required",
          trigger: "focus",
        },
      ],
    });

    const deliveryOrderFormRef = ref<null | HTMLFormElement>(null);
    const listOfSample = ref<Array<ILov>>([
      { lovKey: "test", lovValue: "END USER SUPPORT" },
      { lovKey: "test", lovValue: "NETTEL" },
      { lovKey: "test", lovValue: "APPLICATION" },
    ]);

    const deliveryOrderDetails = computed({
      get: () =>
        ref<IDeliveryOrder>({
          ...DeliveryOrder.deliveryOrderDetails,
        }).value,
      set: (val) => {
        DeliveryOrder.deliveryOrderDetails = val;
      },
    });
    const deliveryOrderList = computed(
      () =>
        ref<Array<IDeliveryOrder>>([
          ...(DeliveryOrder.deliveryOrderList.pageInfo?.data ?? []),
        ]).value
    );
    const deliveryOrderPageInfo = computed(
      () => DeliveryOrder.deliveryOrderList
    );

    onMounted(() => {
      getDeliveryOrder();
    });

    const getDeliveryOrder = () => {
      DeliveryOrder.getDeliveryOrder();
    };

    const onSave = () => {
      deliveryOrderFormRef.value!.validate((valid) => {
        if (valid) {
          DeliveryOrder.getDeliveryOrder(deliveryOrderDetails.value);
        }
      });
    };
    const onClear = () => {
      deliveryOrderDetails.value = {};
      deliveryOrderFormRef.value!.resetFields();
    };
    const onSearch = () => {
      DeliveryOrder.getDeliveryOrder(deliveryOrderDetails.value);
    };
    const onEdit = (DeliveryOrder: IDeliveryOrder) => {
      deliveryOrderDetails.value = { ...DeliveryOrder };
    };

    const parser = (value) => value.replace("/IDRs?|(,*)/g, ");

    const formatter = (value) =>
      `IDR ${value}`.replace("/B(?=(d{3})+(?!d))/g", ",");

    return {
      parser,
      formatter,
      listOfSample,
      loading,
      isFieldEdit,
      deliveryOrderHeader,
      deliveryOrderList,
      deliveryOrderDetails,
      deliveryOrderRules,
      deliveryOrderFormRef,
      onSave,
      onSearch,
      onClear,
      Search,
      getMediaPath,
      loadingFilter,
      filter,
      getValueFromList,
      formatDate,
      deliveryOrderPageInfo,
      onEdit,
    };
  },
});

import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { IGQUser } from "@/schema/IGlobalQuery";
import EmptyData from "@/components/data-state/EmptyData.vue";
import { defineComponent, ref } from "vue";
import { getMediaPath } from "@/core/helpers/assets";
import type { ITableHeader } from "@/schema/ITableHeader";

export default defineComponent({
  name: "modal-current-assignment",
  components: { Datatable, EmptyData },
  emits: ["add-busPro"],
  props: {
    currentAssignment: { type: Array<IGQUser>, default: () => [] },
  },
  setup(props, { emit }) {
    const loading = ref<boolean>(false);
    const loadingFilter = ref<boolean>(false);

    const tableHeaderCurrentAssignment = ref<Array<ITableHeader>>([
      {
        columnLabel: "userId",
        columnName: "Username",
        sortEnabled: false,
      },
      {
        columnLabel: "action",
        columnName: "",
        sortEnabled: false,
      },
    ]);
    return {
      loading,
      loadingFilter,
      tableHeaderCurrentAssignment,
      getMediaPath,
    };
  },
});

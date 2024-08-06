<template>
  <div class="row">
    <div class="col-12">
      <TablePagination
        v-if="pageCount > 1"
        :total-pages="pageCount"
        :total="count"
        :per-page="itemsPerPage"
        :current-page="page"
        @page-change="pageChange"
      />
    </div>

    <div class="col-12" :class="pageCount > 1 ? 'mt-md-n12' : 'mt-4'">
      <TableItemsPerPageSelect
        v-if="count > 1"
        v-model:itemsPerPage="itemsCountInTable"
        :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled"
        :count="count"
        :totalDataToDisplay="totalDataToDisplay"
        :total-info-enabled="totalInfoEnabled"
      />
    </div>
  </div>
</template>

<script lang="ts">
import TableItemsPerPageSelect from "@/components/kt-datatable/table-partials/table-content/table-footer/TableItemsPerPageSelect.vue";
import TablePagination from "./table-content/table-footer/TablePagination.vue";
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  type WritableComputedRef,
  watch,
} from "vue";

export default defineComponent({
  name: "table-footer",
  components: {
    TableItemsPerPageSelect,
    TablePagination,
  },
  props: {
    count: { type: Number, required: false, default: 5 },
    totalDataToDisplay: { type: Number, default: 0 },
    itemsPerPage: { type: Number, default: 5 },
    itemsPerPageDropdownEnabled: {
      type: Boolean,
      required: false,
      default: true,
    },
    currentPage: { type: Number, required: false, default: 1 },
    totalInfoEnabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["update:itemsPerPage", "page-change"],
  setup(props, { emit }) {
    const page = ref(props.currentPage);
    const inputItemsPerPage = ref(props.itemsPerPage);

    watch(
      () => props.currentPage,
      (val) => {
        page.value = val;
      }
    );
    watch(
      () => props.count,
      () => {
        page.value = 1;
      }
    );

    watch(
      () => inputItemsPerPage.value,
      () => {
        page.value = 1;
      }
    );

    onMounted(() => {
      inputItemsPerPage.value = props.itemsPerPage;
    });

    const pageChange = (newPage: number) => {
      page.value = newPage;
      emit("page-change", page.value);
    };

    const itemsCountInTable: WritableComputedRef<number> = computed({
      get(): number {
        return props.itemsPerPage;
      },
      set(value: number): void {
        inputItemsPerPage.value = value;
        emit("update:itemsPerPage", value);
      },
    });

    const pageCount = computed(() => {
      return Math.ceil(props.count / itemsCountInTable.value);
    });

    return {
      pageChange,
      pageCount,
      page,
      itemsCountInTable,
      inputItemsPerPage,
    };
  },
});
</script>

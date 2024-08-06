<template>
  <div class="dataTables_wrapper dt-bootstrap4 no-footer">
    <TableContent
      @on-items-select="onItemSelect"
      @on-sort="onSort"
      :header="header"
      :data="dataToDisplay"
      :checkboxEnabled="checkboxEnabled"
      :checkboxLabel="checkboxLabel"
      :checkboxType="checkboxType"
      :checkboxSelected="checkboxSelected"
      :empty-table-text="emptyTableText"
      :sort-label="sortLabel"
      :sort-order="sortOrder"
      :loading="loading"
      :image-empty-table-enabled="imageEmptyTableEnabled"
      :column-type="columnType"
    >
      <template
        v-for="(_, name) in $slots"
        v-slot:[name]="{ row: item, index: index }"
      >
        <slot :name="name" :row="item" :index="index" />
      </template>
    </TableContent>
    <TableFooter
      @page-change="pageChange"
      :current-page="currentPage"
      v-model:itemsPerPage="itemsInTable"
      :count="totalItems"
      :totalDataToDisplay="totalDataToDisplay"
      :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled"
      :total-info-enabled="totalInfoEnabled"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import TableContent from "@/components/kt-datatable/table-partials/table-content/TableContent.vue";
import TableFooter from "@/components/kt-datatable/table-partials/TableFooter.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import arraySort from "array-sort";

export default defineComponent({
  name: "kt-datatable",
  props: {
    header: { type: Array, required: true },
    data: { type: Array, required: true },
    itemsPerPage: { type: Number, default: 10 },
    itemsPerPageDropdownEnabled: {
      type: Boolean,
      required: false,
      default: true,
    },
    totalInfoEnabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    checkboxLabel: { type: String, required: false, default: "id" },
    checkboxType: {
      type: String as () => "multiple" | "single",
      required: false,
      default: "multiple",
    },
    checkboxSelected: {
      type: Array<String>,
      required: false,
      default: () => [],
    },
    total: { type: Number, required: false },
    loading: { type: Boolean, required: false, default: false },
    sortLabel: { type: String, required: false, default: null },
    sortOrder: {
      type: String as () => "asc" | "desc",
      required: false,
      default: "asc",
    },
    emptyTableText: { type: String, required: false, default: "No data found" },
    currentPage: { type: Number, required: false, default: 1 },
    imageEmptyTableEnabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    sortingEnabled: { type: Boolean, required: false, default: false },
    columnType: {
      type: String as () => "dashed" | "striped",
      default: "dashed",
    },
  },
  emits: [
    "page-change",
    "on-sort",
    "on-items-select",
    "on-items-per-page-change",
    "data-to-display",
  ],
  components: {
    TableContent,
    TableFooter,
  },
  setup(props, { emit }) {
    const currentPage = ref(props.currentPage);
    const itemsInTable = ref<number>(props.itemsPerPage);

    watch(
      () => itemsInTable.value,
      (val) => {
        currentPage.value = 1;
        emit("on-items-per-page-change", val);
      }
    );

    const pageChange = (page: number) => {
      currentPage.value = page;
      emit("page-change", page);
    };

    const dataToDisplay = computed(() => {
      if (props.data) {
        if (props.data.length <= itemsInTable.value) {
          const _data = props.data;
          emit("data-to-display", _data.length);
          return _data;
        } else {
          let sliceFrom = (currentPage.value - 1) * itemsInTable.value;
          const _data = props.data.slice(
            sliceFrom,
            sliceFrom + itemsInTable.value
          );
          emit("data-to-display", _data.length);
          return _data;
        }
      }
      emit("data-to-display", 0);
      return [];
    });

    const totalDataToDisplay = computed(() => {
      if (props.data) {
        if (props.data.length <= itemsInTable.value) {
          return props.data.length;
        } else {
          return itemsInTable.value;
        }
      }
      return 0;
    });

    const totalItems = computed(() => {
      if (props.data) {
        if (props.data.length <= itemsInTable.value) {
          return props.total;
        } else {
          return props.data.length;
        }
      }
      return 0;
    });

    const onSort = (sort: Sort) => {
      if (props.sortingEnabled) {
        const reverse: boolean = sort.order === "asc";
        if (sort.label) {
          arraySort(props.data, sort.label, {
            reverse,
          });
        }
      }

      emit("on-sort", sort);
    };

    //eslint-disable-next-line
    const onItemSelect = (selectedItems: any) => {
      emit("on-items-select", selectedItems);
    };

    return {
      pageChange,
      dataToDisplay,
      totalDataToDisplay,
      onSort,
      onItemSelect,
      itemsInTable,
      totalItems,
    };
  },
});
</script>

<style>
.hs-bar::-webkit-scrollbar {
  height: 15px !important; /* height of horizontal scrollbar ← You're missing this */
}

.el-textarea__inner,
.el-input__inner {
  font: var(
    --regular-h-6-12-px-r,
    400 12px/20px "Poppins",
    sans-serif
  ) !important;
}

.background-header {
  background-color: #f0f5ff;

  border-bottom-width: 1.5px !important;
  border-bottom-style: dashed !important;
  border-bottom-color: #d1d5ec !important;

  border-top-width: 1.5px !important;
  border-top-style: dashed !important;
  border-top-color: #d1d5ec !important;
}

.el-table th .cell {
  padding: 0px;
}
.el-table td .cell {
  padding-left: 0px;
  padding-right: 12px;
}
</style>

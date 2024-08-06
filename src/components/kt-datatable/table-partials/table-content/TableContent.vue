<template>
  <div class="table-responsive hs-bar">
    <table
      :class="[
        loading && 'overlay overlay-block',
        columnType == 'striped' ? 'striped-column' : 'table-row-dashed',
      ]"
      class="table align-middle table-row-gray-300 fs-6 gy-2 dataTable no-footer table-primary"
    >
      <TableHeadRow
        @onSort="onSort"
        @onSelect="selectAll"
        :checkboxEnabledValue="check"
        :checkboxEnabled="checkboxEnabled"
        :sort-label="sortLabel"
        :sort-order="sortOrder"
        :header="header"
        :column-type="columnType"
      >
        <template
          v-for="(_, name) in $slots"
          v-slot:[name]="{ row: item, index: index }"
        >
          <slot :name="name" :row="item" :index="index" />
        </template>
      </TableHeadRow>
      <TableBodyRow
        v-if="data.length !== 0"
        @onSelect="itemsSelect"
        :currentlySelectedItems="selectedItems"
        :data="data"
        :header="header"
        :checkbox-enabled="checkboxEnabled"
        :checkbox-label="checkboxLabel"
        :checkbox-type="checkboxType"
        :checkbox-selected="checkboxSelected"
        :column-type="columnType"
      >
        <template
          v-for="(_, name) in $slots"
          v-slot:[name]="{ row: item, index: index }"
        >
          <slot :name="name" :row="item" :index="index" />
        </template>
      </TableBodyRow>
      <template v-else>
        <tr class="odd">
          <td colspan="7" class="dataTables_empty">
            <div v-if="!imageEmptyTableEnabled">
              {{ emptyTableText }}
            </div>
            <div v-else>
              <EmptyData
                title="No Data"
                :desc="emptyTableText"
                :icon-link="iconLink"
              />
            </div>
          </td>
        </tr>
      </template>
      <Loading v-if="loading" />
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import TableHeadRow from "@/components/kt-datatable/table-partials/table-content/table-head/TableHeadRow.vue";
import TableBodyRow from "@/components/kt-datatable/table-partials/table-content/table-body/TableBodyRow.vue";
import Loading from "@/components/kt-datatable/table-partials/Loading.vue";
import EmptyData from "@/components/data-state/EmptyData.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";

export default defineComponent({
  name: "table-body",
  props: {
    header: { type: Array, required: true },
    data: { type: Array, required: true },
    emptyTableText: { type: String, default: "No data found" },
    sortLabel: { type: String, required: false, default: null },
    sortOrder: {
      type: String as () => "asc" | "desc",
      required: false,
      default: "asc",
    },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    checkboxLabel: { type: String, required: false, default: "id" },
    checkboxType: {
      type: String as () => string,
      required: false,
      default: "multiple",
    },
    checkboxSelected: {
      type: Array<any>,
      required: false,
      default: () => [],
    },
    loading: { type: Boolean, required: false, default: false },
    iconLink: {
      type: String,
      default: "illustrations/main/empty-state/img-no-data-general.svg",
    },
    imageEmptyTableEnabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    columnType: {
      type: String as () => "dashed" | "striped",
      default: "dashed",
    },
  },
  emits: ["on-sort", "on-items-select"],
  components: {
    TableHeadRow,
    TableBodyRow,
    Loading,
    EmptyData,
  },
  setup(props, { emit }) {
    const selectedItems = ref<Array<unknown>>([]);
    const allSelectedItems = ref<Array<unknown>>([]);
    const check = ref<boolean>(false);

    // watch(
    //   () => props.data,
    //   () => {
    //     selectedItems.value = [];
    //     allSelectedItems.value = [];
    //     check.value = false;
    //     // eslint-disable-next-line
    //     props.data.forEach((item: any) => {
    //       if (item[props.checkboxLabel]) {
    //         allSelectedItems.value.push(item[props.checkboxLabel]);
    //       }
    //     });
    //   }
    // );

    // eslint-disable-next-line
    const selectAll = (checked: any) => {
      check.value = checked;
      if (checked) {
        selectedItems.value = [
          ...new Set([...selectedItems.value, ...allSelectedItems.value]),
        ];
      } else {
        selectedItems.value = [];
      }
    };

    //eslint-disable-next-line
    const itemsSelect = (value: any) => {
      selectedItems.value = [];
      //eslint-disable-next-line

      value.forEach((item: any) => {
        if (!selectedItems.value.includes(item)) selectedItems.value.push(item);
      });
    };

    const onSort = (sort: Sort) => {
      emit("on-sort", sort);
    };

    watch(
      () => [...selectedItems.value],
      (currentValue) => {
        if (currentValue) {
          emit("on-items-select", currentValue);
        }
      }
    );

    onMounted(() => {
      // selectedItems.value = [...props.checkboxSelected];
      // allSelectedItems.value = [];
      // check.value = false;
      // // eslint-disable-next-line
      // props.data.forEach((item: any) => {
      //   if (item[props.checkboxLabel]) {
      //     allSelectedItems.value.push(item[props.checkboxLabel]);
      //   }
      // });
    });

    return {
      onSort,
      selectedItems,
      selectAll,
      itemsSelect,
      check,
    };
  },
});
</script>

<style lang="scss" scoped>
.striped-column {
  border: 1px solid #d1d5ec;
  border-collapse: separate;
  overflow: hidden;
  border-spacing: 0;
  border-radius: 10px;
}
</style>

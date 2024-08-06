<template>
  <thead :class="columnType == 'striped' ? 'border' : ''">
    <tr class="text-start fw-semibold fs-6 gs-0" style="color: #757a90">
      <th v-if="checkboxEnabled" :style="{ width: '30px' }">
        <!-- form-check form-check-sm form-check-custom form-check-solid me-3 -->

        <!-- <div
          class="form-check form-check-sm form-check-custom form-check-solid me-3"
        >
          <input
            class="form-check-input"
            type="checkbox"
            v-model="checked"
            @change="selectAll()"
          />
        </div> -->
      </th>
      <template v-for="(column, i) in header" :key="i">
        <th
          class="text-start"
          @click="onSort(column.columnLabel, column.sortEnabled)"
          :style="{
            minWidth: column.columnWidth ? `${column.columnWidth}px` : '0',
            width: column.columnMaxWidth
              ? `${column.columnMaxWidth}px`
              : 'auto',
            cursor: column.sortEnabled ? 'pointer' : 'auto',
          }"
        >
          <span class="d-flex flex-row align-items-center">
            <span class="flex-grow-1">{{ column.columnName }}</span>

            <span
              v-if="
                columnLabelAndOrder.label === column.columnLabel &&
                column.sortEnabled
              "
              v-html="sortArrow"
            ></span>
            <span
              v-else-if="column.sortEnabled"
              v-html="sortArrowDefault"
            ></span>
          </span>
        </th>
      </template>
    </tr>
    <slot :name="'first-row'"> </slot>
  </thead>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";

export default defineComponent({
  name: "table-head-row",
  props: {
    checkboxEnabledValue: { type: Boolean, required: false, default: false },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    sortLabel: { type: String, required: false, default: null },
    sortOrder: {
      type: String as () => "asc" | "desc" | "default",
      required: false,
      default: "asc",
    },
    header: { type: Array as () => Array<any>, required: true },
    columnType: {
      type: String as () => "dashed" | "striped",
      default: "dashed",
    },
  },
  emits: ["on-select", "on-sort"],
  components: {},
  setup(props, { emit }) {
    const checked = ref<boolean>(false);
    const columnLabelAndOrder = ref<Sort>({
      label: props.sortLabel,
      order: props.sortOrder,
    });

    watch(
      () => props.checkboxEnabledValue,
      (currentValue) => {
        checked.value = currentValue;
      }
    );

    const selectAll = () => {
      emit("on-select", checked.value);
    };

    const onSort = (label: string, sortEnabled: boolean) => {
      if (sortEnabled) {
        if (columnLabelAndOrder.value.label === label) {
          if (
            columnLabelAndOrder.value.order === "asc" ||
            columnLabelAndOrder.value.order === "default"
          ) {
            columnLabelAndOrder.value.order = "desc";
          } else {
            if (columnLabelAndOrder.value.order === "desc") {
              columnLabelAndOrder.value.order = "asc";
            }
          }
        } else {
          columnLabelAndOrder.value.order = "asc";
          columnLabelAndOrder.value.label = label;
        }
        emit("on-sort", columnLabelAndOrder.value);
      }
    };

    // const sortArrow = computed(() => {
    //   return columnLabelAndOrder.value.order === "asc"
    //     ? "<span class='d-flex flex-column h-100'><i class='bi bi-caret-up-fill'></i><i class='bi bi-caret-down'></i></span>"
    //     : "<span class='d-flex flex-column h-100'><i class='bi bi-caret-up'></i><i class='bi bi-caret-down-fill'></i></span>";
    // });
    const sortArrow = computed(() => {
      return columnLabelAndOrder.value.order === "asc"
        ? "<img class='h-20px w-20px' src='media/icons/main/ic-sorting-upper.svg'/>"
        : "<img class='h-20px w-20px' src='media/icons/main/ic-sorting-lower.svg'/>";
    });
    const sortArrowDefault = computed(() => {
      return "<img class='h-20px w-20px' src='media/icons/main/ic-sorting-default.svg'/>";
    });

    return {
      onSort,
      selectAll,
      checked,
      sortArrow,
      sortArrowDefault,
      columnLabelAndOrder,
    };
  },
});
</script>

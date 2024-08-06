<template>
  <tbody
    class="fw-normal"
    :class="columnType == 'striped' ? 'border' : ''"
    style="color: #181c32"
  >
    <template v-for="(row, i) in data" :key="i">
      <tr
        :style="
          checkboxType == 'single' && row[checkboxLabel] == selectedItems
            ? 'background-color:#F0F5FF'
            : ''
        "
        :class="checkboxType == 'single' ? ' cursor-pointer' : ''"
        @click="onRowClick(row[checkboxLabel])"
      >
        <td
          v-if="checkboxEnabled"
          :style="{ paddingLeft: columnType == 'striped' ? '0.85rem' : '' }"
        >
          <div
            v-if="checkboxType == 'multiple'"
            class="form-check form-check-sm form-check-custom form-check-solid"
            :class="columnType == 'dashed' ? 'me-3' : ''"
          >
            <input
              class="form-check-input"
              type="checkbox"
              :value="row[checkboxLabel]"
              v-model="selectedItems"
              @change="onChange"
            />
          </div>
        </td>
        <template v-for="(properties, j) in header" :key="j">
          <td :class="{ 'text-start': j === header.length - 1 }">
            <slot :name="`${properties.columnLabel}`" :row="row" :index="i">
              {{ row }}
            </slot>
          </td>
        </template>
      </tr>
      <tr v-if="data"></tr>
    </template>
  </tbody>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "table-body-row",
  components: {},
  props: {
    header: { type: Array as () => Array<any>, required: true },
    data: { type: Array as () => Array<any>, required: true },
    currentlySelectedItems: { type: Array, required: false, default: () => [] },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    checkboxLabel: {
      type: String as () => string,
      required: false,
      default: "id",
    },
    checkboxType: {
      type: String as () => string,
      required: false,
      default: "multiple",
    },
    checkboxSelected: {
      type: Array,
      required: false,
      default: () => [],
    },
    columnType: {
      type: String as () => "dashed" | "striped",
      default: "dashed",
    },
  },
  emits: ["on-select"],
  setup(props, { emit }) {
    const selectedItems = ref<Array<any>>([]);
    // const selectedItemsTemp = ref<Array<any>>([]);
    onMounted(() => {
      selectedItems.value = [...new Set([...props.checkboxSelected])];
      emit("on-select", selectedItems.value);
    });

    watch(
      () => [...props.currentlySelectedItems],
      (currentValue) => {
        if (props.currentlySelectedItems.length !== 0) {
          if (props.checkboxType == "multiple") {
            selectedItems.value = [
              ...new Set([...selectedItems.value, ...currentValue]),
            ];
          } else {
            selectedItems.value = [];
            selectedItems.value.push(currentValue);
          }
        } else {
          selectedItems.value = [];
        }
      }
    );

    watch(
      () => [...props.checkboxSelected],
      (currentValue) => {
        selectedItems.value = [...new Set([...currentValue])];
        emit("on-select", selectedItems.value);
      }
    );

    watch(
      () => [...props.data],
      () => {
        if (selectedItems.value.length == 0) {
          selectedItems.value = [...new Set([...props.checkboxSelected])];
          emit("on-select", selectedItems.value);
        }
      }
    );

    const onChange = () => {
      emit("on-select", selectedItems.value);
      // selectedItemsTemp.value = [
      //   ...new Set([...props.checkboxSelected.concat(selectedItems.value)]),
      // ];
    };

    const onRowClick = (selectedItem) => {
      if (props.checkboxType == "single") {
        const currentSelected = selectedItems.value[0] ?? "";
        selectedItems.value = [];

        selectedItems.value.push(selectedItem);
        /* begin::Disable select unselect on row click */
        /* if (selectedItem != currentSelected) {
        selectedItems.value.push(selectedItem);
        } */
        /* end::Disable select unselect on row click */

        emit("on-select", selectedItems.value);
      }
    };
    return {
      selectedItems,
      onChange,
      onRowClick,
    };
  },
});
</script>

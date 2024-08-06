<template>
  <div class="d-flex flex-wrap align-items-center">
    <div v-if="totalInfoEnabled">
      <div class="fs-6 text-gray-700">
        Showing
        <span class="text-primary fw-semibold">{{ totalDataToDisplay }} </span>
        of
        <span class="text-primary fw-semibold">{{ count }} data</span>
      </div>
    </div>

    <div v-if="itemsPerPageDropdownEnabled" class="btn-group">
      <label
        v-if="itemsPerPageDropdownEnabled"
        class="svg-icon svg-icon-dark ms-2 fs-5"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <inline-svg
          :src="getMediaPath('icons/duotune/arrows/arr072.svg')"
        />
        <span class="fs-6 ms-2">{{ itemsCountInTable }}</span>
      </label>

      <ul class="dropdown-menu">
        <li @click="itemsCountInTable = 5">
          <span
            class="dropdown-item cursor-pointer text-dark"
            :class="itemsCountInTable == 5 ? 'active' : ''"
            >5</span
          >
        </li>
        <li @click="itemsCountInTable = 10">
          <span
            class="dropdown-item cursor-pointer text-dark"
            :class="itemsCountInTable == 10 ? 'active' : ''"
            >10</span
          >
        </li>
        <li @click="itemsCountInTable = 20">
          <span
            class="dropdown-item cursor-pointer text-dark"
            :class="itemsCountInTable == 20 ? 'active' : ''"
            >20</span
          >
        </li>
        <li @click="itemsCountInTable = 50">
          <span
            class="dropdown-item cursor-pointer text-dark"
            :class="itemsCountInTable == 50 ? 'active' : ''"
            >50</span
          >
        </li>
        <li @click="itemsCountInTable = 100">
          <span
            class="dropdown-item cursor-pointer text-dark"
            :class="itemsCountInTable == 100 ? 'active' : ''"
            >100</span
          >
        </li>
      </ul>

      <!-- <label
      v-if="itemsPerPageDropdownEnabled"
      class="svg-icon svg-icon-dark ms-2"
    >
      <inline-svg :src="getMediaPath('icons/duotune/arrows/arr072.svg')" />
    </label>

    <label for="items-per-page">
      <select
        style="text-decoration: none; background: transparent"
        class="form-select form-select-sm border-0"
        v-if="itemsPerPageDropdownEnabled"
        v-model="itemsCountInTable"
        name="items-per-page"
        id="items-per-page"
        ref="itemsPerPageSelect"
      >
        <option :value="6">6</option>
        <option :value="12">12</option>
        <option :value="24">24</option>
        <option :value="68">68</option>
      </select>
    </label> -->
    </div>
  </div>
</template>

<script lang="ts">
import { getMediaPath } from "@/core/helpers/assets";
import {
  defineComponent,
  ref,
  onMounted,
  type WritableComputedRef,
  computed,
} from "vue";

export default defineComponent({
  name: "table-items-per-page-select",
  components: {},
  props: {
    count: { type: Number, default: 0 },
    totalDataToDisplay: { type: Number, required: true, default: 0 },
    itemsPerPage: { type: Number, default: 10 },
    itemsPerPageDropdownEnabled: {
      type: Boolean,
      required: false,
      default: true,
    },
    totalInfoEnabled: { type: Boolean, required: false, default: false },
  },
  emits: ["update:itemsPerPage"],
  setup(props, { emit }) {
    const inputCount = ref(0);
    const inputTotalDataToDisplay = ref(0);
    const inputItemsPerPage = ref(10);
    const itemsPerPageSelect = ref<null | HTMLFormElement>(null);

    onMounted(() => {
      inputCount.value = props.count;
      inputTotalDataToDisplay.value = props.totalDataToDisplay;
      inputItemsPerPage.value = props.itemsPerPage;
    });

    const triggerSelect = () => {
      if (!itemsPerPageSelect.value) {
        return;
      }

      itemsPerPageSelect.value.click();
    };

    const itemsCountInTable: WritableComputedRef<number> = computed({
      get(): number {
        return props.itemsPerPage;
      },
      set(value: number): void {
        emit("update:itemsPerPage", value);
      },
    });

    return {
      inputCount,
      inputTotalDataToDisplay,
      itemsCountInTable,
      itemsPerPageSelect,
      triggerSelect,
      getMediaPath,
    };
  },
});
</script>

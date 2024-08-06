<template>
  <img
    v-if="columnOrder?.parameterName == name && columnOrder?.dir == 'asc'"
    class="h-20px w-20px cursor-pointer"
    :src="getMediaPath('icons/main/ic-sorting-upper.svg')"
    alt="Ascending"
  />
  <img
    v-else-if="columnOrder?.parameterName == name && columnOrder?.dir == 'desc'"
    class="h-20px w-20px cursor-pointer"
    :src="getMediaPath('icons/main/ic-sorting-lower.svg')"
    alt="Descending"
  />
  <img
    v-else
    class="h-20px w-20px cursor-pointer"
    :src="getMediaPath('icons/main/ic-sorting-default.svg')"
    alt="Default"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CustomColumnSorting",
  props: {
    name: String,
    order: Object,
  },
  setup(props) {
    const columnOrder = ref(props.order);
    const getMediaPath = (mediaPath: string): string => {
      return `media/${mediaPath}`;
    };

    return {
      columnOrder,
      getMediaPath,
    };
  },
  components: {},
});
</script>

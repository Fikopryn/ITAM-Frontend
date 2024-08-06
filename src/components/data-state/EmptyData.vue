<template>
  <div class="d-flex flex-column align-items-center">
    <img
      :src="getMediaPath(`${iconLink}`)"
      class="img-fluid mb-5 w-200px"
      alt=""
    />
    <p class="h5 fw-bold" style="color: #146bb8">{{ title }}</p>
    <p class="text-gray-500">{{ desc }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getMediaPath } from "@/core/helpers/assets";

export default defineComponent({
  name: "empty_data",
  setup() {
    return {
      getMediaPath,
    };
  },
  props: {
    title: { type: String, default: "" },
    desc: { type: String, default: "" },
    iconLink: { type: String, default: "" },
  },
});
</script>

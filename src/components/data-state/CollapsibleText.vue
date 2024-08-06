<template>
  <div class="collapsible-text">
    <div v-if="!isTextCollapse" class="fs-6" style="white-space: pre-wrap">
      {{ limitText(text, limit) }}
      <span v-if="text?.length > limit">... </span>
      <span
        v-if="text?.length > limit"
        class="text-primary cursor-pointer"
        @click="isTextCollapse = true"
        >read more</span
      >
    </div>
    <div v-else class="fs-6" style="white-space: pre-wrap">
      {{ text }}
      <span
        v-if="text?.length > limit"
        class="text-primary cursor-pointer"
        @click="isTextCollapse = false"
        >show less</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { limitText } from "@/core/helpers/common";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "collapsible-text",

  props: {
    limit: { type: Number, default: 400 },
    text: { type: String, default: "" },
  },
  setup() {
    const isTextCollapse = ref<boolean>(false);
    return { isTextCollapse, limitText };
  },
});
</script>

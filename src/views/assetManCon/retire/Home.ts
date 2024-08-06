import { useExampleStore } from "@/stores/example";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "repository-list",
  components: {},
  props: {},
  emits: [],
  setup() {
    const exampleStore = useExampleStore();

    const mounted = ref<boolean>(false);
    const loading = ref<boolean>(false);
    return { mounted, loading };
  },
});

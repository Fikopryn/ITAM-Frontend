import type { ILov } from "@/schema/ILov";
import type { IAdminCon } from "@/schema/admin-con/IAdminCon";
import { useExampleStore } from "@/stores/example";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "home",
  components: {},
  props: {},
  emits: [],
  setup() {
    const exampleStore = useExampleStore();
    const adminCon = ref<IAdminCon>({});
    const listOfOperatingCompany = ref<Array<ILov>>([
      { lovKey: "1", lovValue: "Berca" },
      { lovKey: "2", lovValue: "Agit" },
    ]);

    const mounted = ref<boolean>(false);
    const loading = ref<boolean>(false);

    const onSave = () => {};

    return { mounted, loading, adminCon, listOfOperatingCompany, onSave };
  },
});

import { getMediaPath } from "@/core/helpers/assets";
import { showModalById } from "@/core/helpers/dom";
import { defineComponent, ref, watch } from "vue";
import ModalImportData from "../modal-import-data/ModalImportData.vue";

export default defineComponent({
  name: "action-toolbar",
  components: { ModalImportData },
  props: {
    loading: { type: Boolean, default: false },
    obsolete: { type: Boolean, default: false },
    filter: { type: Boolean, default: false },
    redirectTo: { type: String, default: "" },
    showBtnObsolete: { type: Boolean, default: false },
    showBtnFilter: { type: Boolean, default: false },
    showBtnExport: { type: Boolean, default: false },
    showBtnCreate: { type: Boolean, default: false },
    showBtnImport: { type: Boolean, default: false },
    disabledBtnObsolete: { type: Boolean, default: false },
    disabledBtnFilter: { type: Boolean, default: false },
    disabledBtnExport: { type: Boolean, default: false },
    disabledBtnCreate: { type: Boolean, default: false },
    disabledBtnImport: { type: Boolean, default: false },
  },
  emits: ["update:obsolete", "update:filter", "export", "import"],
  setup(props, { emit }) {
    const exportToRef = ref<null | HTMLFormElement>(null);
    watch(
      () => props.loading,
      (val) => {
        if (val) {
          exportToRef.value!.disabled = true;
          exportToRef.value!.setAttribute("data-kt-indicator", "on");
        } else {
          exportToRef.value!.disabled = false;
          exportToRef.value!.setAttribute("data-kt-indicator", "of");
        }
      }
    );
    const showObsolete = (obsolete: boolean) => {
      emit("update:obsolete", !obsolete);
    };
    const showFilter = (filter: boolean) => {
      emit("update:filter", !filter);
    };
    const exportTo = (exportType: string) => {
      if (exportType) {
        emit("export", exportType);
      }
    };
    const onImport = () => {
      showModalById("modal_import_data");
    };

    return {
      getMediaPath,
      showFilter,
      showObsolete,
      exportTo,
      exportToRef,
      onImport,
    };
  },
});

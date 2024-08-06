import { defineComponent, ref, watch } from "vue";
import { getMediaPath } from "@/core/helpers/assets";
import type { UploadUserFile } from "element-plus";
import { errorPopUp } from "@/core/helpers/popup";
import { useFileReferenceStore } from "@/stores/fileReference";

export default defineComponent({
  name: "modal-import-data",
  components: {},
  props: {
    moduleUid: {
      type: String,
      default: "fc9a3917-68dd-4466-b3a8-58f6adee95ad",
    },
    moduleCode: { type: String, default: "POP" },
    loadingImport: { type: Boolean || undefined, default: undefined },
  },
  emits: ["on-import"],
  setup(props, { emit }) {
    const fileReferenceStore = useFileReferenceStore();

    const loading = ref<boolean>(false);
    const loadingFilter = ref<boolean>(false);
    const uploadedFile = ref<UploadUserFile[]>();
    const btnDownloadRef = ref<null | HTMLFormElement>(null);
    const btnImportRef = ref<null | HTMLFormElement>(null);

    watch(
      () => props.loadingImport,
      (val) => {
        if (val) {
          btnImportRef.value!.disabled = true;
          btnImportRef.value!.setAttribute("data-kt-indicator", "on");
        } else {
          uploadedFile.value = [];
          btnImportRef.value!.disabled = false;
          btnImportRef.value!.setAttribute("data-kt-indicator", "off");
        }
      }
    );
    const downloadFileTemplate = async () => {
      btnDownloadRef.value!.disabled = true;
      btnDownloadRef.value!.setAttribute("data-kt-indicator", "on");
      await fileReferenceStore.downloadTemplate({
        ModulCode: props.moduleCode,
        ModulName: "Template-" + props.moduleCode,
        FileNameExtention: "xlsx",
      });
      btnDownloadRef.value!.disabled = false;
      btnDownloadRef.value!.setAttribute("data-kt-indicator", "off");
    };

    const importFileTemplate = async () => {
      if (!uploadedFile.value || uploadedFile.value.length < 1) {
        errorPopUp({
          desc: "Please select a valid document to be imported",
        });
        return;
      }
      emit("on-import", uploadedFile.value);
    };

    return {
      loading,
      loadingFilter,
      getMediaPath,
      downloadFileTemplate,
      importFileTemplate,
      uploadedFile,
      btnDownloadRef,
      btnImportRef,
    };
  },
});

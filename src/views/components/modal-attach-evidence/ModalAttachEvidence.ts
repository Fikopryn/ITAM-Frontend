import { getMediaPath } from "@/core/helpers/assets";
import { Search, Close } from "@element-plus/icons-vue";
import { useFileReferenceStore } from "@/stores/fileReference";
import { defineComponent, onMounted, ref, watch } from "vue";
import { isRoleHasAccess } from "@/core/services/PermissionService";
import type { IDocumentInfo } from "@/schema/IDocumentInfo";

export default defineComponent({
  name: "modal-attach-evidence",
  components: { Close, Search },
  props: {
    modalId: { type: String, default: "modal_attach_evidence" },
    documentInfo: { type: Object as () => IDocumentInfo, default: () => {} },
    isFieldEdit: { type: Boolean, default: false },
    permission: { type: String, default: "" },
    module: {
      type: String as () => "CA" | "CAP" | "POP" | "PR",
      default: "CA",
    },
    status: { type: String, default: "REVIEWED" },
    modalTitle: { type: String, default: "Attach Evidence" },
  },
  emits: ["add-document"],
  setup(props, { emit }) {
    const loading = ref<boolean>(false);
    const hasAccess = ref<boolean>(false);
    const fileReferenceStore = useFileReferenceStore();
    const attachEvidenceOrigin = ref<IDocumentInfo>({
      link: "",
      documentId: "",
      document: [],
      documentExisting: [],
      deletedDocument: [],
    });
    const attachEvidence = ref<IDocumentInfo>({
      link: "",
      documentId: "",
      document: [],
      documentExisting: [],
      deletedDocument: [],
    });
    const flag = ref<string>("");
    onMounted(() => {
      hasAccess.value = isRoleHasAccess(props.permission);
    });

    watch(
      () => props.documentInfo,
      async (val) => {
        if (val?.documentId) await setDocumentInfo(val);
      }
    );
    watch(
      () => props.permission,
      (val) => {
        hasAccess.value = isRoleHasAccess(val);
      }
    );
    const getFileList = async (documentId) => {
      loading.value = true;

      return await fileReferenceStore
        .getFileList(documentId, props.module)
        .finally(() => {
          loading.value = false;
        });
    };
    const downloadDocument = (file) => {
      fileReferenceStore.downloadFile({
        FileNumber: file.fileNumber,
        ModulName: props.module,
        FileNameExtention: file.fileNameExtention,
      });
    };

    const setDocumentInfo = async (val) => {
      attachEvidenceOrigin.value = { ...val };
      attachEvidence.value.link = val.link;
      attachEvidence.value.document = val.document ?? [];

      if (!val.documentExisting || val.documentExisting.length == 0) {
        attachEvidence.value.documentExisting = await getFileList(
          val.documentId
        );
      } else {
        attachEvidence.value.documentExisting = val.documentExisting;
      }

      attachEvidence.value.deletedDocument = val.deletedDocument ?? [];
    };

    const onCancel = async () => {
      await setDocumentInfo(props.documentInfo);
    };

    const onAdd = () => {
      attachEvidence.value.deletedDocument = [
        ...new Set([
          ...attachEvidence.value.deletedDocument,
          ...attachEvidence.value.documentExisting.filter(
            (item) => item.isDeleted == true
          ),
        ]),
      ];
      emit("add-document", attachEvidence.value);
    };

    const isFieldEditable = () => {
      if (props.module == "CAP") {
        return (
          props.isFieldEdit &&
          !props.documentInfo.isDocumentCannotBeChanged &&
          props.status == "REVIEWED"
        );
      } else if (props.module == "CA") {
        return (
          props.isFieldEdit &&
          !props.documentInfo.isDocumentCannotBeChanged &&
          props.status == "REVIEWED"
        );
      } else if (props.module == "PR") {
        return props.isFieldEdit && props.status == "DRAFT";
      } else if (props.module == "POP") {
        return props.isFieldEdit && props.status == "REGISTERED";
      } else {
        return props.isFieldEdit && props.status == "REVIEWED";
      }
    };
    return {
      attachEvidence,
      onAdd,
      getMediaPath,
      downloadDocument,
      loading,
      isRoleHasAccess,
      hasAccess,
      onCancel,
      isFieldEditable,
    };
  },
});

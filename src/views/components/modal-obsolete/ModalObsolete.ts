import { defineComponent, ref, type PropType } from "vue";
import { Search } from "@element-plus/icons-vue";
import { confirmationPopUp } from "@/core/helpers/popup";
import { hideModal } from "@/core/helpers/dom";

export default defineComponent({
  name: "modal-obsolete",
  components: {},
  emits: ["submit-action"],
  props: {
    modalId: { type: String, required: true, default: "" },
    modalTitle: {
      type: String,
      required: false,
      default: "Obsolete",
    },
    moduleNumber: { type: String, required: false, default: "" },
  },
  setup(props, { emit }) {
    const loading = ref<boolean>(false);
    const obsoleteRulesRef = ref<null | HTMLFormElement>(null);
    const submitData = ref({ comment: "" });
    const modalObsolete = ref<null | HTMLFormElement>(null);
    const obsoleteRules = ref({
      comment: [
        {
          required: true,
          message: "Comment is required",
          trigger: "change",
        },
      ],
    });
    const onCancel = async () => {
      clearForm();
      hideModal(modalObsolete.value);
    };

    const onObsolete = async () => {
      obsoleteRulesRef.value!.validate(async (valid: boolean) => {
        if (valid) {
          hideModal(modalObsolete.value);

          const isValid = await confirmationPopUp({
            confirmText: "Yes, Obsolete",
            desc:
              `Are you sure you want to obsolete <span class="text-primary">` +
              props.moduleNumber +
              `</span> ?`,
          });
          if (isValid) {
            emit("submit-action", submitData.value.comment);
          }
        } else {
          return false;
        }
      });
    };

    const clearForm = () => {
      obsoleteRulesRef.value!.resetFields();
    };

    return {
      Search,
      loading,
      onCancel,
      onObsolete,
      submitData,
      obsoleteRules,
      obsoleteRulesRef,
      modalObsolete,
      clearForm,
    };
  },
});

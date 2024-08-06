import { defineComponent, ref, type PropType } from "vue";
import { Search } from "@element-plus/icons-vue";
import { confirmationPopUp } from "@/core/helpers/popup";
import { hideModal } from "@/core/helpers/dom";

import type { ISubmit } from "@/schema/ISubmit";

export default defineComponent({
  name: "modal-route",
  components: {},
  emits: ["submit-action"],
  props: {
    modalId: { type: String, required: true, default: "" },
    modalTitle: {
      type: String,
      required: false,
      default: "Validation and Comment",
    },
    commentRequired: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  setup(props, { emit }) {
    const loading = ref<boolean>(false);
    const routeRulesRef = ref<null | HTMLFormElement>(null);
    const submitData = ref<ISubmit>({ UID: "", revise: false });
    const modalRoute = ref<null | HTMLFormElement>(null);
    const routeRules = ref({
      remarks: [
        {
          required: true,
          message: "Remarks is required",
          trigger: "blur",
        },
      ],
    });
    const revise = async () => {
      if (props.commentRequired == false) {
        hideModal(modalRoute.value);
        const isValid = await confirmationPopUp({
          confirmText: "Yes, Revise",
          desc: `Your data will be saved automatically upon clicking revise. Are you sure you want to revise data?`,
        });
        if (isValid) {
          submitData.value.revise = true;
          emit("submit-action", submitData.value);
          clearForm();
        }
      } else {
        routeRulesRef.value!.validate(async (valid: boolean) => {
          if (valid) {
            hideModal(modalRoute.value);

            const isValid = await confirmationPopUp({
              confirmText: "Yes, Revise",
              desc: `Your data will be saved automatically upon clicking revise. Are you sure you want to revise data?`,
            });
            if (isValid) {
              submitData.value.revise = true;
              emit("submit-action", submitData.value);
              clearForm();
            }
          } else {
            return false;
          }
        });
      }
    };

    const validate = async () => {
      hideModal(modalRoute.value);
      const isValid = await confirmationPopUp({
        confirmText: "Yes, Validate",
        desc: `Your data will be saved automatically upon clicking validate. Are you sure you want to validate data?`,
      });
      if (isValid) {
        submitData.value.revise = false;
        emit("submit-action", submitData.value);
        clearForm();
      }
    };
    const clearForm = () => {
      if (!routeRulesRef.value) {
        return;
      }
      routeRulesRef.value.resetFields();
    };
    return {
      Search,
      loading,
      revise,
      validate,
      submitData,
      routeRules,
      routeRulesRef,
      modalRoute,
      clearForm,
    };
  },
});

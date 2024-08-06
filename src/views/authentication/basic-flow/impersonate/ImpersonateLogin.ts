import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useImpersonateStore } from "@/stores/impersonate";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { getMediaPath } from "@/core/helpers/assets";
import { popupSuccess, typeValue } from "@/components/notification/Popup";

export default defineComponent({
  name: "impersonate-login",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  data() {
    return {
      isPassVisible: false,
      vTypePassword: "password",
    };
  },
  setup() {
    const store = useImpersonateStore();

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const loginAs = Yup.object().shape({
      userId: Yup.string().required().label("User Id"),
    });

    //Form submit function
    const onSubmitLogin = async (userId: any) => {
      // Clear existing errors
      store.logoutImpersonate();

      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Send login request
      await store.loginImpersonate(userId);
      const error = Object.values(store.errors);
      if (error.length === 0) {
        popupSuccess({
          type: typeValue.success,
          desc: `You have successfully logged in as <span >${userId.userId}</span> `,
        });
      } else {
        //
      }

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    return {
      onSubmitLogin,
      loginAs,
      submitButton,
      getMediaPath,
    };
  },
});

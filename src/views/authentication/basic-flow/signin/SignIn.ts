import { defineComponent, ref, watch } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const router = useRouter();

    const submitButton = ref<HTMLButtonElement | null>(null);
    const isPassVisible = ref<boolean>(false);
    const vTypePassword = ref<string>("password");

    watch(
      () => store.loading,
      (val) => {
        if (val == true) {
          submitButton.value!.disabled = true;
          submitButton.value!.setAttribute("data-kt-indicator", "on");
        } else {
          submitButton.value!.disabled = false;
          submitButton.value!.setAttribute("data-kt-indicator", "off");
        }
      }
    );
    //Create form validation object
    const login = Yup.object().shape({
      username: Yup.string().required().label("username"),
      password: Yup.string().required().label("Password"),
    });

    //Form submit function
    const onSubmitLogin = async (values: any) => {
      // begin::Username custom validation
      const usernameLength = values.username.length;
      const indexOfDomain = values.username.indexOf("@");
      const indexOfBackslash = values.username.indexOf("\\");

      if (values.username.includes("pertamina.com")) {
        const getFullDomain = values.username.slice(
          indexOfDomain,
          usernameLength
        );
        values.username = values.username.replace(getFullDomain, "");
      }

      if (values.username.includes("\\")) {
        const getUserId = values.username.slice(
          indexOfBackslash + 1,
          usernameLength
        );

        values.username = getUserId;
      }
      // end::Username custom validation

      // start::Pass encryption
      const ao = values.password.split("").map((char) => {
        return char.charCodeAt(0);
      });
      let encpwd = "";
      for (const element of ao) {
        let sao: number;
        if (element + 78 > 126) sao = element - 17;
        else sao = element + 78;
        encpwd += String.fromCharCode(sao) + "";
      }
      encpwd = btoa(encpwd);
      values.password = encpwd;
      // end::Pass encryption

      values = values as User;
      // Clear existing errors
      store.logout();

      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Send login request
      await store.login(values);
      const error = Object.values(store.errors);

      if (error.length === 0) {
        // Go to page after successfully login
        router.push({ name: "dashboard" });
      }

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    const showPassword = (value) => {
      if (value == true) {
        isPassVisible.value = false;
        vTypePassword.value = "password";
      } else {
        isPassVisible.value = true;
        vTypePassword.value = "text";
      }
    };

    return {
      onSubmitLogin,
      login,
      submitButton,
      isPassVisible,
      vTypePassword,
      showPassword,
    };
  },
});

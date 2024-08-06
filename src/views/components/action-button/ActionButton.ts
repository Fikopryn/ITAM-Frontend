import { getMediaPath } from "@/core/helpers/assets";
import { isRoleHasAccess } from "@/core/services/PermissionService";
import UserService from "@/core/services/UserService";
import type { IGQUser } from "@/schema/IGlobalQuery";
import { computed, defineComponent } from "vue";
import { v4 as uuidv4 } from "uuid";
import ModalRoute from "../modal-route/ModalRoute.vue";

export default defineComponent({
  name: "action-button",
  components: { ModalRoute },
  props: {
    isFieldEdit: { type: Boolean, default: false },
    currentAssignment: { type: Array<IGQUser>, default: () => [] },

    showEditOnStatus: { type: Array<String>, default: () => [] },
    showSubmitOnStatus: { type: Array<String>, default: () => [] },
    showRouteOnStatus: { type: Array<String>, default: () => [] },

    currentStatus: { type: String, default: "NEW" },
    tenantKey: { type: String, default: "" },
    submitText: { type: String, default: "Submit" },

    module: { type: String, default: "REPO" },
  },
  emits: [
    "on-submit",
    "on-edit",
    "on-save",
    "on-cancel",
    "on-route",
    "on-not-obtained",
  ],
  setup(props, { emit }) {
    const userInfo = UserService.getUserInfo();
    const randomId = uuidv4();
    const modalId = "modal" + randomId;
    const modalRouteTitle = computed(() =>
      props.module == "CA" ? "Validation" : "Validation and Comment"
    );
    const modalCommentRequired = computed(() =>
      props.module == "CA" ? false : true
    );
    const enabledEdit = computed(() => {
      console.log("props.module ", props.module);
      if (props.module == "POP") {
        if (isRoleHasAccess("RO", props.tenantKey)) {
          return true;
        }
      }
      if (isRoleHasAccess("ADMIN", props.tenantKey)) {
        return true;
      }
      if (props.module == "CAP") {
        if (isRoleHasAccess("ROCAP", props.tenantKey)) {
          return true;
        }
        if (isRoleHasAccess("VALIDATORCAP", props.tenantKey)) {
          return true;
        }
      }
      if (props.module == "CA") {
        const isExist = props.currentAssignment.findIndex(
          (item) => item.USERID?.toUpperCase() == userInfo.userId?.toUpperCase()
        );

        if (isExist != -1) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    });

    const enabledRoute = computed(() => {
      if (isRoleHasAccess("ADMIN", props.tenantKey)) {
        return true;
      }

      const isExist = props.currentAssignment.findIndex(
        (item) => item.USERID?.toUpperCase() == userInfo.userId?.toUpperCase()
      );

      if (isExist != -1) {
        return true;
      } else {
        return false;
      }
    });

    const enabledSubmit = computed(() => {
      if (isRoleHasAccess("ADMIN", props.tenantKey)) {
        return true;
      }
      if (isRoleHasAccess("ROCAP", props.tenantKey)) {
        return true;
      }
      if (isRoleHasAccess("VALIDATORCAP", props.tenantKey)) {
        return true;
      }
      const isExist = props.currentAssignment.findIndex(
        (item) => item.USERID?.toUpperCase() == userInfo.userId?.toUpperCase()
      );

      if (isExist != -1) {
        return true;
      } else {
        return false;
      }
    });

    const showEditButton = computed(() => {
      const hasAccess = props.showEditOnStatus.findIndex(
        (item) => item == props.currentStatus
      );
      if (hasAccess != -1) {
        return true;
      } else {
        return false;
      }
    });
    const showSubmitButton = computed(() => {
      const hasAccess = props.showSubmitOnStatus.findIndex(
        (item) => item == props.currentStatus
      );
      if (hasAccess != -1) {
        return true;
      } else {
        return false;
      }
    });
    const showRouteButton = computed(() => {
      const hasAccess = props.showRouteOnStatus.findIndex(
        (item) => item == props.currentStatus
      );
      if (hasAccess != -1) {
        return true;
      } else {
        return false;
      }
    });
    const showNotObtainedButton = computed(() => {
      if (props.module == "PR") {
        const hasAccess = props.showSubmitOnStatus.findIndex(
          (item) => item == props.currentStatus
        );
        if (hasAccess != -1) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });

    const enabledNotObtained = computed(() => {
      if (isRoleHasAccess("ADMIN", props.tenantKey)) {
        return true;
      }
      const isExist = props.currentAssignment.findIndex(
        (item) => item.USERID?.toUpperCase() == userInfo.userId?.toUpperCase()
      );

      if (isExist != -1) {
        return true;
      } else {
        return false;
      }
    });

    const editText = computed(() => {
      let edtTxt = "Edit";
      if (props.module == "CA" || props.module == "CAP") {
        switch (props.currentStatus) {
          case "SENT FOR VALIDATION":
            edtTxt = "Validate";
            break;
          case "REVIEWED":
            edtTxt = "Attach Evidence";
            break;
        }
      } else if (
        props.module == "POP" &&
        !isRoleHasAccess("ADMIN", props.tenantKey)
      ) {
        switch (props.currentStatus) {
          case "REGISTERED":
            edtTxt = "Attach Evidence";
            break;
        }
      }
      return edtTxt;
    });

    const onEdit = () => {
      emit("on-edit", true);
    };
    const onSave = () => {
      emit("on-save", true);
    };
    const onCancel = () => {
      emit("on-cancel", true);
    };
    const onSubmit = () => {
      emit("on-submit", true);
    };
    const onRoute = ($event) => {
      emit("on-route", $event);
    };
    const onNotObtained = () => {
      emit("on-not-obtained", true);
    };

    return {
      getMediaPath,
      onEdit,
      onSave,
      onCancel,
      onSubmit,
      isRoleHasAccess,
      enabledEdit,
      enabledSubmit,
      enabledNotObtained,
      showNotObtainedButton,
      showEditButton,
      showSubmitButton,
      onRoute,
      modalId,
      showRouteButton,
      enabledRoute,
      onNotObtained,
      editText,
      modalRouteTitle,
      modalCommentRequired,
    };
  },
});

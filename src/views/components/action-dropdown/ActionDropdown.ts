import { showModalById } from "@/core/helpers/dom";
import { getMediaPath } from "@/core/helpers/assets";
import { isRoleHasAccess } from "@/core/services/PermissionService";
import TenantService from "@/core/services/TenantService";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import ModalObsolete from "../modal-obsolete/ModalObsolete.vue";

export default defineComponent({
  name: "action-dropdown",
  components: { ModalObsolete },
  props: {
    currentStatus: { type: String, default: "NEW" },
    tenantKey: { type: String, default: "" },
    modulename: { type: String, default: "" },
    moduleNumber: { type: String, default: "" },
    index: { type: Number || undefined, default: undefined },
  },
  emits: ["on-obsolete", "on-destroy"],
  setup(props, { emit }) {
    const listSelectedTenantAdmin = TenantService.getSelectedTenant(
      "key",
      "admin"
    );
    const showDestroyBtn = computed(() => {
      if (props.modulename == "REPO" || props.modulename == "PR") {
        if (isRoleHasAccess("SUPERADMIN")) return true;
        else return false;
      } else if (
        props.modulename == "AR" ||
        props.modulename == "CA" ||
        props.modulename == "RA" ||
        props.modulename == "CAP" ||
        props.modulename == "POP" ||
        props.modulename == "PRA" ||
        props.modulename == "OP"
      ) {
        if (hasAccess()) return true;
        else return false;
      } else {
        return false;
      }
    });
    const showObsoleteBtn = computed(() => {
      if (props.currentStatus != "OBSOLETE") {
        if (props.modulename == "REPO" && isRoleHasAccess("SUPERADMIN")) {
          return true;
        }
        if (
          props.modulename == "CA" ||
          props.modulename == "PR" ||
          props.modulename == "OP"
        ) {
          return isRoleHasAccess("ADMIN") || isRoleHasAccess("SUPERADMIN");
        }
      }
      return false;
    });

    const hasAccess = () => {
      const isExist = listSelectedTenantAdmin.findIndex(
        (item) => item == props.tenantKey
      );
      if (isExist != -1) return true;
      else return false;
    };

    onMounted(() => {});

    const onDestroy = () => {
      emit("on-destroy", true);
    };

    const onObsolete = (comment) => {
      emit("on-obsolete", comment);
    };

    return {
      getMediaPath,
      onDestroy,
      onObsolete,
      showDestroyBtn,
      showObsoleteBtn,
      hasAccess,
      showModalById,
    };
  },
});

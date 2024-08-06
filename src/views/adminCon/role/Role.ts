import type { ITableHeader } from "@/schema/ITableHeader";
import type { IRole } from "@/schema/admin-con/IRole";
import { computed, defineComponent, onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getMediaPath } from "@/core/helpers/assets";
import { getValueFromList } from "@/core/helpers/common";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { formatDate } from "@/core/helpers/common";
import type { ILov } from "@/schema/ILov";
import { useRoleStore } from "@/stores/adminCon/role";
import { successPopUp } from "@/core/helpers/popup";
export default defineComponent({
  name: "role-admincon",
  components: { Datatable },
  setup() {
    const roleStore = useRoleStore();

    const loading = ref<boolean>(false);
    const loadingFilter = computed(() => roleStore.loading);

    const isFieldEdit = ref<boolean>(false);
    const filter = ref<any>({});
    const roleHeader = ref<Array<ITableHeader>>([
      {
        columnName: "Role ID",
        columnLabel: "roleId",
        sortEnabled: true,
      },
      {
        columnName: "Role Name",
        columnLabel: "roleName",
        sortEnabled: true,
      },
      {
        columnName: "Role Description",
        columnLabel: "roleDescription",
        columnWidth: "300",
        sortEnabled: true,
      },
      {
        columnName: "Last Modified Date",
        columnLabel: "lastModifiedDate",
        sortEnabled: true,
      },
      {
        columnName: "Modified By",
        columnLabel: "modifiedBy",
        sortEnabled: true,
      },
      {
        columnName: "Association Status",
        columnLabel: "associationStatus",
        sortEnabled: true,
      },
    ]);
    const roleRules = ref({
      // roleId: [
      //   {
      //     required: true,
      //     message: "Role Id is required",
      //     trigger: "focus",
      //   },
      // ],
      roleName: [
        {
          required: true,
          message: "Role Name is required",
          trigger: "focus",
        },
      ],
      roleDescription: [
        {
          required: true,
          message: "Role Description is required",
          trigger: "focus",
        },
      ],
      associationStatus: [
        {
          required: true,
          message: "Association Status is required",
          trigger: "focus",
        },
      ],
    });

    const roleFormRef = ref<null | HTMLFormElement>(null);
    const listOfSample = ref<Array<ILov>>([
      { lovKey: "RoleName", lovValue: "RoleName Sample 1" },
    ]);

    const roleDetails = computed({
      get: () => ref<IRole>({ ...roleStore.roleDetails }).value,
      set: (val) => {
        roleStore.roleDetails = val;
      },
    });

    const roleList = computed(
      () => ref<Array<IRole>>([...(roleStore.getRoleList1 ?? [])]).value
    );

    const rolePageInfo = computed(() => roleStore.roleList);

    onMounted(() => {
      getRole();
      getRoleList();
    });

    const getRole = () => {
      roleStore.getRole();
    };

    const getRoleList = () => {
      roleStore.getRoleList();
    };

    const onSave = () => {
      roleFormRef.value!.validate(async (valid) => {
        if (valid) {
          if (roleDetails.value.roleId) {
            const rest = await roleStore.updateRole(roleDetails.value);
            if (rest == true) {
              successPopUp({ desc: "Berhasil Update Data" });
              getRole();
            }
          } else {
            const rest = await roleStore.createRole(roleDetails.value);
            if (rest == true) {
              successPopUp({ desc: "Berhasil Menyimpan Data" });
              getRoleList();
            }
          }
          //roleStore.saveRole(roleDetails.value);
        }
      });
    };

    const onClear = () => {
      roleDetails.value = {};
      roleFormRef.value!.resetFields();
    };

    const onSearch = () => {
      roleStore.getRole(roleDetails.value);
    };

    const onEdit = (role: IRole) => {
      roleDetails.value = { ...role };
    };

    return {
      listOfSample,
      loading,
      isFieldEdit,
      roleHeader,
      roleList,
      roleDetails,
      roleRules,
      roleFormRef,
      onSave,
      onSearch,
      onClear,
      Search,
      getMediaPath,
      loadingFilter,
      filter,
      getValueFromList,
      formatDate,
      rolePageInfo,
      onEdit,
    };
  },
});

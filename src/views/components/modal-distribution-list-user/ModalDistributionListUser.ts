import { Search } from "@element-plus/icons-vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { ITableHeader } from "@/schema/ITableHeader";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useR3DataManagementStore } from "@/stores/r3DataManagement";
import type { IGQUser } from "@/schema/IGlobalQuery";

export default defineComponent({
  name: "modal-distribution-list-user",
  components: { Datatable },
  props: { selectedUser: { type: Array<IGQUser>, default: () => [] } },
  emits: ["update:selectedUser"],
  setup(props, { emit }) {
    const loading = ref<boolean>(false);
    const loadingFilter = ref<boolean>(false);
    const r3DataManagementStore = useR3DataManagementStore();
    const distributionListDepartmentHeader = ref<Array<ITableHeader>>([
      {
        columnName: "Username",
        columnLabel: "USERNAME",
        sortEnabled: true,
      },
      {
        columnName: "Email Address",
        columnLabel: "EMAIL",
        sortEnabled: true,
      },
      {
        columnName: "User Group",
        columnLabel: "SYSROLE",
        sortEnabled: true,
      },
    ]);
    const filter = ref<any>({
      timer: 800,
      searchValue: "",
      itemPerPage: 5,
    });
    const selectedValue = ref<any>([]);
    const userList = ref<Array<IGQUser>>([]);
    const userListOrigin = ref<Array<IGQUser>>([]);
    const dataToDisplay = ref<number>(0);
    onMounted(() => {
      loadingFilter.value = true;
      r3DataManagementStore.getUserList()?.finally(() => {
        loadingFilter.value = false;
      });
    });

    watch(
      () => r3DataManagementStore.userList,
      (val) => {
        userList.value = [...val];
        userListOrigin.value = [...val];
      }
    );

    const getSelectedUser = (users) => {
      // console.log(users);
    };

    const onAdd = () => {
      emit("update:selectedUser", [...selectedValue.value]);
    };

    const onCancel = () => {
      const _selectedUser = [...props.selectedUser];
      emit("update:selectedUser", _selectedUser);
    };

    const onFilter = async () => {
      loadingFilter.value = true;
      if (filter.value.timer) {
        clearTimeout(filter.value.timer);
        filter.value.timer = null;
      }
      filter.value.timer = setTimeout(() => {
        if (filter.value.searchValue) {
          userList.value = [...userListOrigin.value].filter(
            (item) =>
              item.USERNAME?.toLowerCase().includes(
                filter.value.searchValue?.toLowerCase()
              ) ||
              item.EMAIL?.toLowerCase().includes(
                filter.value.searchValue?.toLowerCase()
              ) ||
              item.SYSROLE?.toLowerCase().includes(
                filter.value.searchValue?.toLowerCase()
              )
          );
        } else {
          userList.value = [...userListOrigin.value];
        }

        loadingFilter.value = false;
      }, 300);
    };

    return {
      Search,
      filter,
      loading,
      loadingFilter,
      distributionListDepartmentHeader,
      userList,
      selectedValue,
      onAdd,
      onFilter,
      getSelectedUser,
      onCancel,
      dataToDisplay,
    };
  },
});

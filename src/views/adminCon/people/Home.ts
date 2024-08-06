import type { IPeople } from "@/schema/people/IPeople";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "home",
  components: {},
  props: {},
  emits: [],
  setup() {
    const people = ref<IPeople>();

    const tableData: IPeople[] = [
      {
        company: "PHI HOLDING",
        userId: "ARGO.WUYANTO",
        username: "Argo Wuyanto",
        email: "ARGO.WUYANTO@PERTAMINA.COM",
        fungsi: "SUBSURFACE EXPLORATION AREA 1",
        subFunction: "",
        section: "0",
      },
      {
        company: "PHI HOLDING",
        userId: "BEFRIKO.MURDIANTO",
        username: "Befriko Saparinda Murdianto",
        email: "BEFRIKO.MURDIANTO@PERTAMINA.COM",
        fungsi: "SUBSURFACE EXPLORATION AREA 1",
        subFunction: "",
        section: "",
      },
      {
        company: "PERTAMINA HULU MAHAKAM",
        userId: "SUHANTORO.SUHANTORO ",
        username: "Suhantoro",
        email: "SUHANTORO.SUHANTORO@PERTAMINA.COM",
        fungsi: "PRODUCTION",
        subFunction: "SENIPAH. PECIKO & SOUTH MAHAKAM SITE",
        section: "Production SNP & ROW",
      },
      {
        company: "PERTAMINA HULU MAHAKAM",
        userId: "HUDAN-WIRA.ALAM",
        username: "Hudan Wira Alam",
        email: "HUDAN-WIRA.ALAM@PERTAMINA.COM",
        fungsi: "SUBSURFCAE DEVELOPMENT & PLANNING",
        subFunction: "DEVELOPMENT & PLANNING",
        section: "",
      },
      {
        company: "PT.ORYX SERVICES",
        userId: "MK.ALWI.CANDRA",
        username: "Alwi Chandra",
        email: "MK.ALWI.CANDRA@PERTAMINA.COM",
        fungsi: "HUMAN CAPITAL",
        subFunction: "HCBP REGIONAL",
        section: "HC Services & Support",
      },
      {
        company: "PERTAMINA HULU MAHAKAM",
        userId: "RANI.HERESPATIAGNI",
        username: "Rani Herespatiagni",
        email: "RANI.HERESPATIAGNI@PERTAMINA.COM",
        fungsi: "HSSE OPERATIONS ZONA 8",
        subFunction: "",
        section: "Health",
      },
      {
        company: "PT RADIANT UTAMA INTERINSCO",
        userId: "MK.RINA.MOKODOMPIT",
        username: "Rina Mokodompit",
        email: "MK.RINA.MOKODOMPIT@MITRAKERJA.PERTAMINA.COM",
        fungsi: "FINANCE",
        subFunction: "FINANCE ACCOUNTING & REPORTING",
        section: "Operation Accounting",
      },
      {
        company: "PERTAMINA HULU MAHAKAM",
        userId: "MAHENDRA-RIAN.PUTRA",
        username: "Mahendra Rian Putra",
        email: "MAHENDRA-RIAN.PUTRA@PERTAMINA.COM",
        fungsi: "DRILING & WELL INTERVENTION",
        subFunction: "WELL INTERVENTION",
        section: "Offshore WLI Operations",
      },
      {
        company: "PT.INCONIS",
        userId: "6472040507710005",
        username: "kris Biantoro",
        email: "YUNIARSIH73@GMAIL.COM",
        fungsi: "PROJECTS",
        subFunction: "PROJECT ENGINEERING & PLANNING",
        section: "",
      },
    ];

    const filterTableData = computed(() =>
      tableData.filter(
        (data) =>
          !search.value ||
          data.company.toLowerCase().includes(search.value.toLowerCase()) ||
          data.company.toLowerCase().includes(search.value.toLowerCase()) ||
          data.username.toLowerCase().includes(search.value.toLowerCase()) ||
          data.userId.toLowerCase().includes(search.value.toLowerCase()) ||
          data.tag.toLowerCase().includes(search.value.toLowerCase())
      )
    );

    const mounted = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const dialogDetailVisible = ref(false);
    const currentPage = ref(1);
    const pageSize = ref(5);
    const small = ref(false);
    const background = ref(false);
    const disabled = ref(false);
    const formLabelWidth = "140px";

    const search = ref("");

    const filterHandler = (
      value: string,
      row: IPeople,
      column: TableColumnCtx<IPeople>
    ) => {
      const property = column["property"];
      return row[property] === value;
    };

    const filterTag = (value: string, row: IPeople) => {
      return row.tag === value;
    };

    const handleEdit = (index: number, row: IPeople) => {
      console.log(index, row);
    };
    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`);
    };
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`);
    };

    const onSave = () => {};

    return {
      mounted,
      loading,
      people,
      dialogDetailVisible,
      currentPage,
      pageSize,
      search,
      small,
      background,
      disabled,
      formLabelWidth,
      filterTableData,
      handleEdit,
      handleSizeChange,
      handleCurrentChange,
      filterTag,
      filterHandler,
      onSave,
    };
  },
});

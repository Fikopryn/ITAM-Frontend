import type { IProdCat } from "@/schema/prodCat/IProdCat";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "home",
  components: {},
  props: {},
  emits: [],
  setup() {
    const prodCat = ref<IProdCat>();

    const tableData: IProdCat[] = [
      {
        comp: "TJTM",
        tier1: "TEL",
        tier2: "ACS",
        tier3: "Reader",
        get prodName() {
          return this.manu + " " + this.model;
        },
        manu: "Siemens",
        model: "AR6181MX",
        tag: "Enable",
        lastMod: "17/01/2024",
        modBy: "Wahyu Kurniawan",
      },
      {
        comp: "TJTM",
        tier1: "INF",
        tier2: "ACS",
        tier3: "Interface",
        get prodName() {
          return this.manu + " " + this.model;
        },
        manu: "Moxa",
        model: "ADD5100",
        tag: "Disable",
        lastMod: "17/01/2024",
        modBy: "Wahyu Kurniawan",
      },
      {
        comp: "TJTM",
        tier1: "EUS",
        tier2: "CCTV",
        tier3: "Camera",
        get prodName() {
          return this.manu + " " + this.model;
        },
        manu: "Pelco",
        model: "P1220-FWH1",
        tag: "Disable",
        lastMod: "17/01/2024",
        modBy: "Wahyu Kurniawan",
      },
      {
        comp: "Sisindo",
        tier1: "TEL",
        tier2: "Network",
        tier3: "Access Point",
        get prodName() {
          return this.manu + " " + this.model;
        },
        manu: "Cisco",
        model: "AIR-CAP3501I-E-K9",
        tag: "Enable",
        lastMod: "17/01/2024",
        modBy: "Wahyu Kurniawan",
      },
      {
        comp: "Sisindo",
        tier1: "TEL",
        tier2: "Network",
        tier3: "Router",
        get prodName() {
          return this.manu + " " + this.model;
        },
        manu: "Cisco",
        model: "2911/K9",
        tag: "Enable",
        lastMod: "17/01/2024",
        modBy: "Wahyu Kurniawan",
      },
      {
        comp: "Sisindo",
        tier1: "TEL",
        tier2: "Network",
        tier3: "SFP",
        get prodName() {
          return this.manu + " " + this.model;
        },
        manu: "Cisco",
        model: "GLC-LH-SM",
        tag: "Disable",
        lastMod: "17/01/2024",
        modBy: "Wahyu Kurniawan",
      },
      {
        comp: "Sisindo",
        tier1: "TEL",
        tier2: "Network",
        tier3: "Switch",
        get prodName() {
          return this.manu + " " + this.model;
        },
        manu: "Cisco",
        model: "WS-2960-24TC-L",
        tag: "Enable",
        lastMod: "17/01/2024",
        modBy: "Wahyu Kurniawan",
      },
      {
        comp: "Sisindo",
        tier1: "TEL",
        tier2: "VoIP",
        tier3: "IP Phone",
        get prodName() {
          return this.manu + " " + this.model;
        },
        manu: "Cisco",
        model: "7945",
        tag: "Enable",
        lastMod: "17/01/2024",
        modBy: "Wahyu Kurniawan",
      },
      {
        comp: "Sisindo",
        tier1: "TEL",
        tier2: "VoIP",
        tier3: "VG",
        get prodName() {
          return this.manu + " " + this.model;
        },
        manu: "Cisco",
        model: "224",
        tag: "Enable",
        lastMod: "17/01/2024",
        modBy: "Wahyu Kurniawan",
      },
      {
        comp: "Sisindo",
        tier1: "TEL",
        tier2: "VoIP",
        tier3: "IP Phone",
        get prodName() {
          return this.manu + " " + this.model;
        },
        manu: "Cisco",
        model: "6921",
        tag: "Enable",
        lastMod: "17/01/2024",
        modBy: "Wahyu Kurniawan",
      },
      {
        comp: "TJTM",
        tier1: "TEL",
        tier2: "PABX",
        tier3: "Analog Phone",
        get prodName() {
          return this.manu + " " + this.model;
        },
        manu: "Panasonic",
        model: "KX-T7703X",
        tag: "Enable",
        lastMod: "17/01/2024",
        modBy: "Wahyu Kurniawan",
      },
      {
        comp: "TJTM",
        tier1: "TEL",
        tier2: "PABX",
        tier3: "Card",
        get prodName() {
          return this.manu + " " + this.model;
        },
        manu: "",
        model: "eZ32-2 ",
        tag: "Disable",
        lastMod: "17/01/2024",
        modBy: "Wahyu Kurniawan",
      },
    ];

    const filterTableData = computed(() =>
      tableData.filter(
        (data) =>
          !search.value ||
          data.prodName.toLowerCase().includes(search.value.toLowerCase()) ||
          data.tier1.toLowerCase().includes(search.value.toLowerCase()) ||
          data.tier2.toLowerCase().includes(search.value.toLowerCase()) ||
          data.tier3.toLowerCase().includes(search.value.toLowerCase()) ||
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
      row: IProdCat,
      column: TableColumnCtx<IProdCat>
    ) => {
      const property = column["property"];
      return row[property] === value;
    };

    const filterTag = (value: string, row: IProdCat) => {
      return row.tag === value;
    };

    const handleEdit = (index: number, row: IProdCat) => {
      console.log(index, row)
    }
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
      prodCat,
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

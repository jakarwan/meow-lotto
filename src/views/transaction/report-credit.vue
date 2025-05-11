<template>
  <b-card title="รายการเครดิตเข้า-ออก">
    <div class="custom-search">
      <!-- advance search input -->
      <b-row class="align-items-end">
        <b-col md="3">
          <b-form-group>
            <label>เบอร์โทรศัพท์:</label>
            <b-form-input
              v-model="filter.phone"
              type="text"
              class="d-inline-block"
              maxlength="10"
              @input="getData()"
            />
          </b-form-group>
        </b-col>
        <b-col md="9">
          <b-form-group>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="button"
              variant="success"
              class="float-left"
              @click="handleSearch"
            >
              <feather-icon icon="SearchIcon" class="mr-50" />
              <span class="align-middle">ค้นหา</span>
            </b-button>
          </b-form-group>
        </b-col>
      </b-row>
    </div>

    <vue-good-table
      mode="remote"
      :columns="columns"
      :rows="rows"
      :total-rows="totalRecords"
      :rtl="direction"
      :is-loading.sync="isLoading"
      :search-options="{
        enabled: true,
        externalQuery: searchTerm,
      }"
      :pagination-options="{
        enabled: true,
      }"
      @on-sort-change="onSortChange"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field === 'num'">
          <span>{{ props.row.originalIndex + 1 }}</span>
        </span>
        <span v-if="props.column.field === 'u_fullname'">
          <span>{{ props.row.name }} {{ props.row.familyName }}</span>
        </span>
        <span v-if="props.column.field === 'credit_pre'">
          <span>{{ numberWithCommas(props.row.credit_previous) }}</span>
        </span>
        <span v-if="props.column.field === 'credit_af'">
          <span>{{ numberWithCommas(props.row.credit_after) }}</span>
        </span>
        <span v-if="props.column.field === 'date_deposite'">
          <span>{{ formatDateTime(props.row.created_at) }}</span>
        </span>
        <span v-if="props.column.field === 'lotto_name'">
          <!-- <span class="badge bg-success" v-if="props.row.type != 'คืนเครดิต'">
              + {{ props.row.amount }}</span
            >
            <span class="badge bg-danger" v-else> - {{ props.row.amount }}</span> -->
          <span>{{ props.row.lotto_type_name }} </span>
          <div>
            {{ formatDate(props.row.installment) }}
          </div>
        </span>
        <span v-if="props.column.field === 'total_prize'">
          <span class="badge bg-success" v-if="props.row.prize != null">
            + {{ props.row.prize }}</span
          >
          <span v-else>-</span>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

      <!-- pagination -->
      <template slot="pagination-bottom" slot-scope="props">
        <div class="d-flex justify-content-between flex-wrap">
          <!-- page length -->
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap"> รายการที่แสดง </span>
            <b-form-select
              v-model="pageLength"
              :options="pages"
              class="mx-1"
              @input="handlePageChange"
            />
            <span class="text-nowrap"> ทั้งหมด {{ props.total }} รายการ </span>
          </div>

          <!-- pagination -->
          <div>
            <b-pagination
              :value="1"
              :total-rows="props.total"
              :per-page="pageLength"
              first-number
              last-number
              align="right"
              prev-class="prev-item"
              next-class="next-item"
              class="mt-1 mb-0"
              @change="handleChangePage"
            >
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
          </div>
        </div>
      </template>

      <template slot="loadingContent"> Loading </template>
    </vue-good-table>
  </b-card>
</template>

<script>
import {
  BPagination,
  BFormGroup,
  BFormSelect,
  BDropdownItem,
  BDropdown,
  BRow,
  BCol,
  BButton,
  BCard,
  BFormInput,
  BModal,
  BFormTextarea,
  BForm,
} from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import Ripple from "vue-ripple-directive";
import store from "@/store/index";
import { HTTP } from "@/services/http-common";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { BFormCheckbox } from "bootstrap-vue";
import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, integer } from "@validations";
import moment from "moment";

export default {
  components: {
    VueGoodTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdownItem,
    BDropdown,
    BCol,
    BRow,
    BButton,
    BCard,
    BFormCheckbox,
    BModal,
    BFormTextarea,
    BForm,
    vSelect,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      modelId: this.$route.params.modelId,
      log: [],
      isLoading: false,
      currentPage: 1,
      pageLength: 10,
      totalRecords: 0,
      sort: [
        {
          field: "",
          sort: "",
        },
      ],
      dir: false,
      pages: ["5", "10", "25"],
      columns: [
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "ลำดับ",
          field: "num",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "ชื่อ-สกุล",
          field: "u_fullname",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "เบอร์โทรศัพท์",
          field: "phone",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "เครดิตก่อน",
          field: "credit_pre",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "เครดิตหลัง",
          field: "credit_af",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "รายละเอียด",
          field: "note",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "วันที่",
          field: "date_deposite",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "ประเภทหวย (งวด)",
          field: "lotto_name",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "ถูกรางวัล",
          field: "total_prize",
        },
        // {
        //   thClass: "text-center",
        //   tdClass: "text-center",
        //   label: "ผู้ทำรายการ",
        //   field: "fullname",
        // },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "",
          field: "action",
          sortable: false,
          width: "64px",
        },
      ],
      rows: [],
      searchTerm: "",
      filter: {
        phone: "",
      },
      form: {
        prize3top: "",
        prize2bottom: "",
        typeHuay: "",
        type: "",
        type3top: "3 ตัวบน",
        type2bottom: "2 ตัวล่าง",
      },
      optionsType: ["3 ตัวบน", "3 ตัวโต๊ด", "2 ตัวบน", "2 ตัวล่าง"],
      optionsTypeHuay: [],
      required,
      integer,
      dataCredit: "",
      dataDisCredit: "",
      max: 3,
    };
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true;
        return this.dir;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false;
      return this.dir;
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    // this.fetchTypeHuay();
  },
  methods: {
    getData() {
      this.isLoading = true;
      HTTP.get("api/admin/prize-log/credit-log", {
        params: {
          // search: this.searchTerm,
          perPage: this.pageLength,
          page: this.currentPage,
          phone: this.filter.phone != "" ? this.filter.phone : undefined,
        },
      })
        .then((response) => {
          this.rows = response.data.data.data;
          this.totalRecords = response.data.data.total;
          // console.log(this.rows)
          this.isLoading = false;
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "แจ้งเตือน",
              text:
                error.response.data.msg !== undefined
                  ? error.response.data.msg
                  : error.status,
              icon: "XCircleIcon",
              variant: "danger",
            },
          });
          this.isLoading = false;
        });
    },
    handleSearch() {
      this.getData();
    },
    handleChangePage(page) {
      this.currentPage = page;
      this.getData();
    },
    handlePageChange(active) {
      this.perPage = active;
      this.getData();
    },
    onSortChange(params) {
      this.sort[0].field = params[0].field;
      this.sort[0].sort = params[0].type;
      this.getData();
    },
    showModalAddPrize() {
      this.form.credit = 0;
      this.form.note = "";
      this.form.type = "";
      this.$refs.modalAddPrize.show();
    },
    showToast(text, variant) {
      this.$toast({
        component: ToastificationContent,
        position: "top-right",
        props: {
          title: "แจ้งเตือน...",
          text: text,
          icon: variant === "success" ? "CheckIcon" : "BellIcon",
          variant: variant,
        },
      });
    },
    formatDateTime(date) {
      return moment(date).format("DD-MM-YYYY HH:mm:ss");
    },
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    numberWithCommas(x) {
      let sum = 0;
      if (x) {
        sum = x;
      }
      return x
        ? parseFloat(sum)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : 0;
    },
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-good-table.scss";
</style>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>

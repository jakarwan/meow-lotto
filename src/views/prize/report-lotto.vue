<template>
  <b-card title="รายการสรุปยอดหวย">
    <div class="custom-search">
      <!-- advance search input -->
      <b-row class="align-items-end">
        <b-col cols="12" md="3">
          <b-form-group>
            <h5 class="font-weight-bold">วันที่</h5>
            <flat-pickr
              v-model="form.startDate"
              class="form-control"
              @input="getData()"
              :config="{ dateFormat: 'Y-m-d' }"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="3">
          <b-form-group>
            <h5 class="font-weight-bold">ถึงวันที่</h5>
            <flat-pickr
              v-model="form.endDate"
              class="form-control"
              @input="getData()"
              :config="{ dateFormat: 'Y-m-d' }"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
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
    <b-overlay
      :show="OverlayFlag"
      spinner-variant="primary"
      spinner-type="grow"
      spinner-small
      rounded="sm"
    >
      <div style="overflow-x: auto; padding: 0">
        <h4 class="m-1"><b>สรุปยอดรวม</b></h4>
        <table class="table">
          <thead>
            <tr class="text-center">
              <th>ลำดับ</th>
              <th>หวย</th>
              <th>ยอดแทง</th>
              <th>ส่วนลด</th>
              <th>ยอดถูกรางวัล</th>
              <th>ได้/เสีย</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(data, index) in rows"
              :key="index"
              class="text-center"
              :class="{
                'bg-success text-white':
                  data.sum_prize != null && data.status_result,
              }"
            >
              <td style="padding: 0">{{ index + 1 }}</td>
              <td style="padding: 0">{{ data.lotto_type_name }}</td>
              <td style="padding: 0">
                {{ numberWithCommas(data.total) }}
              </td>
              <td style="padding: 0">
                {{ numberWithCommas(data.total_discount) }}
              </td>
              <td style="padding: 0">
                {{ numberWithCommas(data.sum_prize) }}
              </td>
              <td
                style="padding: 0"
                class="text-success"
                v-if="checkWinLose(data.total, data.sum_prize) > 0"
              >
                {{ numberWithCommas(checkWinLose(data.total, data.sum_prize)) }}
              </td>
              <td style="padding: 0" class="text-danger" v-else>
                {{ numberWithCommas(checkWinLose(data.total, data.sum_prize)) }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="text-center">
              <td>รวม</td>
              <td></td>
              <td style="padding: 0" class="text-success">
                {{ numberWithCommas(grandTotalPrice) }}
              </td>
              <td style="padding: 0" class="text-danger">
                {{ numberWithCommas(grandDiscount) }}
              </td>
              <td style="padding: 0" class="text-success">
                {{ numberWithCommas(grandTotalPrize) }}
              </td>
              <td
                style="padding: 0"
                class="text-success"
                v-if="checkWinLose(grandTotalPrice, grandTotalPrize) > 0"
              >
                {{ numberWithCommas(checkWinLose(grandTotalPrice, grandTotalPrize)) }}
              </td>
              <td style="padding: 0" class="text-danger" v-else>
                {{ numberWithCommas(checkWinLose(grandTotalPrice, grandTotalPrize)) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </b-overlay>
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
  BOverlay,
} from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import Ripple from "vue-ripple-directive";
import store from "@/store/index";
import { HTTP } from "@/services/http-common";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { BFormCheckbox } from "bootstrap-vue";
import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import moment from "moment";
import flatPickr from "vue-flatpickr-component";

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
    BOverlay,
    BFormCheckbox,
    BModal,
    BFormTextarea,
    BForm,
    vSelect,
    ValidationProvider,
    ValidationObserver,
    flatPickr,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      modelId: this.$route.params.modelId,
      log: [],
      OverlayFlag: false,
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
      rows: [],
      option: [],
      searchTerm: "",
      OverlayFlag: false,
      form: {
        startDate: moment(new Date()).format("YYYY-MM-DD"),
        endDate: moment(new Date()).format("YYYY-MM-DD"),
      },
      grandTotalPrice: 0,
      grandTotalPrize: 0,
      grandDiscount: 0,
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
  methods: {
    getData() {
      this.OverlayFlag = true;
      HTTP.get("api/admin/prize-log/report-lotto", {
        params: {
          startDate: this.form.startDate,
          endDate: this.form.endDate,
        },
      })
        .then((response) => {
          this.rows = response.data.data;
          this.grandTotalPrice = response.data.grandTotalPrice;
          this.grandTotalPrize = response.data.grandTotalPrize;
          this.grandDiscount = response.data.grandDiscount;
          this.OverlayFlag = false;
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
          this.OverlayFlag = false;
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
    showModalBill(bill) {
      this.$refs.modalBill.show();
      this.fetchPoyDetail(bill);
    },
    // showModalDisCredit(data) {
    //   this.form.credit = 0;
    //   this.form.note = "";
    //   this.form.type = "";
    //   this.dataDisCredit = data;
    //   this.$refs.modalDiscredit.show();
    // },
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
    numberWithCommas(x) {
      let sum = 0;
      if (x) {
        sum = x;
      }
      return parseFloat(sum)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY HH:mm:ss");
    },
    checkWinLose(price, prize) {
      return price - prize;
    },
    grandTotal(price) {
      return (price += price);
    },
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-good-table.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>

<template>
  <b-card title="รายการถูกรางวัลทั้งหมด">
    <div class="custom-search">
      <!-- advance search input -->
      <b-row class="align-items-end">
        <!-- <b-col md="3">
          <b-form-group>
            <label>เบอร์โทรศัพท์:</label>
            <b-form-input
              v-model="filter.lotto_type_id"
              type="text"
              class="d-inline-block"
              maxlength="10"
              @input="getData()"
            />
          </b-form-group>
        </b-col> -->
        <b-col md="3">
          <b-form-group>
            <label for="password">ประเภทหวย</label>
            <v-select
              v-model="filter.typeHuay"
              :options="optionsTypeHuay"
              label="lotto_type_name"
              placeholder="ประเภทหวย"
              :clearable="true"
              @input="getData()"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group>
            <label for="password">ประเภทรางวัล</label>
            <v-select
              v-model="filter.status"
              :options="optionsStatus"
              label="msg"
              placeholder="ประเภทรางวัล"
              :clearable="true"
              @input="getData()"
            />
          </b-form-group>
        </b-col>
        <!-- <b-col cols="12" md="3">
          <b-form-group>
            <h5 class="font-weight-bold">วันที่</h5>
            <flat-pickr
              v-model="form.startDate"
              class="form-control"
              @input="getData()"
              :config="{ mode: 'range', dateFormat: 'Y-m-d' }"
            />
          </b-form-group>
        </b-col> -->
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
            <!-- <b-button
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      type="button"
                      variant="primary"
                      class="float-right"
                      exact
                      @click="showModalAddPrize()"
                    >
                      <feather-icon icon="PlusIcon" class="mr-50" />
                      <span class="align-middle">เพิ่มผลรางวัล</span>
                    </b-button> -->
          </b-form-group>
        </b-col>
      </b-row>
    </div>

    <!-- :select-options="{
                    enabled: true,
                    trigger: 'enter',
                    selectOnCheckboxOnly: true,
                    selectionInfoClass: 'custom-class',
                    selectionText: 'rows selected',
                    clearSelectionText: 'clear',
                    disableSelectInfo: true,
                    selectAllByGroup: true,
                  }" -->

    <!-- table -->
    <b-overlay
      :show="OverlayFlag"
      spinner-variant="primary"
      spinner-type="grow"
      spinner-small
      rounded="sm"
    >
      <div
        style="overflow-x: auto; padding: 0"
        v-if="getDataLottoType ? getDataLottoType.length : 0"
      >
        <hr />
        <div v-for="(item, index) in getDataLottoType" :key="index">
          <div v-if="item.data ? item.data.length : 0">
            <h4 class="m-1">
              <b>{{ item.program }}</b>
            </h4>
            <table class="table">
              <thead>
                <tr class="text-center">
                  <th>ลำดับ</th>
                  <th>วันที่แทง</th>
                  <th>รหัสโพย</th>
                  <th>ชื่อ</th>
                  <th>หมายเหตุ</th>
                  <th>ยอดแทง</th>
                  <th>ส่วนลด</th>
                  <th>รวม</th>
                  <th>ยอดถูกรางวัล</th>
                  <th>สถานะโพย</th>
                  <th>สถานะ</th>
                  <th>โพย</th>
                  <th>ยกเลิกโพย</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(data, index) in item.data"
                  :key="index"
                  class="text-center"
                  :class="{
                    'bg-success text-white':
                      data.sum_prize != null && data.status_result,
                  }"
                >
                  <td style="padding: 0">{{ index + 1 }}</td>
                  <td style="padding: 0">{{ formatDate(data.created_at) }}</td>
                  <td style="padding: 0">{{ data.poy_code }}</td>
                  <td style="padding: 0">
                    {{ data.name }} {{ data.familyName }}
                  </td>
                  <td style="padding: 0">{{ data.note }}</td>
                  <td style="padding: 0">
                    {{ numberWithCommas(data.sum_total) }}
                  </td>
                  <td style="padding: 0">
                    {{ numberWithCommas(data.sum_discount) }}
                  </td>
                  <td style="padding: 0">
                    {{ numberWithCommas(data.sum_total - data.sum_discount) }}
                  </td>
                  <td style="padding: 0">
                    {{ numberWithCommas(data.sum_prize) }}
                  </td>

                  <td>
                    <span
                      class="badge bg-success"
                      v-if="data.status_poy == 'SUC'"
                      >สำเร็จ</span
                    >
                    <span class="badge bg-danger" v-else>ยกเลิกโพย</span>
                  </td>
                  <td>
                    <span
                      class="text-white"
                      v-if="data.sum_prize && data.status_result"
                      >ถูกรางวัล</span
                    >
                    <span
                      class="text-warning"
                      v-else-if="data.status_result == 0"
                      >รอผล</span
                    >
                    <span
                      class="text-danger"
                      v-else-if="
                        data.sum_prize == null && data.status_result == 1
                      "
                      >ไม่ถูกรางวัล</span
                    >
                  </td>
                  <td style="padding: 0">
                    <button
                      class="btn-sm btn-primary"
                      @click="showModalBill(data.poy_code)"
                    >
                      ดูโพย
                    </button>
                  </td>
                  <td style="padding: 0">
                    <button
                      class="btn-sm btn-danger"
                      v-if="data.status_poy != 'CAN'"
                      @click="onSubmitCancel(data)"
                    >
                      ยกเลิกโพย
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="text-center">
                  <td>รวม</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style="padding: 0"></td>
                  <td style="padding: 0" class="text-success">
                    {{ resultTotal(item.program) }}
                  </td>
                  <td style="padding: 0" class="text-danger">
                    {{ resultDiscount(item.program) }}
                  </td>
                  <td style="padding: 0" class="text-success">
                    {{ resultTotalPrice(item.program) }}
                  </td>
                  <td style="padding: 0" class="text-success">
                    {{ resultPrize(item.program) }}
                  </td>

                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between flex-wrap" v-if="totalRecords > 0">
        <!-- page length -->
        <div class="d-flex align-items-center mb-0 mt-1">
          <span class="text-nowrap"> รายการที่แสดง </span>
          <b-form-select
            v-model="pageLength"
            :options="pages"
            class="mx-1"
            @input="handlePageChange"
          />
          <span class="text-nowrap"> ทั้งหมด {{ totalRecords }} รายการ </span>
        </div>

        <!-- pagination -->
        <div>
          <b-pagination
            :value="1"
            :total-rows="totalRecords"
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

      <div class="text-center" v-else>
        ไม่มีข้อมูล
      </div>

      <!-- <div>
        <b-pagination
          :value="1"
          :total-rows="totalRecords"
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
      </div> -->

      <div style="overflow-x: auto; padding: 0">
        <hr />
        <h4 class="m-1"><b>สรุปยอดรวม</b></h4>
        <table class="table">
          <thead>
            <tr class="text-center">
              <th>ลำดับ</th>
              <th>หวย</th>
              <th>ยอดแทง</th>
              <th>ส่วนลด</th>
              <th>ยอดถูกรางวัล</th>
              <th>ค่า AFF</th>
              <th>ได้/เสีย</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(data, index) in option"
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
                {{ resultTotal(data.lotto_type_name) }}
              </td>
              <td style="padding: 0">
                {{ resultDiscount(data.lotto_type_name) }}
              </td>
              <td style="padding: 0">
                {{ resultPrize(data.lotto_type_name) }}
              </td>
              <td style="padding: 0">{{ resultAff(data.lotto_type_name) }}</td>
              <td
                style="padding: 0"
                class="text-success"
                v-if="resultWinLose(data.lotto_type_name) > 0"
              >
                {{ numberWithCommas(resultWinLose(data.lotto_type_name)) }}
              </td>
              <td style="padding: 0" class="text-danger" v-else>
                {{ numberWithCommas(resultWinLose(data.lotto_type_name)) }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="text-center">
              <td>รวม</td>
              <td></td>
              <td style="padding: 0" class="text-success">
                {{ numberWithCommas(grandTotal.total) }}
              </td>
              <td style="padding: 0" class="text-danger">
                {{ numberWithCommas(grandTotal.discount) }}
              </td>
              <td style="padding: 0" class="text-success">
                {{ numberWithCommas(grandTotal.prize) }}
              </td>
              <td style="padding: 0" class="text-success">
                {{ numberWithCommas(grandTotal.aff) }}
              </td>
              <td
                style="padding: 0"
                class="text-success"
                v-if="grandTotal.grandTotalPrice > 0"
              >
                {{ numberWithCommas(grandTotal.grandTotalPrice) }}
              </td>
              <td style="padding: 0" class="text-success" v-else>
                {{ numberWithCommas(grandTotal.grandTotalPrice) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </b-overlay>

    <b-modal
      id="modal-credit"
      ref="modalBill"
      cancel-variant="outline-secondary"
      centered
      hide-footer
      size="lg"
      title="โพย"
    >
      <div style="overflow-x: auto; padding: 0">
        <table class="table">
          <thead>
            <tr class="text-center">
              <th>ลำดับ</th>
              <th>ประเภท</th>
              <th>หมายเลข</th>
              <th>ยอดแทง</th>
              <th>ส่วนลด</th>
              <th>จ่าย</th>
              <th>รวม</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(data, index) in detail"
              :key="index"
              class="text-center"
              :class="{
                'bg-success text-white': data.status == 'suc',
                'bg-danger text-white': data.status == 'close',
              }"
            >
              <td style="padding: 0">{{ index + 1 }}</td>
              <td style="padding: 0">{{ data.type_option }}</td>
              <td style="padding: 0">{{ data.number }}</td>
              <td style="padding: 0">{{ numberWithCommas(data.price) }}</td>
              <td style="padding: 0">{{ numberWithCommas(data.discount) }}</td>
              <td style="padding: 0">{{ numberWithCommas(data.pay) }}</td>
              <td style="padding: 0">{{ numberWithCommas(data.total) }}</td>
              <td>
                <span class="text-white" v-if="data.status == 'suc'"
                  >ถูกรางวัล</span
                >
                <span class="text-danger" v-else-if="data.status == 'fail'"
                  >ไม่ถูกรางวัล</span
                >
                <span class="text-white" v-else-if="data.status == 'close'"
                  >เลขปิดรับ</span
                >
                <span class="text-warning" v-else>รอผล</span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="text-center">
              <td>รวม</td>
              <td></td>
              <td></td>
              <td style="padding: 0" class="text-success">
                <!-- {{ sumAll }} -->
                {{ numberWithCommas(sumAll.price) }}
              </td>
              <td style="padding: 0" class="text-danger">
                {{ numberWithCommas(sumAll.discount) }}
              </td>
              <td style="padding: 0"></td>
              <td style="padding: 0" class="text-primary">
                {{ numberWithCommas(sumAll.total) }}
              </td>
              <td style="padding: 0" class="text-success">
                {{ numberWithCommas(sumAll.prize) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </b-modal>
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
import { required, integer } from "@validations";
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
      pages: ["5", "10", "25", "50", "100"],
      columns: [
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "ลำดับ",
          field: "num",
        },
        // {
        //   thClass: "text-center",
        //   tdClass: "text-center",
        //   label: "เบอร์โทรศัพท์",
        //   field: "phone",
        // },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "รหัสโพย",
          field: "poy_code",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "ประเภทหวย",
          field: "lotto_type_name",
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
          label: "ยอดแทง",
          field: "user_sum_total",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "ส่วนลด",
          field: "user_sum_discount",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "ถูกรางวัล",
          field: "user_sum_prize",
        },
        // {
        //   thClass: "text-center",
        //   tdClass: "text-center",
        //   label: "ผู้ทำรายการ",
        //   field: "fullname",
        // },
        // {
        //   thClass: "text-center",
        //   tdClass: "text-center",
        //   label: "เติมเงิน",
        //   field: "status_prize",
        // },
        // {
        //   thClass: "text-center",
        //   tdClass: "text-center",
        //   label: "เครดิต",
        //   field: "credit",
        //   width: "120px",
        //   sortable: false,
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
      option: [],
      searchTerm: "",
      filter: {
        phone: "",
        lotto_type_id: "",
      },
      form: {
        prize3top: "",
        prize2bottom: "",
        typeHuay: "",
        startDate: moment(new Date()).format("YYYY-MM-DD"),
        endDate: moment(new Date()).format("YYYY-MM-DD"),
        type: "",
        type3top: "3 ตัวบน",
        type2bottom: "2 ตัวล่าง",
      },
      optionsType: ["3 ตัวบน", "3 ตัวโต๊ด", "2 ตัวบน", "2 ตัวล่าง"],
      optionsTypeHuay: [],
      optionsStatus: [{ code: "suc", msg: "ถูกรางวัล" }],
      required,
      integer,
      dataCredit: "",
      dataDisCredit: "",
      max: 3,
      detail: [],
      sumAll: "",
      grandTotal: "",
      OverlayFlag: false,
      huayOption: [
        "นิเคอิเช้า",
        "จีนเช้า",
        "ลาวTV",
        "ฮั่งเส็งเช้า",
        "ฮานอยHD",
        "ลาวพิเศษ",
        "ไต้หวัน",
        "ฮานอยสตาร์",
        "เกาหลี",
        "นิเคอิบ่าย",
        "จีนบ่าย",
        "ลาวHD",
        "ฮานอยTV",
        "ฮั่งเส็งบ่าย",
        "สิงค์โปร",
        "ฮานอยดานัง",
        "ฮานอยกาชาด",
        "ฮานอยพิเศษ",
        "ฮานอย",
        "ฮานอย VIP",
        "ลาวพัฒนา",
        "ลาวสามัคคี",
        "ลาวบ้าน",
        "ลาวVIP",
        "รัสเซีย",
        "เยอรมัน",
        "อังกฤษ",
        "ฮานอยExtra",
        "ลาวเวียงจันทร์",
        "ดาวโจนส์พิเศษ",
        "ลาวกาชาด",
        "ลาวดาว",
        "ดาวโจนส์VIP",
        "ดาวโจนส์",
      ],
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
    getDataLottoType: function () {
      const lotto = [];
      const matches = this.option.map((item) => item.lotto_type_name);
      let program = [...new Set(matches)];
      for (let i = 0; i < program.length; i++) {
        const item = program[i];
        const result = this.rows.filter((el) => el.lotto_type_name === item);
        lotto.push({ program: item, data: result });
      }
      return lotto;
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    // this.fetchTypeHuay();
    this.fetchTypeHuayAll();
    // this.getDataType();
  },
  methods: {
    getData() {
      this.OverlayFlag = true;
      HTTP.get("api/admin/prize/prize-result", {
        params: {
          // search: this.searchTerm,
          perPage: this.pageLength,
          page: this.currentPage,
          lotto_type_id:
            this.filter.typeHuay != null
              ? this.filter.typeHuay.lotto_type_id
              : undefined,
          startDate: this.form.startDate,
          endDate: this.form.endDate,
          status:
            this.filter.status != null ? this.filter.status.code : undefined,
        },
      })
        .then((response) => {
          this.rows = response.data.data.data;
          this.totalRecords = response.data.data.total;
          if (this.rows) {
            let total = 0;
            let discount = 0;
            let prize = 0;
            let aff = 0;
            let grandTotalPrice = 0;
            this.rows.forEach((item) => {
              if (item.status_poy != "CAN") {
                total += parseFloat(item.sum_total);
                discount += parseFloat(item.sum_discount);
                if (item.aff_amount != null) {
                  aff += parseFloat(item.aff_amount);
                }
                if (item.sum_prize != null) {
                  prize += parseFloat(item.sum_prize);
                }
                grandTotalPrice = total - discount - prize - aff;
              }
            });
            this.grandTotal = { total, discount, prize, grandTotalPrice, aff };
          }

          // console.log(this.rows)
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
    // getDataType() {
    //   this.isLoading = true;
    //   HTTP.get("api/type")
    //     .then((response) => {
    //       this.option = response.data.data;
    //     })
    //     .catch((error) => {
    //       this.$toast({
    //         component: ToastificationContent,
    //         position: "top-right",
    //         props: {
    //           title: "แจ้งเตือน",
    //           text:
    //             error.response.data.msg !== undefined
    //               ? error.response.data.msg
    //               : error.status,
    //           icon: "XCircleIcon",
    //           variant: "danger",
    //         },
    //       });
    //     });
    // },
    resultTotal(huay) {
      if (this.rows) {
        let total = 0;
        this.rows.forEach((item) => {
          if (item.lotto_type_name == huay && item.status_poy == "SUC") {
            // discount += parseFloat(item.sum_discount);
            // if (item.sum_prize) {
            //   prize += parseFloat(item.sum_prize);
            // }
            total += parseFloat(item.sum_total);
          }
        });
        return parseFloat(total)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // this.grandTotal = { discount, prize, total };
        // this.sumAll = { price, discount, pay, total, prize };
      }
    },
    resultDiscount(huay) {
      if (this.rows) {
        let discount = 0;
        this.rows.forEach((item) => {
          if (item.lotto_type_name == huay && item.status_poy == "SUC") {
            discount += parseFloat(item.sum_discount);
            // if (item.sum_prize) {
            //   prize += parseFloat(item.sum_prize);
            // }
            // total += parseFloat(item.sum_total);
          }
        });
        return parseFloat(discount)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    resultPrize(huay) {
      if (this.rows) {
        let prize = 0;
        this.rows.forEach((item) => {
          if (item.lotto_type_name == huay && item.status_poy == "SUC") {
            // discount += parseFloat(item.sum_discount);
            if (item.sum_prize) {
              prize += parseFloat(item.sum_prize);
            }
            // total += parseFloat(item.sum_total);
          }
        });
        return parseFloat(prize)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // this.grandTotal = { discount, prize, total };
        // this.sumAll = { price, discount, pay, total, prize };
      }
    },
    resultTotalPrice(huay) {
      if (this.rows) {
        let discount = 0;
        let total = 0;
        let grandTotal = 0;
        this.rows.forEach((item) => {
          if (item.lotto_type_name == huay && item.status_poy == "SUC") {
            discount += parseFloat(item.sum_discount);
            // if (item.sum_prize) {
            //   prize += parseFloat(item.sum_prize);
            // }
            total += parseFloat(item.sum_total);
            grandTotal = total - discount;
          }
        });
        return parseFloat(grandTotal)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // this.grandTotal = { discount, prize, total };
        // this.sumAll = { price, discount, pay, total, prize };
      }
    },
    resultWinLose(huay) {
      if (this.rows) {
        let total = 0;
        let discount = 0;
        let prize = 0;
        let aff = 0;
        let grandTotal = 0;
        this.rows.forEach((item) => {
          if (item.lotto_type_name == huay && item.status_poy == "SUC") {
            total += parseFloat(item.sum_total);
            discount += parseFloat(item.sum_discount);
            if (item.aff_amount) {
              aff += parseFloat(item.aff_amount);
            }
            if (item.sum_prize) {
              prize += parseFloat(item.sum_prize);
            }
            grandTotal = total - discount - prize - aff;
            // total += parseFloat(item.sum_total);
          }
        });
        return parseFloat(grandTotal);
        // .toFixed(2)
        // .toString()
        // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // this.grandTotal = { discount, prize, total };
        // this.sumAll = { price, discount, pay, total, prize };
      }
    },
    onSubmitCancel(data) {
      this.isLoading = true;
      // document.getElementById("submitCode").disabled = true;
      HTTP.post(`api/lotto/cancel-lotto/admin`, {
        billCode: data.poy_code,
        lotto_type_id: data.lotto_type_id,
      })
        .then((resp) => {
          // document.getElementById("submitCode").disabled = false;
          this.showToast(
            resp.data.msg != undefined
              ? resp.data.msg
              : "ไม่สามารถทำรายการได้ กรุณาลองใหม่",
            "success"
          );
          this.getData();
        })
        .catch((err) => {
          // document.getElementById("submitCode").disabled = false;
          if (err.response) {
            if (err.response.status === 403) {
              this.$store.dispatch("logoutAuth");
            } else {
              this.showToast(
                err.response.data.msg != undefined
                  ? err.response.data.msg
                  : "ไม่สามารถทำรายการได้ กรุณาลองใหม่",
                "danger"
              );
            }
          }
        })
        .then(() => {
          this.isLoading = false;
        });
    },
    resultAff(huay) {
      if (this.rows) {
        let aff = 0;
        this.rows.forEach((item) => {
          if (item.lotto_type_name == huay && item.status_poy == "SUC") {
            // discount += parseFloat(item.sum_discount);
            // if (item.sum_prize) {
            //   prize += parseFloat(item.sum_prize);
            // }
            if (item.aff_amount != null) {
              aff += parseFloat(item.aff_amount);
            }
          }
        });
        return parseFloat(aff)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    fetchPoyDetail(bill) {
      this.OverlayFlag = true;
      HTTP.get("api/admin/prize/detail-prize-result", {
        params: {
          // search: this.searchTerm,
          billCode: bill,
        },
      })
        .then((response) => {
          this.detail = response.data.data;
          if (this.detail) {
            let price = 0;
            let discount = 0;
            let pay = 0;
            let total = 0;
            let prize = 0;
            this.detail.forEach((item) => {
              if (item.status != "close") {
                price += item.price;
              }
              discount += item.discount;
              pay += item.pay;
              if (item.status != "close") {
                total += item.total;
              }
              if (item.status == "suc") {
                prize += item.price * item.pay;
              }
            });
            this.sumAll = { price, discount, pay, total, prize };
          }
          // console.log(this.rows)
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
    // fetchTypeHuay() {
    //   HTTP.get("api/lotto-type", {})
    //     .then((response) => {
    //       this.optionsTypeHuay = response.data.data;
    //     })
    //     .catch((error) => {
    //       this.$toast({
    //         component: ToastificationContent,
    //         position: "top-right",
    //         props: {
    //           title: "แจ้งเตือน",
    //           text:
    //             error.response.data.msg !== undefined
    //               ? error.response.data.msg
    //               : error.status,
    //           icon: "XCircleIcon",
    //           variant: "danger",
    //         },
    //       });
    //     });
    // },
    fetchTypeHuayAll() {
      HTTP.get("api/lotto-type/all", {})
        .then((response) => {
          this.option = response.data.data;
          this.optionsTypeHuay = response.data.data;
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

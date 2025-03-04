<template>
  <div>
    <b-card title="รายการโพยทั้งหมด">
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
          <!-- <b-col md="3">
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
              </b-col> -->
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
          <!-- Column: Action -->
          <!-- <span v-if="props.column.field === 'status_prize'">
                <button class="btn-sm btn-success" @click="submitTrans(props.row)">
                  ยืนยัน
                </button>
                &nbsp;
                <button class="btn-sm btn-danger">ปฏิเสธ</button>
              </span> -->
          <span v-if="props.column.field === 'num'">
            <!-- <button>{{ props.row.is_active}}</button> -->
            <span>{{ props.row.originalIndex + 1 }}</span>
          </span>
          <span v-if="props.column.field === 'date_deposite'">
            <span>{{ formatDate(props.row.created_at) }}</span>
          </span>
          <span v-if="props.column.field === 'poy_price'">
            <span class="badge bg-success">
              + {{ numberWithCommas(props.row.price.toFixed(2)) }}</span
            >
          </span>
          <span v-if="props.column.field === 'poy_discount'">
            <span class="badge bg-danger">
              - {{ numberWithCommas(props.row.discount.toFixed(2)) }}</span
            >
          </span>
          <span v-if="props.column.field === 'poy_total'">
            <span class="badge bg-success">
              + {{ numberWithCommas(props.row.total.toFixed(2)) }}</span
            >
          </span>
          <span v-if="props.column.field === 'fullname'">
            <span class="badge bg-warning"
              >{{ props.row.name }} {{ props.row.familyName }}</span
            >
          </span>
          <!-- <span v-if="props.column.field === 'credit'">
                  <b-button
                    variant="gradient-success"
                    class="btn-icon rounded-circle"
                    @click="showModalAddCredit(props.row)"
                  >
                    <feather-icon icon="PlusIcon" />
                  </b-button>
                  &nbsp;
                  <b-button
                    variant="gradient-danger"
                    class="btn-icon rounded-circle"
                    @click="showModalDisCredit(props.row)"
                  >
                    <feather-icon icon="MinusIcon" />
                  </b-button>
                </span> -->
          <span v-if="props.column.field === 'action'">
            <span>
              <b-dropdown
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template v-slot:button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="text-body align-middle mr-25"
                  />
                </template>
                <b-dropdown-item
                  :to="{
                    name: 'addlottery',
                    params: { id: props.row.id },
                  }"
                >
                  <feather-icon icon="Edit2Icon" class="mr-50" />
                  <span>Edit</span>
                </b-dropdown-item>
                <b-dropdown-item
                  :to="{
                    name: 'addlottery',
                    params: { id: props.row.id },
                  }"
                >
                  <feather-icon icon="TrashIcon" class="mr-50" />
                  <span>Delete</span>
                </b-dropdown-item>
              </b-dropdown>
            </span>
          </span>

          <!-- Column: Common -->
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
              <span class="text-nowrap">
                ทั้งหมด {{ props.total }} รายการ
              </span>
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
    <!-- <b-card>
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
            <tr v-for="(data, index) in rows" :key="index" class="text-center">
              <td style="padding: 0">{{ index + 1 }}</td>
              <td style="padding: 0">{{ data }}</td>
              <td style="padding: 0"></td>
              <td style="padding: 0"></td>
              <td style="padding: 0"></td>
              <td style="padding: 0"></td>
              <td style="padding: 0" class="text-success"></td>
              <td style="padding: 0" class="text-danger"></td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="text-center">
              <td>รวม</td>
              <td></td>
              <td style="padding: 0" class="text-success"></td>
              <td style="padding: 0" class="text-danger"></td>
              <td style="padding: 0" class="text-success"></td>
              <td style="padding: 0" class="text-success"></td>
              <td style="padding: 0" class="text-success"></td>
              <td style="padding: 0" class="text-success"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </b-card> -->
  </div>
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
          field: "poy_price",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "ส่วนลด",
          field: "poy_discount",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "รวม",
          field: "poy_total",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "ผู้ทำรายการ",
          field: "fullname",
        },
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
      HTTP.get("api/admin/poy", {
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
    submitTrans(data) {
      console.log(data);
      HTTP.put(`api/admin/transaction/submit`, {
        id: data.pp_id,
        amount: data.amount,
        userId: data.user_id,
      })
        .then((resp) => {
          this.showToast(resp.data.msg, "success");
          this.getData();
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 403) {
              this.$store.dispatch("logoutAuth");
              this.$router.push("/login");
            } else {
              this.showToast(
                err.response.data.msg !== undefined
                  ? err.response.data.msg
                  : "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่",
                "danger"
              );
              this.getData();
            }
          }
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
      //   this.dataCredit = data;
      this.$refs.modalAddPrize.show();
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
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY HH:mm:ss");
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

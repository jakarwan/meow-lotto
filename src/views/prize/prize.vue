<template>
  <b-card title="รายการผลรางวัล">
    <b-overlay
      :show="OverlayFlag"
      spinner-variant="primary"
      spinner-type="grow"
      spinner-small
      rounded="sm"
    >
      <div class="custom-search">
        <!-- advance search input -->

        <b-row class="align-items-end">
          <b-col md="2">
            <b-form-group>
              <label>ผลหวย:</label>
              <b-form-input
                v-model="filter.name"
                type="text"
                class="d-inline-block"
                maxlength="3"
                @input="getData()"
              />
            </b-form-group>
          </b-col>
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
          <b-col md="7">
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
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="button"
                variant="primary"
                class="float-right ml-1"
                exact
                @click="showModalAddPrize()"
              >
                <feather-icon icon="PlusIcon" class="mr-50" />
                <span class="align-middle">ออกผลรางวัล</span>
              </b-button>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="button"
                variant="info"
                class="float-right"
                exact
                @click="getData()"
              >
                <feather-icon icon="RefreshCwIcon" class="mr-50" />
                <span class="align-middle">โหลดผลรางวัล</span>
              </b-button>
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
          <span v-if="props.column.field === 'status_prize'">
            <b-form-checkbox
              unchecked-value="0"
              name="check-button"
              class="custom-control-success"
              switch
              inline
              checked
              value="1"
              :disabled="props.row.status == 1"
              @change="updateStatus(props.row)"
              v-model="props.row.status"
            >
            </b-form-checkbox>
          </span>
          <span v-if="props.column.field === 'return_prize'">
            <!-- <b-form-checkbox
            unchecked-value="0"
            name="check-button"
            class="custom-control-success"
            switch
            inline
            checked
            value="1"
            :disabled="props.row.status == 1"
            @change="updateStatus(props.row.lotto_type_id)"
            v-model="props.row.status"
          >
          </b-form-checkbox> -->
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="button"
              variant="primary"
              exact
              @click="returnResults(props.row.prize_id)"
            >
              <!-- <feather-icon icon="PlusIcon" class="mr-50" /> -->
              <span class="align-middle">คืนผล</span>
            </b-button>
          </span>
          <span v-if="props.column.field === 'num'">
            <!-- <button>{{ props.row.is_active}}</button> -->
            <span>{{ props.row.originalIndex + 1 }}</span>
          </span>
          <span v-if="props.column.field === 'date_prize'">
            <span>{{ formatDate(props.row.prize_time) }}</span>
          </span>
          <span v-if="props.column.field === 'fullname'">
            <span v-if="props.row.name"
              >{{ props.row.name }} {{ props.row.familyName }}</span
            >
            <span v-else>ระบบ</span>
          </span>
          <span v-if="props.column.field === 'created'">
            <span>{{ formatDate(props.row.created_at) }}</span>
          </span>
          <span v-if="props.column.field === 'prize3front'">
            <span
              v-for="(data, index) in props.row.prize3bottom"
              ><span v-for="(item, indexItem) in data.prize3front">
                {{ item }},
              </span>
            </span>
          </span>
          <span v-if="props.column.field === 'prize3after'">
            <span
              v-for="(data, index) in props.row.prize3bottom"
            >
              <span v-for="(item, indexItem) in data.prize3after">
                {{ item }},
              </span>
            </span>
          </span>

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
                <!-- <b-dropdown-item
                  :to="{
                    name: 'addlottery',
                    params: { id: props.row.id },
                  }"
                >
                  <feather-icon icon="Edit2Icon" class="mr-50" />
                  <span>Edit</span>
                </b-dropdown-item> -->
                <b-dropdown-item @click="deleteResults(props.row.prize_id)">
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
    </b-overlay>
    <validation-observer ref="addCredit">
      <b-modal
        id="modal-credit"
        ref="modalAddPrize"
        cancel-variant="outline-secondary"
        centered
        hide-footer
        no-close-on-backdrop
        title="เพิ่มผลรางวัล"
      >
        <b-form>
          <b-row>
            <b-col md="12">
              <b-form-group>
                <label for="email">ผลหวย 6 หลัก:</label>
                <b-form-input
                  id="credit"
                  type="text"
                  placeholder="xxxxxx"
                  v-model="form.prize6digit"
                  maxlength="6"
                />
              </b-form-group>
            </b-col>
            <!-- v-if="form.typeHuay.type_id == 2" -->
            <b-col md="6">
              <b-form-group>
                <label for="email">3 ตัวหน้า:</label>
                <b-form-input
                  id="credit"
                  type="text"
                  placeholder="ตัวอย่าง 123 456"
                  v-model="form.prize3front"
                  maxlength="7"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">3 ตัวหลัง:</label>
                <b-form-input
                  id="credit"
                  type="text"
                  placeholder="ตัวอย่าง 123 456"
                  v-model="form.prize3after"
                  maxlength="7"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">3 ตัวบน:</label>
                <validation-provider
                  #default="{ errors }"
                  name="ผลหวย"
                  rules="required|integer|"
                >
                  <b-form-input
                    id="credit"
                    type="text"
                    placeholder="xxx"
                    v-model="form.prize3top"
                    maxlength="3"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ประเภท:</label>
                <validation-provider
                  #default="{ errors }"
                  name="ผลหวย"
                  rules="required|integer|"
                >
                  <b-form-input
                    id="credit"
                    type="text"
                    placeholder="3 ตัวบน"
                    disabled
                    v-model="form.type3top"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">2 ตัวล่าง:</label>
                <validation-provider
                  #default="{ errors }"
                  name="ผลหวย"
                  rules="required|integer|"
                >
                  <b-form-input
                    id="credit"
                    type="text"
                    placeholder="xx"
                    v-model="form.prize2bottom"
                    maxlength="2"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ประเภท:</label>
                <validation-provider
                  #default="{ errors }"
                  name="ผลหวย"
                  rules="required|"
                >
                  <b-form-input
                    id="credit"
                    type="text"
                    placeholder="2 ตัวล่าง"
                    disabled
                    v-model="form.type2bottom"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group>
                <label for="password">งวดวันที่</label>
                <flat-pickr
                  v-model="form.installment"
                  class="form-control"
                  :config="{ dateFormat: 'Y-m-d' }"
                />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group>
                <label for="password">ประเภทหวย</label>
                <v-select
                  v-model="form.typeHuay"
                  :options="optionsTypeHuay"
                  label="lotto_type_name"
                  placeholder="ประเภทหวย"
                  :clearable="true"
                  @input="checkType()"
                />
              </b-form-group>
            </b-col>
            <!-- <b-col md="6">
              <b-form-group>
                <label for="password">ประเภทเลข</label>
                <v-select
                  v-model="form.type"
                  :options="optionsType"
                  placeholder="ประเภท"
                  :clearable="false"
                />
              </b-form-group>
            </b-col> -->
            <b-col md="12">
              <b-form-group>
                <div class="text-center">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="button"
                    variant="success"
                    class="mr-1"
                    exact
                    @click="validationForm()"
                  >
                    <feather-icon icon="PlusIcon" class="mr-50" />
                    <span class="align-middle">เพิ่มผลรางวัล</span>
                  </b-button>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-modal>
    </validation-observer>
    <!-- <validation-observer ref="disCredit">
      <b-modal
        id="modal-discredit"
        ref="modalDiscredit"
        cancel-variant="outline-secondary"
        ok-title="Login"
        cancel-title="Close"
        centered
        hide-footer
        title="ลบเครดิต"
      >
        <b-form>
          <b-form-group>
            <label for="email">เครดิต:</label>
            <b-form-input
              id="credit"
              type="text"
              placeholder="เครดิต"
              v-model="form.credit"
            />
          </b-form-group>
          <b-form-group>
            <label for="password">ประเภท</label>
            <v-select
              v-model="form.type"
              :options="optionsDisCredit"
              placeholder="ประเภท"
              :clearable="false"
            />
          </b-form-group>
          <b-form-group>
            <b-form-textarea
              id="internal-payment-note"
              v-model="form.note"
              placeholder="เหตุผล"
              rows="5"
              trim
            />
          </b-form-group>
          <b-form-group>
            <div class="text-center">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="button"
                variant="danger"
                class="mr-1"
                exact
                @click="validationFormDisCredit()"
              >
                <feather-icon icon="MinusIcon" class="mr-50" />
                <span class="align-middle">ลบเครดิต</span>
              </b-button>
            </div>
          </b-form-group>
        </b-form>
      </b-modal>
    </validation-observer> -->
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
  BOverlay,
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
    BOverlay,
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
    flatPickr,
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
      OverlayFlag: false,
      sort: [
        {
          field: "",
          sort: "",
        },
      ],
      dir: false,
      pages: ["5", "10", "50", "100"],
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
          label: "หวย",
          field: "lotto_type_name",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "เลข 6 ตัว",
          field: "prize6digit",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "เลข 3 ตัวหน้า",
          field: "prize3front",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "เลข 3 ตัวท้าย",
          field: "prize3after",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "เลข 3 ตัวบน",
          field: "prize3top",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "เลข 2 ตัวล่าง",
          field: "prize2bottom",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "วันที่ออกผล",
          field: "date_prize",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "ผู้ออกผล",
          field: "fullname",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "วันที่สร้าง",
          field: "created",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "ออกผล",
          field: "status_prize",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "คืนผล",
          field: "return_prize",
        },
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
        subject: "",
        startDate: "",
        endDate: "",
        typeHuay: "",
      },
      form: {
        prize6digit: "",
        prize3after: "",
        prize3front: "",
        prize3top: "",
        prize2bottom: "",
        typeHuay: "",
        type: "",
        type3top: "3 ตัวบน",
        type2bottom: "2 ตัวล่าง",
        installment: moment(new Date()).format("YYYY-MM-DD"),
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
    this.fetchTypeHuay();
  },
  methods: {
    getData() {
      this.OverlayFlag = true;
      HTTP.get("api/admin/prize", {
        params: {
          // search: this.searchTerm,
          perPage: this.pageLength,
          page: this.currentPage,
          prize_number: this.filter.name != "" ? this.filter.name : undefined,
          lotto_type_id:
            this.filter.typeHuay != null
              ? this.filter.typeHuay.lotto_type_id
              : undefined,
          // orderBy: JSON.stringify(this.sort),
        },
      })
        .then((response) => {
          this.rows = response.data.data.data;
          console.log(this.rows, "ssss");
          this.totalRecords = response.data.data.total;
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
    fetchTypeHuay() {
      HTTP.get("api/lotto-type", {})
        .then((response) => {
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
    updateStatus(data) {
      HTTP.get(`api/get-prize/lotto-results`, {
        params: {
          lotto_type_id: data.lotto_type_id,
          installment: moment(data.prize_time).format("YYYY-MM-DD"),
        },
      })
        .then((resp) => {
          this.showToast(resp.data.msg, "success");
          this.updateBalance(data);
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
    returnResults(id) {
      HTTP.put(`api/get-prize/return-results`, {
        prizeId: id,
      })
        .then((resp) => {
          this.showToast(resp.data.msg, "success");
          this.getData();
          // this.updateBalance(id);
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
    deleteResults(id) {
      HTTP.delete(`api/get-prize/delete-award`, {
        data: {
          prizeId: id,
        },
      })
        .then((resp) => {
          this.showToast(resp.data.msg, "success");
          this.getData();
          // this.updateBalance(id);
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
    updateBalance(data) {
      HTTP.put(`api/get-prize/update-creditbalacne`, {
        lotto_type_id: data.lotto_type_id,
        installment: moment(data.prize_time).format("YYYY-MM-DD"),
      })
        .then((resp) => {
          this.showToast(resp.data.msg, "success");
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
              // this.getData();
            }
          }
        });
    },
    validationForm() {
      this.$refs.addCredit.validate().then((success) => {
        if (success) {
          var prize3bottom = null;
          if (this.form.prize3front != "" && this.form.prize3after != "") {
            const number3front = this.form.prize3front.split(" ");
            const number3after = this.form.prize3after.split(" ");
            prize3bottom = [
              {
                type3front: "3 ตัวหน้า",
                prize3front: number3front,
              },
              {
                type3after: "3 ตัวหลัง",
                prize3after: number3after,
              },
            ];
          }
          console.log(prize3bottom, "prize3bottom");
          HTTP.post(`api/admin/prize/add-prize`, {
            prize6digit: this.form.prize6digit,
            prize3bottom: prize3bottom ? prize3bottom : undefined,
            prize3top: this.form.prize3top,
            prize2bottom: this.form.prize2bottom,
            lotto_type_id:
              this.form.typeHuay != null
                ? this.form.typeHuay.lotto_type_id
                : undefined,
            type3top: this.form.type3top,
            type2bottom: this.form.type2bottom,
            installment: this.form.installment,
          })
            .then((resp) => {
              this.showToast(
                resp.data.msg != null ? resp.data.msg : "สำเร็จ",
                "success"
              );
              this.$refs.modalAddPrize.hide();
              this.getData();
            })
            .catch((error) => {
              this.showToast(error.response.data.msg, "danger");
            });
        }
      });
    },
    // validationFormDisCredit() {
    //   this.$refs.addCredit.validate().then((success) => {
    //     if (success) {
    //       HTTP.put(
    //         `api/admin/member/dis-credit`,
    //         {
    //           id: this.dataCredit.id,
    //           amount: this.form.credit,
    //           type: this.form.type,
    //           note: this.form.note,
    //         },
    //         {
    //           headers: {
    //             Authorization: "Bearer " + localStorage.getItem("bb_token"),
    //           },
    //         }
    //       )
    //         .then((resp) => {
    //           this.showToast(
    //             resp.data.msg != null ? resp.data.msg : "สำเร็จ",
    //             "success"
    //           );
    //           this.$refs.modalDiscredit.hide();
    //         })
    //         .catch((error) => {
    //           this.showToast(error.response.data.msg, "danger");
    //         });
    //     }
    //   });
    // },
    // delVehicleModel() {
    //   this.isLoading = true;
    //   const bodyFormData = new FormData();
    //   bodyFormData.append("modelId", this.$route.params.id);
    //   useNetw
    //     .post("/api/vehicleModel/delete", bodyFormData, {})
    //     .then(() => {
    //       this.$toast({
    //         component: ToastificationContent,
    //         position: "top-right",
    //         props: {
    //           title: "ลบข้อมูลเรียบร้อยแล้ว",
    //           icon: "SaveIcon",
    //           variant: "success",
    //         },
    //       });
    //       this.getData();
    //       this.isLoading = false;
    //     })
    //     .catch((error) => {
    //       this.isLoading = false;
    //       this.$toast({
    //         component: ToastificationContent,
    //         position: "top-right",
    //         props: {
    //           title: "แจ้งเตือน",
    //           text:
    //             error.response.data.message !== undefined
    //               ? error.response.data.message
    //               : error.status,
    //           icon: "XCircleIcon",
    //           variant: "danger",
    //         },
    //       });
    //     });
    // },
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
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    checkType() {
      this.form.prize3front = "";
      this.form.prize3after = "";
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

<template>
  <b-card title="รายการสมาชิก">
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
          <b-col md="4">
            <b-form-group>
              <label>เบอร์โทรศัพท์:</label>
              <b-form-input
                v-model="filter.name"
                type="text"
                class="d-inline-block"
                @input="getData()"
              />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="button"
                variant="success"
                class="mr-1 float-left"
                @click="handleSearch"
              >
                <feather-icon icon="SearchIcon" class="mr-50" />
                <span class="align-middle">ค้นหา</span>
              </b-button>
            </b-form-group>
          </b-col>
          <!-- <b-col md="4">
          <b-form-group>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="button"
              variant="primary"
              class="mr-1 float-right"
              :to="{ name: 'addlottery' }"
              exact
            >
              <feather-icon icon="PlusIcon" class="mr-50" />
              <span class="align-middle">เพิ่มรุ่นรถ</span>
            </b-button>
          </b-form-group>
        </b-col> -->
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
          <span v-if="props.column.field === 'num'">
            <!-- <button>{{ props.row.is_active}}</button> -->
            <span>{{ props.row.originalIndex + 1 }}</span>
          </span>
          <span v-if="props.column.field === 'credit_balance_user'">
            <!-- <button>{{ props.row.is_active}}</button> -->
            <span class="badge bg-success">{{
              numberWithCommas(props.row.credit_balance)
            }}</span>
          </span>
          <span v-if="props.column.field === 'status'">
            <!-- <button>{{ props.row.is_active}}</button> -->
            <b-form-checkbox
              unchecked-value="0"
              name="check-button"
              class="custom-control-success"
              switch
              inline
              checked
              value="1"
              @change="updateStatus(props.row.id)"
              v-model="props.row.is_active"
            >
            </b-form-checkbox>
          </span>
          <span v-if="props.column.field === 'credit'">
            <!-- <button>{{ props.row.is_active}}</button> -->
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
          </span>
          <!-- <span v-if="props.column.field === 'action'">
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
          </span> -->

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
      <validation-observer ref="addCredit">
        <b-modal
          id="modal-credit"
          ref="modalAddcredit"
          cancel-variant="outline-secondary"
          centered
          hide-footer
          title="เพิ่มเครดิต"
        >
          <b-form>
            <b-form-group>
              <label for="email">เครดิต:</label>
              <validation-provider
                #default="{ errors }"
                name="เครดิต"
                rules="required|integer|"
              >
                <b-form-input
                  id="credit"
                  type="number"
                  placeholder="เครดิต"
                  v-model="form.credit"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group>
              <label for="password">ประเภท</label>
              <v-select
                v-model="form.type"
                :options="optionsCredit"
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
                  variant="success"
                  class="mr-1"
                  exact
                  @click="validationForm()"
                >
                  <feather-icon icon="PlusIcon" class="mr-50" />
                  <span class="align-middle">เพิ่มเครดิต</span>
                </b-button>
              </div>
            </b-form-group>
          </b-form>
        </b-modal>
      </validation-observer>
      <validation-observer ref="disCredit">
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
      </validation-observer>
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
  BOverlay,
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
    BOverlay,
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
      OverlayFlag: false,
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
          label: "เบอร์โทรศัพท์",
          field: "phone",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "เครดิต",
          field: "credit_balance_user",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "ชื่อ",
          field: "name",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "นามสกุล",
          field: "familyName",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "ธนาคาร",
          field: "bank",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "เลขบัญชี",
          field: "bank_number",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "สถานะ",
          field: "status",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "สิทธ์",
          field: "role",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "เครดิต",
          field: "credit",
          width: "120px",
          sortable: false,
        },
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
      },
      form: {
        credit: 0,
        note: "",
        type: "",
      },
      optionsCredit: ["เติมเครดิตแมนนวล", "ถูกลอตเตอรี่"],
      optionsDisCredit: [
        "เกิดข้อผิดพลาดทางระบบ",
        "เติมเครดิตผิด",
        "ถอนแมนนวล",
        "คืนเครดิต",
      ],
      required,
      integer,
      dataCredit: "",
      dataDisCredit: "",
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
      HTTP.get("api/admin/member", {
        params: {
          // search: this.searchTerm,
          perPage: this.pageLength,
          page: this.currentPage,
          filter: this.filter.name,
          // orderBy: JSON.stringify(this.sort),
        },
      })
        .then((response) => {
          this.rows = response.data.data.data;
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
    updateStatus(id) {
      HTTP.put(`api/admin/member/ban-user`, { id: id })
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
            }
          }
        });
    },
    validationForm() {
      this.$refs.addCredit.validate().then((success) => {
        if (success) {
          console.log(this.dataCredit);
          HTTP.put(
            `api/admin/member/add-credit`,
            {
              phone: this.dataCredit.phone,
              amount: this.form.credit,
              type: this.form.type,
              note: this.form.note,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("bb_token"),
              },
            }
          )
            .then((resp) => {
              this.showToast(
                resp.data.msg != null ? resp.data.msg : "สำเร็จ",
                "success"
              );
              this.getData();
              this.$refs.modalAddcredit.hide();
            })
            .catch((error) => {
              this.showToast(error.response.data.msg, "danger");
            });
        }
      });
    },
    validationFormDisCredit() {
      this.$refs.addCredit.validate().then((success) => {
        if (success) {
          HTTP.put(
            `api/admin/member/dis-credit`,
            {
              id: this.dataDisCredit.id,
              amount: this.form.credit,
              type: this.form.type,
              note: this.form.note,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("bb_token"),
              },
            }
          )
            .then((resp) => {
              this.showToast(
                resp.data.msg != null ? resp.data.msg : "สำเร็จ",
                "success"
              );
              this.getData();
              this.$refs.modalDiscredit.hide();
            })
            .catch((error) => {
              this.showToast(error.response.data.msg, "danger");
            });
        }
      });
    },
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
    showModalAddCredit(data) {
      this.form.credit = 0;
      this.form.note = "";
      this.form.type = "";
      this.dataCredit = data;
      this.$refs.modalAddcredit.show();
    },
    showModalDisCredit(data) {
      this.form.credit = 0;
      this.form.note = "";
      this.form.type = "";
      this.dataDisCredit = data;
      this.$refs.modalDiscredit.show();
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
    numberWithCommas(x) {
      return x
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

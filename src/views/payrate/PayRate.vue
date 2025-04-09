<template>
  <b-card title="รายการอัตราจ่าย">
    <div class="custom-search">
      <!-- advance search input -->
      <b-row class="align-items-end">
        <b-col md="3">
          <b-form-group>
            <label for="password">ประเภทหวย</label>
            <v-select
              v-model="filter.typeHuay"
              :options="optionsTypeHuay"
              label="type"
              placeholder="ประเภทหวย"
              :clearable="true"
              @input="getData()"
            />
          </b-form-group>
        </b-col>
        <b-col md="9" v-if="filter.typeHuay">
          <b-form-group>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="button"
              variant="primary"
              class="float-right"
              exact
              @click="showModalAddPrize()"
              v-if="rows.length < 1"
            >
              <feather-icon icon="PlusIcon" class="mr-50" />
              <span class="align-middle">เพิ่มอัตราจ่าย</span>
            </b-button>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="button"
              variant="danger"
              class="float-right mr-2"
              exact
              @click="validationDeleteForm()"
            >
              <feather-icon icon="TrashIcon" class="mr-50" />
              <span class="align-middle">ลบอัตราจ่าย</span>
            </b-button>
          </b-form-group>
        </b-col>
      </b-row>
    </div>

    <div style="overflow-x: auto; padding: 0" v-if="rows ? rows.length : 0">
      <hr />
      <table class="table">
        <thead>
          <tr class="text-center">
            <th>ลำดับ</th>
            <th>เลขปิดรับ</th>
            <th>ราคาจ่าย</th>
            <th>ประเภทหวย</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(data, index) in rows"
            :key="index"
            class="text-center"
            :class="{
              'bg-danger text-white':
                data.buy_limit < 1 && data.buy_limit != null,
            }"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ data.name }}</td>
            <td>{{ data.price.toFixed(2) }}</td>
            <td>{{ data.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- </div> -->
    <!-- </div> -->
    <div class="text-center mt-3 mb-3" v-else>ไม่พบข้อมูล</div>
    <validation-observer ref="addCredit">
      <b-modal
        id="modal-credit"
        ref="modalAddPrize"
        cancel-variant="outline-secondary"
        centered
        hide-footer
        no-close-on-backdrop
        title="เพิ่มอัตราจ่าย"
      >
        <b-form>
          <b-row>
            <!-- <b-col md="6">
              <b-form-group>
                <label for="email">ประเภทหวย:</label>
                <v-select
                  v-model="form.typeHuay"
                  :options="optionsTypeHuay"
                  label="type"
                  placeholder="ประเภทหวย"
                  :clearable="true"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ประเภทเลข:</label>
                <v-select
                  v-model="form.typeNumber"
                  :options="optionsType"
                  label="lotto_type_name"
                  placeholder="ประเภทเลข"
                  :clearable="true"
                />
              </b-form-group>
            </b-col> -->
            <b-col md="6">
              <b-form-group>
                <label for="email">ราคาจ่าย **(4 ตัวบน):</label>
                <b-form-input
                  id="price"
                  type="number"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="form.pay_4top"
                  maxlength="4"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ราคาจ่าย **(4 ตัวโต๊ด):</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="form.pay_4tod"
                  maxlength="4"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ราคาจ่าย **(3 ตัวบน):</label>
                <b-form-input
                  id="price"
                  type="number"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="form.pay_3top"
                  maxlength="3"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ราคาจ่าย **(3 ตัวโต๊ด):</label>
                <b-form-input
                  id="price"
                  type="number"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="form.pay_3tod"
                  maxlength="3"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ราคาจ่าย **(3 ตัวหน้า):</label>
                <b-form-input
                  id="price"
                  type="number"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="form.pay_3front"
                  maxlength="3"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ราคาจ่าย **(3 ตัวหลัง):</label>
                <b-form-input
                  id="price"
                  type="number"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="form.pay_3after"
                  maxlength="3"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ราคาจ่าย **(2 ตัวบน):</label>
                <b-form-input
                  id="price"
                  type="number"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="form.pay_2top"
                  maxlength="3"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ราคาจ่าย **(2 ตัวล่าง):</label>
                <b-form-input
                  id="price"
                  type="number"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="form.pay_2bottom"
                  maxlength="3"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ราคาจ่าย **(วิ่งบน):</label>
                <b-form-input
                  id="price"
                  type="number"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="form.pay_runtop"
                  maxlength="3"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ราคาจ่าย **(วิ่งล่าง):</label>
                <b-form-input
                  id="price"
                  type="number"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="form.pay_runbottom"
                  maxlength="3"
                />
              </b-form-group>
            </b-col>
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
                    <span class="align-middle">เพิ่มอัตราจ่าย</span>
                  </b-button>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-modal>
    </validation-observer>
    <validation-observer ref="editForm">
      <b-modal
        id="modal-credit"
        ref="modalEditCloseNumber"
        cancel-variant="outline-secondary"
        centered
        hide-footer
        no-close-on-backdrop
        title="แก้ไขเลขปิดรับ"
      >
        <b-form>
          <b-row>
            <b-col md="4">
              <b-form-group>
                <label for="email">เลขปิดรับ:</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="ราคาจ่าย"
                  pattern="[0-9]*"
                  v-model="formedit.number"
                  maxlength="10"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group>
                <label for="email">ราคาจ่าย (ขั้นที่ 1):</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="ราคาจ่าย"
                  pattern="[0-9]*"
                  v-model="formedit.pay"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group>
                <label for="email">จำนวนที่ซื้อได้ (ขั้นที่ 1):</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="formedit.buy_limit"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="4"> </b-col>
            <b-col md="4">
              <b-form-group>
                <label for="email">ราคาจ่าย (ขั้นที่ 2):</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="ราคาจ่าย"
                  pattern="[0-9]*"
                  v-model="formedit.pay2"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group>
                <label for="email">จำนวนที่ซื้อได้ (ขั้นที่ 2):</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="formedit.buy_limit2"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="4"> </b-col>
            <b-col md="4">
              <b-form-group>
                <label for="email">ราคาจ่าย (ขั้นที่ 3):</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="ราคาจ่าย"
                  pattern="[0-9]*"
                  v-model="formedit.pay3"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group>
                <label for="email">จำนวนที่ซื้อได้ (ขั้นที่ 3):</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="formedit.buy_limit3"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group>
                <div class="text-center">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="button"
                    variant="success"
                    class="mr-1"
                    exact
                    @click="validationEditForm()"
                  >
                    <feather-icon icon="PlusIcon" class="mr-50" />
                    <span class="align-middle">แก้ไขเลขปิดรับ</span>
                  </b-button>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-modal>
    </validation-observer>
    <validation-observer ref="deleteCredit">
      <b-modal
        id="modal-credit"
        ref="modalDeletePrize"
        cancel-variant="outline-secondary"
        centered
        hide-footer
        no-close-on-backdrop
        title="ลบเลขปิดรับ"
      >
        <b-form>
          <b-row>
            <b-col md="6">
              <b-form-group>
                <label for="email">ประเภทหวย:</label>
                <v-select
                  v-model="form.typeHuay"
                  :options="optionsTypeHuay"
                  label="lotto_type_name"
                  placeholder="ประเภทหวย"
                  :clearable="true"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ประเภทเลข:</label>
                <v-select
                  v-model="form.typeNumber"
                  :options="optionsType"
                  label="lotto_type_name"
                  placeholder="ประเภทเลข"
                  :clearable="true"
                />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group>
                <div class="text-center">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="button"
                    variant="danger"
                    class="mr-1"
                    exact
                    @click="validationDeleteForm()"
                  >
                    <feather-icon icon="TrashIcon" class="mr-50" />
                    <span class="align-middle">ลบเลขปิดรับ</span>
                  </b-button>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-modal>
    </validation-observer>
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
          label: "หวย",
          field: "lotto_type_name",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "เลขปิดรับ",
          field: "number",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "ประเภทเลข",
          field: "type",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "วันที่ปิดรับ",
          field: "date_close",
        },
        // {
        //   thClass: "text-center",
        //   tdClass: "text-center",
        //   label: "ออกผล",
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
        subject: "",
        startDate: "",
        endDate: "",
        typeHuay: null,
      },
      form: {},
      formedit: {
        pay: "",
        pay2: "",
        pay3: "",
        buy_limit: "",
        buy_limit2: "",
        buy_limit3: "",
        cn_id: "",
        closeNumber: "",
      },
      optionsType: ["3 ตัวบน", "3 ตัวโต๊ด", "2 ตัวบน", "2 ตัวล่าง"],
      optionsTypeHuay: [],
      required,
      integer,
      dataCredit: "",
      dataDisCredit: "",
      max: 3,
      closeNumber: [],
      allNumber: "0",
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
    // getDataLottoType: function () {
    //   const lotto = [];
    //   // const matches = this.option.map((item) => item.lotto_type_name);
    //   // let program = [...new Set(matches)];
    //   for (let i = 0; i < this.optionsType.length; i++) {
    //     const item = this.optionsType[i];
    //     const result = this.rows.filter((el) => el.type === item);
    //     lotto.push({ program: item, result });
    //   }
    //   return lotto;
    // },
  },
  created() {
    this.getData();
  },
  mounted() {
    this.fetchTypeHuay();
  },
  methods: {
    numberWithCommas(x) {
      let sum = 0;
      if (x) {
        sum = x;
        return (
          parseFloat(sum)
            // .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
      }
      return x != null ? x : "-";
    },
    getData() {
      this.isLoading = true;
      HTTP.get("api/type-options/payrate", {
        params: {
          type_id: this.filter.typeHuay
            ? this.filter.typeHuay.type_id
            : undefined,
        },
      })
        .then((response) => {
          this.rows = response.data.data;
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
    fetchTypeHuay() {
      HTTP.get("api/type-options/type", {})
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
    updateStatus(id) {
      HTTP.get(`api/get-prize/lotto-results`, { params: { lotto_type_id: id } })
        .then((resp) => {
          this.showToast(resp.data.msg, "success");
          this.updateBalance(id);
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
    updateBalance(id) {
      HTTP.put(`api/get-prize/update-creditbalacne`, {
        lotto_type_id: id,
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
      var type_options = [
        {
          name: "4 ตัวบน",
          price: this.form.pay_4top,
          type_id: this.filter.typeHuay.type_id,
        },
        {
          name: "4 ตัวโต๊ด",
          price: this.form.pay_4tod,
          type_id: this.filter.typeHuay.type_id,
        },
        {
          name: "4 ตัวกลับ",
          price: this.form.pay_4top,
          type_id: this.filter.typeHuay.type_id,
        },
        {
          name: "3 ตัวบน",
          price: this.form.pay_3top,
          type_id: this.filter.typeHuay.type_id,
        },
        {
          name: "3 ตัวโต๊ด",
          price: this.form.pay_3tod,
          type_id: this.filter.typeHuay.type_id,
        },
        {
          name: "3 ตัวกลับ",
          price: this.form.pay_3top,
          type_id: this.filter.typeHuay.type_id,
        },
        {
          name: "3 ตัวหน้า",
          price: this.form.pay_3front,
          type_id: this.filter.typeHuay.type_id,
        },
        {
          name: "3 ตัวหลัง",
          price: this.form.pay_3after,
          type_id: this.filter.typeHuay.type_id,
        },
        {
          name: "2 ตัวบน",
          price: this.form.pay_2top,
          type_id: this.filter.typeHuay.type_id,
        },
        {
          name: "2 ตัวล่าง",
          price: this.form.pay_2bottom,
          type_id: this.filter.typeHuay.type_id,
        },
        {
          name: "2 ตัวกลับ",
          price: this.form.pay_2top,
          type_id: this.filter.typeHuay.type_id,
        },
        {
          name: "วิ่งบน",
          price: this.form.pay_runtop,
          type_id: this.filter.typeHuay.type_id,
        },
        {
          name: "วิ่งล่าง",
          price: this.form.pay_runbottom,
          type_id: this.filter.typeHuay.type_id,
        },
      ];
      this.$refs.addCredit.validate().then((success) => {
        if (success) {
          HTTP.post(`api/type-options/add-type-options`, {
            type_options: type_options,
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
    validationDeleteForm() {
      HTTP.delete(`api/type-options/delete-payrate`, {
        data: {
          type_id: this.filter.typeHuay
            ? this.filter.typeHuay.type_id
            : undefined,
        },
      })
        .then((resp) => {
          this.showToast(
            resp.data.msg != null ? resp.data.msg : "สำเร็จ",
            "success"
          );
          // this.$refs.modalEditCloseNumber.hide();
          this.getData();
        })
        .catch((error) => {
          this.showToast(error.response.data.msg, "danger");
        });
    },
    validationEditForm() {
      this.$refs.editForm.validate().then((success) => {
        if (success) {
          HTTP.put(`api/close-number/edit-close-number`, {
            cn_id: this.formedit.cn_id,
            pay: this.formedit.pay,
            pay2: this.formedit.pay2,
            pay3: this.formedit.pay3,
            buy_limit: this.formedit.buy_limit ? this.formedit.buy_limit : 0,
            buy_limit2: this.formedit.buy_limit2 ? this.formedit.buy_limit2 : 0,
            buy_limit3: this.formedit.buy_limit3 ? this.formedit.buy_limit3 : 0,
          })
            .then((resp) => {
              this.showToast(
                resp.data.msg != null ? resp.data.msg : "สำเร็จ",
                "success"
              );
              this.$refs.modalEditCloseNumber.hide();
              this.getData();
            })
            .catch((error) => {
              this.showToast(error.response.data.msg, "danger");
            });
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
      //   this.dataCredit = data;
      this.$refs.modalAddPrize.show();
    },
    showModalEditCloseNumber(data) {
      this.formedit = data;
      this.form.typeHuay = "";
      //   this.dataCredit = data;
      this.$refs.modalEditCloseNumber.show();
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
    formatDateDay(date) {
      return moment(date).format("DD-MM-YYYY");
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

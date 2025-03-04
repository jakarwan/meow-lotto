<template>
  <section id="dashboard-ecommerce">
    <b-row>
      <b-col class="mb-1" xl="12">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="submit"
          variant="primary"
          class="mr-1"
          @click="$router.go(-1)"
        >
          <feather-icon icon="ChevronLeftIcon" />
          กลับ
        </b-button>
      </b-col>
      <b-col xl="6" lg="12" md="12">
        <b-card-code title="แก้ไขประเภทหวย">
          <validation-observer ref="addLotteryForm">
            <b-form>
              <b-row>
                <b-col cols="6">
                  <b-form-group>
                    <h5 class="font-weight-bold">ประเภทหวย</h5>
                    <validation-provider
                      #default="{ errors }"
                      name="ประเภทหวย"
                      rules="required|"
                    >
                      <b-form-input
                        id="installment"
                        type="text"
                        v-model="form.lotto_type_name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <!-- <b-col cols="6">
                  <b-form-group>
                    <validation-provider
                      #default="{ errors }"
                      name="set"
                      rules="required|integer|"
                    >
                      <h5 class="font-weight-bold">ชุด</h5>
                      <b-form-input id="set" type="number" v-model="form.set" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col> -->
                <b-col cols="6">
                  <b-form-group>
                    <h5 class="font-weight-bold">เวลาหวยปิดรับ</h5>
                    <flat-pickr
                      v-model="form.dateDefault"
                      class="form-control"
                      :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                    />
                  </b-form-group>
                </b-col>
                <!-- <b-col cols="12">
                  <b-form-group>
                    <h5 class="font-weight-bold">ราคา</h5>
                    <v-select
                      v-model="form.selected"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      label="title"
                      :options="option"
                    />
                  </b-form-group>
                </b-col> -->
                <!-- <b-col cols="12">
                  <b-form-group>
                    <h5 class="font-weight-bold">เลขลอตเตอรี่</h5>
                    <validation-provider
                      #default="{ errors }"
                      name="lotterNumber"
                      rules="required|integer|"
                    >
                      <b-form-input
                        id="lotterNumber"
                        type="text"
                        v-model="form.lotteryNumber"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col> -->
                <b-col cols="12">
                  <b-form-group>
                    <h5 class="font-weight-bold">รูปประเภทหวย</h5>
                    <b-form-file
                      @input="onFileChange"
                      placeholder="เลือกไฟล์รูปภาพ..."
                      drop-placeholder="วางรูปภาพ..."
                    />
                  </b-form-group>
                  <div class="mb-2">
                    <h5 class="font-weight-bold">สีพื้นหลัง</h5>
                    <input type="color" v-model="selectedColor" />
                    {{ selectedColor }}
                  </div>
                  <div>
                    <b-form-group label="วันหวยปิด:">
                      <b-form-checkbox-group
                        id="checkbox-group-1"
                        v-model="selected"
                        :options="options"
                        value-field="c_day"
                        name="flavour-1"
                        class="demo-inline-spacing"
                      />
                    </b-form-group>
                    <!-- <b-form-checkbox
                      v-model="form.close[0].c_code"
                      value="1"
                      class="custom-control-primary"
                    >
                      วันอาทิตย์
                    </b-form-checkbox>
                    <b-form-checkbox
                      v-model="form.close[1].c_code"
                      value="2"
                      class="custom-control-primary"
                    >
                      วันจันทร์
                    </b-form-checkbox>
                    {{ form.close }} -->
                  </div>
                  <div class="text-center m-2">
                    <img :src="form.lotteryImg" alt="" width="100%" height="100%" />
                  </div>
                </b-col>
                <b-col cols="12" class="text-center">
                  <h5 class="font-weight-bold">เปิด/ปิดหวย</h5>
                  <b-form-checkbox
                    unchecked-value="0"
                    name="check-button"
                    class="custom-control-success"
                    switch
                    inline
                    checked
                    value="1"
                    v-model="form.open"
                  >
                  </b-form-checkbox>
                </b-col>
                <!-- submit and reset -->
                <b-col>
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="submit"
                    variant="primary"
                    class="mr-1"
                    @click.prevent="validationForm"
                  >
                    บันทึก
                  </b-button>
                  <!-- <b-button
                    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                    type="reset"
                    variant="outline-secondary"
                  >
                    Reset
                  </b-button> -->
                </b-col>
              </b-row>
            </b-form>
          </validation-observer>
        </b-card-code>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import BCardCode from "@core/components/b-card-code";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BFormCheckboxGroup,
  BForm,
  BButton,
  BFormFile,
} from "bootstrap-vue";
import { mapGetters } from "vuex";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import moment from "moment";
import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, integer } from "@validations";
import { HTTP } from "@/services/http-common";

export default {
  components: {
    BCardCode,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BFormCheckboxGroup,
    BForm,
    BButton,
    BFormFile,
    flatPickr,
    vSelect,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      option: [80, 90, 100, 110, 120, 130],
      // validation
      required,
      integer,
      form: {
        dateDefault: "",
        selected: 80,
        lotto_type_name: "dd",
        set: "",
        lotteryNumber: "",
        lotteryImg: null,
        close: "",
        c_code: "",
        open: 0,
      },
      selected: [],
      selectedColor: "",
      options: [
        { text: "วันอาทิตย์", c_code: "1", c_day: "อาทิตย์" },
        { text: "วันจันทร์", c_code: "2", c_day: "จันทร์" },
        { text: "วันอังคาร", c_code: "3", c_day: "อังคาร" },
        { text: "วันพุธ", c_code: "4", c_day: "พุธ" },
        { text: "วันพฤหัสบดี", c_code: "5", c_day: "พฤหัสบดี" },
        { text: "วันศุกร์", c_code: "6", c_day: "ศุกร์" },
        { text: "วันเสาร์", c_code: "7", c_day: "เสาร์" },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.isLoading = true;
      HTTP.get("api/lotto-type/edit", {
        params: {
          // search: this.searchTerm,
          lotto_type_id: this.$route.params.id,
        },
      })
        .then((response) => {
          this.form.lotto_type_name = response.data.data.lotto_type_name;
          this.form.dateDefault = response.data.data.closing_time;
          this.form.lotteryImg = response.data.data.lotto_type_img;
          this.form.open = response.data.data.open;
          this.selectedColor = response.data.data.lotto_bg;
          this.selected = response.data.close;
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
    validationForm() {
      this.$refs.addLotteryForm.validate().then((success) => {
        if (success) {
          if (this.form.dateDefault != null) {
            if (this.form.lotteryImg != null) {
              //   let installment = parseInt(this.form.installment);
              //   let set = parseInt(this.form.set);
              //   let lotterNumber = parseInt(this.form.lotteryNumber);
              let formData = new FormData();
              formData.append("file", this.form.lotteryImg);
              formData.append("lotto_type_id", this.$route.params.id);
              formData.append("name", this.form.lotto_type_name);
              formData.append("closing_time", this.form.dateDefault);
              formData.append("open", this.form.open);
              formData.append("close_date", JSON.stringify(this.selected));
              formData.append("colorCode", this.selectedColor);

              HTTP.put(`api/lotto-type/edit-lotto-type`, formData, {
                // headers: {
                //   "Content-Type": "multipart/form-data",
                //   Authorization: "Bearer " + localStorage.getItem("bb_token"),
                // },
              })
                .then((resp) => {
                  if (
                    resp.data.status != undefined &&
                    resp.data.status === "error"
                  ) {
                    this.showToast(
                      resp.data.message != undefined
                        ? resp.data.message
                        : "ไม่สามารถทำรายการได้ กรุณาลองใหม่",
                      "danger"
                    );
                  } else {
                    this.showToast("เพิ่มลอตเตอรี่สำเร็จ", "success");
                  }
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
            } else {
              this.showToast("กรุณาเลือกรูปภาพ", "danger");
            }
          } else {
            this.showToast("กรอกข้อมูลให้ครบถ้วน", "danger");
          }
        }
      });
    },
    onFileChange(files) {
      this.form.lotteryImg = files;
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
  },
  computed: {
    ...mapGetters(["User"]),
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/dashboard-ecommerce.scss";
@import "@core/scss/vue/libs/chart-apex.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>

<template>
  <section id="dashboard-ecommerce">
    <b-row>
      <b-col xl="6" lg="12" md="12">
        <b-card-code title="เพิ่มลอตเตอรี่">
          <validation-observer ref="addLotteryForm">
            <b-form>
              <b-row>
                <b-col cols="6">
                  <b-form-group>
                    <h5 class="font-weight-bold">งวด</h5>
                    <validation-provider
                      #default="{ errors }"
                      name="installment"
                      rules="required|integer|"
                    >
                      <b-form-input
                        id="installment"
                        type="number"
                        v-model="form.installment"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
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
                </b-col>
                <b-col cols="12">
                  <b-form-group>
                    <h5 class="font-weight-bold">วันที่ออกรางวัล</h5>
                    <flat-pickr
                      v-model="form.dateDefault"
                      class="form-control"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-form-group>
                    <h5 class="font-weight-bold">ราคา</h5>
                    <v-select
                      v-model="form.selected"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      label="title"
                      :options="option"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12">
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
                </b-col>
                <b-col cols="12">
                  <b-form-group>
                    <h5 class="font-weight-bold">รูปลอตเตอรี่</h5>
                    <b-form-file
                      @input="onFileChange"
                      placeholder="เลือกไฟล์รูปภาพ..."
                      drop-placeholder="วางรูปภาพ..."
                    />
                  </b-form-group>
                </b-col>
                <!-- submit and reset -->
                <b-col offset-md="4">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="submit"
                    variant="primary"
                    class="mr-1"
                    @click.prevent="validationForm"
                  >
                    Submit
                  </b-button>
                  <b-button
                    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                    type="reset"
                    variant="outline-secondary"
                  >
                    Reset
                  </b-button>
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
        dateDefault: moment(new Date()).format("YYYY-MM-DD"),
        selected: 80,
        installment: "",
        set: "",
        lotteryNumber: "",
        lotteryImg: null,
      },
    };
  },
  methods: {
    validationForm() {
      this.$refs.addLotteryForm.validate().then((success) => {
        if (success) {
          if (this.form.dateDefault != null && this.form.selected != null) {
            if (this.form.lotteryImg != null) {
              let installment = parseInt(this.form.installment);
              let set = parseInt(this.form.set);
              let lotterNumber = parseInt(this.form.lotteryNumber);

              let formData = new FormData();
              formData.append("file", this.form.lotteryImg);
              formData.append("lotteryNumber", lotterNumber);
              formData.append("price", this.form.selected);
              formData.append("installment", installment);
              formData.append("set", set);
              formData.append("dateLottery", this.form.dateDefault);

              HTTP.post(`api/lottery/upload`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + localStorage.getItem("bb_token"),
                },
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
                        err.response.data.message !== undefined
                          ? err.response.data.message
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

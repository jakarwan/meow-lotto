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
        <b-card-code title="เพิ่มประเภทหวย">
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
                    <h5 class="font-weight-bold">ประเภทหวย</h5>
                    <v-select
                      v-model="form.selected"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      label="type"
                      :options="option"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
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
                      @change="onFileChange"
                      placeholder="เลือกไฟล์รูปภาพ..."
                      drop-placeholder="วางรูปภาพ..."
                    />
                  </b-form-group>
                  <div class="text-center m-2" v-if="url">
                    <img :src="url" alt="" width="100%" height="100%" />
                  </div>
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
      option: [],
      // validation
      required,
      integer,
      form: {
        dateDefault: "",
        selected: "",
        lotto_type_name: "",
        set: "",
        lotteryNumber: "",
        lotteryImg: null,
      },
      url: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.isLoading = true;
      HTTP.get("api/type")
        .then((response) => {
          this.option = response.data.data;
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
              formData.append(
                "type_id",
                this.form.selected != null
                  ? this.form.selected.type_id
                  : undefined
              );
              formData.append("name", this.form.lotto_type_name);
              formData.append("closing_time", this.form.dateDefault);

              HTTP.post(`api/lotto-type/add-lotto-type`, formData, {
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
                    this.$router.go(-1)
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
      const file = files.target.files[0];
      if (file) {
        this.url = URL.createObjectURL(file);
      }
      this.form.lotteryImg = file;
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

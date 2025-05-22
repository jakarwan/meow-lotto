<template>
  <section id="dashboard-ecommerce">
    <b-row>
      <b-col class="mb-1" xl="12">
        <!-- <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="submit"
          variant="primary"
          class="mr-1"
          @click="$router.go(-1)"
        >
          <feather-icon icon="ChevronLeftIcon" />
          กลับ
        </b-button> -->
      </b-col>
      <b-col xl="12" lg="12" md="12">
        <b-card-code>
          <!-- <div>

          </div> -->
          <b-row v-for="(data, index) in getDataLottoType" :key="index">
            <b-col xl="12" v-if="data.data.length > 0">
              <h2>{{ data.program }}</h2>
              <b-row>
                <b-col
                  xl="2"
                  lg="4"
                  md="4"
                  cols="6"
                  class="mb-2"
                  v-for="(item, index) in data.data"
                  :key="'img' + index"
                >
                  <!-- {{ data.data.length }} -->
                  <b-row>
                    <b-col xl="12" lg="12" md="12" cols="12">
                      <div
                        class="game-list-item"
                        :id="'huay' + item.lotto_type_id"
                        :class="{ 'filter-gray-huay': item.open != 1 }"
                        style="height: 120px;"
                        @click="
                          onClickPlay(item.lotto_type_id, item.lotto_type_name)
                        "
                      >
                        <img
                          :src="item.lotto_type_img"
                          alt=""
                          class="img-lotto"
                        />
                      </div>
                      <!-- <span :id="'demo' + item.lotto_type_id" class="fix-time">
                        {{
                          countDown(
                            item.closing_time,
                            item.lotto_type_id,
                            item.open
                          )
                        }}
                      </span> -->
                      
                      <div class="text-center mt-4">
                        {{ item.lotto_type_name }}
                      </div>
                      <div class="text-center" :id="'demo' + item.lotto_type_id">
                        {{
                          countDown(
                            item.closing_time,
                            item.lotto_type_id,
                            item.open
                          )
                        }}
                      </div>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
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
import html2canvas from "html2canvas";
const fs = require("fs");

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
      rows: [],
      output: null,
      url: "",
      close: "",
    };
  },
  created() {
    this.getData();
    this.getDataType();
  },
  methods: {
    getData() {
      this.isLoading = true;
      HTTP.get("api/lotto-type")
        .then((response) => {
          this.rows = response.data.data;
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
    getDataType() {
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
    onClickPlay(id, name) {
      //   if (this.Auth.loggedIn) {
      HTTP.get(`api/get-status`, {
        params: { type_id: id },
      })
        .then((resp) => {
          if (resp.data.status) {
            this.$router.push({
              name: "playlotto",
              params: { huayId: id },
            });
          } else {
            //   this.$router.push({
            //     name: "prize",
            //     params: { huayId: id },
            //   });
            this.showToast(resp.data.msg, "danger");
          }
        })
        .catch((err) => {
          this.showToast(err.response.data.msg, "danger");
        });
      //   }
    },
    countDown(date, id, open) {
      if (date != null && id != null) {
        var dd = moment(new Date(date)).format("YYYY-MM-DD HH:mm:ss");
        this.polling = setInterval(() => {
          var countDownDate = new Date(dd).getTime();
          var now = new Date().getTime();
          var distance = countDownDate - now;
          // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          var t = document.getElementById(`demo${id}`);
          if (t != null) {
            if (open != 0) {
              document.getElementById(`demo${id}`).innerHTML =
                // `${days} วัน` +
                ("0" + hours).slice(-2) +
                ":" +
                ("0" + minutes).slice(-2) +
                ":" +
                ("0" + seconds).slice(-2);
            } else {
              document.getElementById(`demo${id}`).innerHTML = "ปิดรับแทง";
            }
            if (distance < 0) {
              document.getElementById(`demo${id}`).innerHTML = "ปิดรับแทง";
              // this.close = open;
              //   document
              //     .getElementById(`demo${id}`)
              //     .classList.remove("bg-warning");
              // document.getElementById(`demo${id}`).classList.add("d-none");
              document
                .getElementById(`huay${id}`)
                .classList.add("filter-gray-huay");
            }
          }
        }, 1000);
      }
    },
  },
  computed: {
    ...mapGetters(["User"]),
    ...mapGetters(["Auth"]),
    getDataLottoType: function () {
      //   return this.rows.filter((el) => {
      //     return this.option.filter((item) => {
      //       return el.type === item.type;
      //     });
      //   });
      const lotto = [];
      const matches = this.option.map((item) => item.type);
      let program = [...new Set(matches)];
      // const dataNew = [];
      for (let i = 0; i < program.length; i++) {
        const item = program[i];
        const result = this.rows.filter((el) => el.type === item);
        lotto.push({ program: item, data: result });
      }
      return lotto;
    },
  },
};
</script>

<style>
.game-list-item {
  content: "";
  position: relative;
  top: 50%;
  left: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px 8px;
  font-size: 1.125rem;
  font-weight: 500;
  color: #f3f3f3;
  background: rgba(199, 0, 0, 0.8);
  transform: translateY(-50%);
  border-radius: 10px;
  cursor: pointer;
}

.filter-gray-huay {
  filter: grayscale(65%);
  border-radius: 10px;
}

.fix-time {
  position: relative;
  top: -22%;
  width: 100% !important;
  z-index: 3;
  font-size: 21px;
  left: 30% !important;
  color: white;
}
.img-lotto {
  width: 100%;
  border-radius: 10px;
}
@media (min-width: 1440px) {
  .fix-time {
    font-size: 23px;
  }
}
</style>

<style lang="scss">
@import "@core/scss/vue/pages/dashboard-ecommerce.scss";
@import "@core/scss/vue/libs/chart-apex.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>

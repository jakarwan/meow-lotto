<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />
        <h2 class="brand-text text-primary ml-1">Vuexy</h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex flex-lg-column align-items-center justify-content-center px-5"
        >
          <b-img fluid :src="imgUrl" alt="Login V2" style="width: 50%" />
          <a
            href="https://www.freepik.com/vectors/brochure"
            style="font-size: 0.5em"
            >Brochure vector created by katemangostar - www.freepik.com</a
          >
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            ลอตเตอรี่ออนไลน์! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            เข้าสู่ระบบเพื่อสั่งซื้อสินค้า
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form class="auth-login-form mt-2" @submit.prevent>
              <!-- phone -->
              <b-form-group label="เบอร์โทรศัพท์" label-for="login-phone">
                <validation-provider
                  #default="{ errors }"
                  name="phone"
                  rules="required"
                >
                  <b-form-input
                    id="login-phone"
                    v-model="userPhone"
                    :state="errors.length > 0 ? false : null"
                    name="login-phone"
                    placeholder="080XXXXXXX"
                    maxlength="30"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">รหัสผ่าน</label>
                  <!-- <b-link :to="{name:'auth-forgot-password-v2'}">
                    <small>Forgot Password?</small>
                  </b-link> -->
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                ยังไม่มีบัญชีผู้ใช้ ?
                <b-link :to="{ path: '/register' }" class="text-primary"
                  >สมัครสมาชิก</b-link
                >
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                @click="validationForm"
              >
                เข้าสู่ระบบ
              </b-button>
            </b-form>
          </validation-observer>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
} from "bootstrap-vue";
import { required, integer } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { HTTP } from "@/services/http-common";
import { mapGetters } from "vuex";

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      password: "",
      userPhone: "",
      sideImg: require("@/assets/images/logo/lotto.png"),
      // validation rulesimport store from '@/store/index'
      required,
      integer,
      max: 10,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
    ...mapGetters(["Auth"]),
  },
  mounted() {
    console.log(this.$route.query);
    if (this.$route.query.phone && this.$route.query.password) {
      const storage = localStorage.getItem("bb_token");
      console.log(storage);
      if (storage != null) {
        // localStorage.removeItem("bb_token");
        this.$store.dispatch("logoutAuth");
        this.queryParamsLogin();
      } else {
        this.queryParamsLogin();
      }
    }
  },
  methods: {
    validationForm() {
      this.$refs.loginValidation.validate().then((success) => {
        if (success) {
          HTTP.post(`api/auth/login`, {
            phone: this.userPhone,
            password: this.password,
          })
            .then((resp) => {
              // if (resp.data.status != undefined && resp.data.status) {
              //   this.showToast(
              //     resp.data.msg !== undefined
              //       ? resp.data.msg
              //       : "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่",
              //     "danger"
              //   );
              // } else {
              if (resp.data.data.role === "SADMIN") {
                this.showToast("เข้าสู่ระบบสำเร็จ", "success");
                localStorage.setItem("bb_token", resp.data.token);
                this.$store.dispatch("loginAuth", resp.data.data);
                this.$router.push("/");
              } else {
                this.showToast(
                  "เกิดข้อผิดพลาด คุณไม่มีสิทธ์เข้าถึงข้อมูล",
                  "danger"
                );
              }
              // }
            })
            .catch((err) => {
              if (err.response) {
                this.showToast(
                  err.response.data.msg !== undefined
                    ? err.response.data.msg
                    : "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่",
                  "danger"
                );
              }
            });
        }
      });
    },
    queryParamsLogin() {
      HTTP.post(`api/auth/login`, {
        phone: this.$route.query.phone,
        password: this.$route.query.password,
      })
        .then((resp) => {
          if (resp.data.data.role === "SADMIN") {
            this.showToast("เข้าสู่ระบบสำเร็จ", "success");
            localStorage.setItem("bb_token", resp.data.token);
            this.$store.dispatch("loginAuth", resp.data.data);
            this.$router.push("/");
          } else {
            this.showToast(
              "เกิดข้อผิดพลาด คุณไม่มีสิทธ์เข้าถึงข้อมูล",
              "danger"
            );
          }
          // }
        })
        .catch((err) => {
          if (err.response) {
            this.showToast(
              err.response.data.msg !== undefined
                ? err.response.data.msg
                : "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่",
              "danger"
            );
          }
        });
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
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>

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
          <b-img fluid :src="imgUrl" alt="Register V2" />
          <a
            href="https://www.freepik.com/vectors/brochure"
            style="font-size: 0.5em"
            >Brochure vector created by katemangostar - www.freepik.com</a
          >
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Register-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            สมัครสมาชิก 🚀
          </b-card-title>
          <b-card-text class="mb-2">
            สมัครสมาชิกเพื่อเลือกซื้อสินค้าภายในหมู่บ้าน
          </b-card-text>

          <!-- form -->
          <validation-observer ref="registerForm">
            <b-form class="auth-register-form mt-2">
              <!-- username -->
              <b-form-group label="เบอร์โทรศัพท์" label-for="register-phone">
                <validation-provider
                  #default="{ errors }"
                  name="phone"
                  rules="required|integer|min:10|max:10"
                >
                  <b-form-input
                    id="register-phone"
                    v-model="phone"
                    name="register-phone"
                    :state="errors.length > 0 ? false : null"
                    placeholder="080XXXXXXX"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group label-for="register-password" label="รหัสผ่าน">
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
                      id="register-password"
                      v-model="password"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false : null"
                      name="register-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- con-password -->
              <b-form-group label-for="confirm-password" label="ยืนยันรหัสผ่าน">
                <validation-provider
                  #default="{ errors }"
                  name="confirm-password"
                  rules="required|confirmed:password"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="confirm-password"
                      v-model="conpassword"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false : null"
                      name="confirm-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group>
                <b-form-checkbox
                  id="register-privacy-policy"
                  v-model="status"
                  name="checkbox-1"
                >
                  ฉันยอมรับ
                  <b-link>นโยบายความเป็นส่วนตัวและเงื่อนไข</b-link>
                </b-form-checkbox>
              </b-form-group>

              <b-button
                variant="primary"
                block
                type="submit"
                @click.prevent="validationForm"
              >
                สมัครสมาชิก
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>มีบัญชีผู้ใช้อยู่แล้ว ?</span>
            <b-link :to="{ path: '/login' }">
              <span>&nbsp;เข้าสู่ระบบ</span>
            </b-link>
          </p>
        </b-col>
      </b-col>
      <!-- /Register-->
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
  BButton,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BImg,
  BCardTitle,
  BCardText,
} from "bootstrap-vue";
import { required, integer } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { HTTP } from "./../services/http-common";

export default {
  components: {
    VuexyLogo,
    BRow,
    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: false,
      phone: "",
      password: "",
      conpassword: "",
      sideImg: require("@/assets/images/logo/lotto.png"),
      // validation
      required,
      integer,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    validationForm() {
      this.$refs.registerForm.validate().then((success) => {
        if (success) {
          if (this.status) {
            HTTP.post(`api/auth/register`, {
              phone: this.phone,
              password: this.password,
            })
              .then((resp) => {
                if (
                  resp.data.status != undefined &&
                  resp.data.status === "error"
                ) {
                  this.showToast(
                    "ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่",
                    "danger"
                  );
                } else {
                  this.showToast(
                    resp.data.message != undefined
                      ? resp.data.message
                      : "สมัครสมาชิกสำเร็จ",
                    "success"
                  );
                  this.$router.push("/login");
                }
              })
              .catch((err) => {
                if (err.response) {
                  this.showToast(
                    err.response.data.message != undefined
                      ? err.response.data.message
                      : "ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่",
                    "danger"
                  );
                }
              });
          } else {
            this.showToast(
              "กรุณายอมรับนโยบายความเป็นส่วนตัวและเงื่อนไข",
              "danger"
            );
          }
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
/* eslint-disable global-require */
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>

<template>
  <div class="list-view product-checkout mt-0">
    <!-- Products List -->
    <!-- <e-commerce-checkout-step-cart-products :products="products" /> -->
    <b-overlay
      :show="busy"
      rounded="lg"
      opacity="0.6"
      spinner-variant="primary"
      spinner-type="grow"
    >
      <div class="checkout-items">
        <b-card
          v-for="product in products"
          :key="product.id"
          class="ecommerce-card"
          no-body
        >
          <!-- Product Image -->
          <div class="item-img text-center">
            <b-link>
              <b-img
                :src="product.menu_img"
                :alt="`${product.menu_name}-${product.menu_id}`"
                height="140px"
                width="200px"
              />
            </b-link>
          </div>

          <!-- Product Details: Card Body -->
          <b-card-body>
            <div class="item-name text-center">
              <h6 class="mb-0">
                <b-link class="text-body">
                  {{ product.menu_name }}
                </b-link>
              </h6>
            </div>
            <!-- <span class="text-success mb-1 text-center d-flex justify-content-center">In Stock</span> -->
            <div class="item-quantity text-center mt-2">
              <span class="quantity-title">จำนวน:</span>

              <b-form-spinbutton
                v-model="product.qty"
                size="sm"
                class="ml-75"
                inline
                min="1"
                max="100"
                :disabled="busy"
                @change="
                  updateQty(product.order_id, product.qty, product.bill_code)
                "
              />
            </div>
          </b-card-body>

          <!-- Product Options/Actions -->
          <div class="item-options text-center">
            <div class="item-wrapper">
              <div class="item-cost">
                <h4 class="item-price">
                  ราคา {{ product.menu_price * product.qty }} บาท
                </h4>
                <p v-if="product.hasFreeShipping" class="card-text shipping">
                  <b-badge pill variant="light-success">
                    Free Shipping
                  </b-badge>
                </p>
              </div>
            </div>
            <b-button
              variant="light"
              class="mt-1 mb-1 remove-wishlist"
              @click="deleteOrder(product)"
            >
              <feather-icon icon="XIcon" class="mr-50" />
              <span>นำออกจากตะกร้า</span>
            </b-button>
          </div>
        </b-card>
      </div>

      <!-- Checkout Options -->
      <div class="checkout-options">
        <b-card>
          <label class="section-label mb-1">รายการสินค้า</label>
          <!-- <b-input-group class="input-group-merge coupons">
          <b-form-input placeholder="Coupons" />
          <b-input-group-append is-text>
            <span
              id="input-coupons"
              class="input-group-text text-primary cursor-pointer"
              >Apply</span
            >
          </b-input-group-append>
        </b-input-group> -->
          <hr />
          <div class="price-details">
            <!-- <h6 class="price-title">Price Details</h6> -->
            <ul class="list-unstyled">
              <li
                class="price-detail"
                v-for="(product, index) in products"
                :key="index"
              >
                <div class="row justify-content-around">
                  <div class="detail-title">
                    {{ "-" + product.menu_name }} &nbsp;&nbsp;&nbsp;
                    {{ "x" + product.qty }}
                  </div>
                  <div class="detail-amt discount-amt text-success">
                    {{ product.menu_price * product.qty }} บาท
                  </div>
                </div>
              </li>
              <li class="price-detail text-center mt-2">
                <div class="detail-title">
                  รายการทั้งหมด
                  {{ products && products.length ? products.length : 0 }}
                  รายการ
                </div>
              </li>
            </ul>
            <hr />
            <ul class="list-unstyled">
              <li class="price-detail">
                <!-- <div class="detail-title detail-total">รวม</div> -->
                <div class="detail-amt font-weight-bolder text-right">
                  รวม {{ totalPrice }} บาท
                </div>
              </li>
            </ul>
            <div class="mb-2 text-center">
              สถานะ:
              <span class="badge badge-warning" v-if="statusBill == 'WAIT'"
                >รอชำระเงิน</span
              >
              <span class="badge badge-success" v-if="statusBill == 'SUC'"
                >จ่ายเงินแล้ว</span
              >
            </div>
            <b-form-checkbox
              :checked="checkStatus(statusBill)"
              class="custom-control-success text-center mb-2"
              name="check-button"
              switch
              v-model="statusBill"
              value="SUC"
              unchecked-value="WAIT"
              @change="updatePayment()"
            >
              <span class="switch-icon-left">
                <feather-icon icon="CheckIcon" />
              </span>
              <span class="switch-icon-right">
                <feather-icon icon="XIcon" />
              </span>
            </b-form-checkbox>
            <b-button
              variant="primary"
              block
              @click="$emit('next-step')"
              :disabled="products == ''"
            >
              สั่งสินค้า
            </b-button>
          </div>
        </b-card>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import {
  BButton,
  BCardBody,
  BLink,
  BCard,
  BImg,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BFormSpinbutton,
  BOverlay,
  BFormCheckbox,
} from "bootstrap-vue";
import ECommerceCheckoutStepCartProducts from "./ECommerceCheckoutStepCartProducts.vue";
import { HTTP } from "@/services/http-common";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    // BSV
    BLink,
    BCardBody,
    BButton,
    BCard,
    BImg,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BFormSpinbutton,
    BOverlay,
    BFormCheckbox,
    // SFC
    ECommerceCheckoutStepCartProducts,
  },
  data() {
    return {
      products: [],
      totalPrice: 0,
      busy: false,
      statusBill: "",
      status: false,
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.infiniteHandler();
      },
      { immediate: true }
    );
    // this.$watch(
    //   () => this.User.cart,
    //   () => {
    //     this.infiniteHandler();
    //   },
    //   { immediate: true }
    // );
    // console.log(this.User.cart);
  },
  mounted() {
    console.log(this.$route.params);
  },
  computed: {
    ...mapGetters(["User"]),
    ...mapGetters(["Auth"]),
  },
  methods: {
    checkStatus(statusBill) {
      if (statusBill == "SUC") {
        return true;
      } else {
        return false;
      }
    },
    updateQty(id, qty, bill_code) {
      this.busy = true;
      HTTP.put(`api/store/menu/cart-update`, {
        menuId: id,
        qty: qty,
        billCode: bill_code,
      })
        .then((response) => {
          // this.showToast(response.data.message, "success");
          this.infiniteHandler();
          this.fetchProfile();
        })
        .catch((err) => {
          this.showToast(
            err.response.data.message !== undefined
              ? err.response.data.message
              : "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่",
            "danger"
          );
          this.busy = false;
        })
        .then(() => {
          // setTimeout(() => {
          this.busy = false;
          // }, 1000);
        });
    },
    updatePayment() {
      this.busy = true;
      HTTP.put(`api/store/menu/update-status-payment`, {
        status: this.statusBill,
        billCode: this.$route.params.billCode,
      })
        .then((response) => {
          // this.showToast(response.data.message, "success");
          // this.infiniteHandler();
          this.fetchProfile();
          this.showToast(
            response.data.message !== undefined
              ? response.data.message
              : "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่",
            "success"
          );
        })
        .catch((err) => {
          this.showToast(
            err.response.data.message !== undefined
              ? err.response.data.message
              : "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่",
            "danger"
          );
          this.busy = false;
        })
        .then(() => {
          // setTimeout(() => {
          this.busy = false;
          // }, 1000);
        });
    },
    deleteOrder(product) {
      this.busy = true;
      HTTP.delete(`api/store/menu/cart-delete`, {
        data: { menuId: product.order_id },
      })
        .then((response) => {
          this.showToast(response.data.message, "success");
          this.infiniteHandler();
        })
        .catch((err) => {
          this.showToast(
            err.response.data.message !== undefined
              ? err.response.data.message
              : "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่",
            "danger"
          );
          this.busy = false;
        })
        .then(() => {
          // setTimeout(() => {
          this.busy = false;
          // }, 1000);
        });
    },
    infiniteHandler() {
      this.busy = true;
      HTTP.get(`api/store/menu/cart`, {
        params: {
          codeStore: this.$route.params.codeStore,
          billCode: this.$route.params.billCode,
        },
      })
        .then((response) => {
          this.products = response.data.data;
          this.statusBill = response.data.bill.status;
          let sum = 0;
          this.products.forEach((item) => {
            sum += item.menu_price * item.qty;
          });
          this.totalPrice = sum;
          if (this.products == "") {
            this.fetchProfile();
          }
        })
        .catch((err) => {
          // this.showToast(
          //   err.response.data.message,
          //   "danger"
          // );
          this.busy = false;
        })
        .then(() => {
          this.busy = false;
        });
    },
    fetchProfile() {
      HTTP.get(`api/auth/profile`)
        .then((resp) => {
          this.$store.dispatch("loginAuth", resp.data.data.user);
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 403) {
              this.$store.dispatch("logoutAuth");
            } else {
              this.$toast.error(
                err.response.data.msg != undefined
                  ? err.response.data.msg
                  : "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้ กรุณาลองใหม่"
              );
            }
          }
          this.showToast(err.response.data.message, "danger");
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

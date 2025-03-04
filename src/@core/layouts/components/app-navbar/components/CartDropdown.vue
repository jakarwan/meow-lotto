<template>
  <b-nav-item-dropdown
    class="dropdown-cart mr-25"
    menu-class="dropdown-menu-media"
    right
  >
    <template #button-content>
      <feather-icon
        :badge="User.cart"
        class="text-body"
        icon="ShoppingCartIcon"
        size="21"
      />
    </template>

    <!-- Header -->
    <li class="dropdown-menu-header">
      <div class="dropdown-header d-flex">
        <h4 class="notification-title mb-0 mr-auto">ตะกร้าสินค้า</h4>
        <b-badge pill variant="light-primary"> {{ User.cart }} รายการ </b-badge>
      </div>
    </li>

    <!-- Cart Items -->
    <vue-perfect-scrollbar
      v-if="items.length"
      :settings="perfectScrollbarSettings"
      class="scrollable-container media-list scroll-area"
      tagname="li"
    >
      <b-media
        v-for="item in User.order"
        :key="item.name"
        @click="redirectStore(item)"
      >
        <template #aside>
          <b-img
            :src="item.store_profile"
            :alt="item.store_name"
            rounded
            width="62px"
          />
        </template>
        <feather-icon
          icon="XIcon"
          class="cart-item-remove cursor-pointer"
          @click.stop="deleteBill(item.bill_code)"
        />
        <div class="media-heading">
          <h6 class="cart-item-title">
            <b-link class="text-body">
              {{ item.store_name }}
            </b-link>
          </h6>
          <small class="cart-item-by">ราคา {{ item.total_price }}</small>
        </div>
        <div class="cart-item-qty mr-3">
          <b-badge variant="light-warning" v-if="item.status == 'WAIT'">
            รอชำระเงิน
          </b-badge>
          <b-badge variant="light-success" v-if="item.status == 'SUC'">
            สำเร็จ
          </b-badge>
        </div>
        <!-- <div class="cart-item-qty mr-3">
          <b-form-spinbutton v-model="item.qty" min="1" size="sm" />
        </div> -->
      </b-media>
    </vue-perfect-scrollbar>

    <!-- Cart Footer -->
    <li v-if="items.length" class="dropdown-menu-footer">
      <div class="d-flex justify-content-between mb-1">
        <h6 class="font-weight-bolder mb-0">ทั้งหมด:</h6>
        <h6 class="text-primary font-weight-bolder mb-0">
          {{ totalAmount }} บาท
        </h6>
      </div>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        block
        :to="{ name: 'home' }"
      >
        ชำระเงิน
      </b-button>
    </li>

    <p v-if="!items.length" class="m-0 p-1 text-center">ไม่มีสินค้าในตะกร้า</p>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown,
  BBadge,
  BMedia,
  BLink,
  BImg,
  BFormSpinbutton,
  BButton,
} from "bootstrap-vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Ripple from "vue-ripple-directive";
import { HTTP } from "@/services/http-common";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    BNavItemDropdown,
    BBadge,
    BMedia,
    BLink,
    BImg,
    BFormSpinbutton,
    VuePerfectScrollbar,
    BButton,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      items: [
        {
          name: "123456",
          image: "https://i.imgur.com/RFM5GS1.jpeg",
          price: 100,
          qty: 1,
        },
        {
          name: "643643",
          image: "https://i.imgur.com/RFM5GS1.jpeg",
          price: 100,
          qty: 1,
        },
        {
          name: "845666",
          image: "https://i.imgur.com/RFM5GS1.jpeg",
          price: 100,
          qty: 1,
        },
      ],
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
        wheelPropagation: false,
      },
      data: [],
    };
  },
  computed: {
    ...mapGetters(["User"]),
    ...mapGetters(["Auth"]),
    totalAmount() {
      if (this.User.order) {
        let total = 0;
        this.User.order.forEach((i) => {
          total += i.total_price;
        });
        return total;
      }
    },
    amountCart() {
      return this.data && this.data.length ? this.data.length : 0;
    },
  },
  mounted() {
    // this.fetchCart();
  },
  methods: {
    // fetchItems() {
    //   this.$store
    //     .dispatch("app-ecommerce/fetchCartProducts")
    //     .then((response) => {
    //       this.items = response.data.products;
    //     });
    // },
    redirectStore(store) {
      // window.location.href = `checkout/${store.code_store}`;
      this.$router
        .push({
          name: "checkout",
          params: { codeStore: store.code_store, billCode: store.bill_code },
        })
        .catch(() => {});
    },
    // fetchCart() {
    //   HTTP.get(`api/store/menu/cart-store`)
    //     .then((response) => {
    //       this.data = response.data.data;
    //     })
    //     .catch((err) => {
    //       // console.log(err.response.data.message);
    //       // this.showToast(
    //       //   err.response.data.message !== undefined
    //       //     ? err.response.data.message
    //       //     : "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่",
    //       //   "danger"
    //       // );
    //     });
    // },
    deleteBill(id) {
      this.busy = true;
      HTTP.delete(`api/store/menu/bill-delete`, {
        data: { billCode: id },
      })
        .then((response) => {
          this.showToast(response.data.message, "success");
          this.fetchProfile();
        })
        .catch((err) => {
          console.log(err.response.data.message);
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
    fetchProfile() {
      HTTP.get(`api/auth/profile`)
        .then((resp) => {
          if (resp.data.status != undefined && resp.data.status === "error") {
            console.log("error");
          } else {
            console.log(resp.data.data);
            this.$store.dispatch("loginAuth", resp.data.data.user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeItemFromCart(productId) {
      this.$store
        .dispatch("app-ecommerce/removeProductFromCart", { productId })
        .then(() => {
          const itemIndex = this.items.findIndex((p) => p.id === productId);
          this.items.splice(itemIndex, 1);

          // Update count in cart items state
          this.$store.commit(
            "app-ecommerce/UPDATE_CART_ITEMS_COUNT",
            this.items.length
          );
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

<style lang="scss" scoped>
.dropdown-cart {
  font-family: "Mitr", sans-serif;
}

.dropdown-cart {
  .media {
    .media-aside {
      align-items: center;
    }
  }
}
</style>

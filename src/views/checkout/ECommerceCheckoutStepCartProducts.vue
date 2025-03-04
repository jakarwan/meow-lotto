<template>
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
            @input="updateQty(product.menu_id, product.qty, product.bill_code)"
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
              <b-badge pill variant="light-success"> Free Shipping </b-badge>
            </p>
          </div>
        </div>
        <b-button
          variant="light"
          class="mt-1 mb-1 remove-wishlist"
          @click="removeProductFromCartClick(product)"
        >
          <feather-icon icon="XIcon" class="mr-50" />
          <span>นำออกจากตะกร้า</span>
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BCardBody,
  BLink,
  BImg,
  BButton,
  BBadge,
  BFormSpinbutton,
} from "bootstrap-vue";
import store from "@/store";
import { ref } from "@vue/composition-api";
import { formatDate } from "@core/utils/filter";
import { useEcommerce, useEcommerceUi } from "@/components/shop/useEcommerce";
import { HTTP } from "@/services/http-common";

export default {
  components: {
    BCard,
    BCardBody,
    BLink,
    BImg,
    BButton,
    BBadge,
    BFormSpinbutton,
  },
  props: ["products"],
  data() {
    return {
      // products: [],
    };
  },
  mounted() {
    // this.infiniteHandler();
  },
  methods: {
    // calculateOrder(price, qty) {
    //   console.log(price * qty);
    // },
    updateQty(id, qty, bill_code) {
      console.log(product);
      HTTP.put(`api/store/menu/cart-update`, {
        menuId: id,
        qty: qty,
        billCode: bill_code,
      })
        .then((response) => {
          console.log(response.data.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          this.showToast(
            err.response.data.message !== undefined
              ? err.response.data.message
              : "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่",
            "danger"
          );
        });
    },
    // infiniteHandler() {
    //   HTTP.get(`api/store/menu/cart`)
    //     .then((response) => {
    //       this.products = response.data.data;
    //     })
    //     .catch((err) => {
    //       this.showToast(
    //         err.response.data.message !== undefined
    //           ? err.response.data.message
    //           : "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่",
    //         "danger"
    //       );
    //     });
    // },
  },
  setup() {
    // const products = ref([])

    const { toggleProductInWishlist } = useEcommerceUi();
    const { removeProductFromCart } = useEcommerce();
    const removeProductFromCartClick = (product) => {
      removeProductFromCart(product.id).then(() => {
        const productIndex = products.value.findIndex(
          (p) => p.id === product.id
        );
        products.value.splice(productIndex, 1);

        store.commit(
          "app-ecommerce/UPDATE_CART_ITEMS_COUNT",
          products.value.length
        );
      });
    };

    // const fetchCartProducts = () => {
    //   store.dispatch('app-ecommerce/fetchCartProducts')
    //     .then(response => {
    //       products.value = response.data.products
    //     })
    // }
    // fetchCartProducts()

    return {
      // products,

      // UI
      toggleProductInWishlist,
      removeProductFromCartClick,

      // Filter
      formatDate,
    };
  },
};
</script>

<style></style>

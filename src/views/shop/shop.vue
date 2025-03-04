<template>
  <div style="height: inherit">
    <!-- ECommerce Header -->
    <section id="ecommerce-header">
      <div class="row">
        <div class="col-sm-12">
          <div class="ecommerce-header-items justify-content-end">
            <div class="view-options d-flex">
              <!-- Sort Button -->
              <!-- Item View Radio Button Group  -->
              <b-form-radio-group
                v-model="itemView"
                class="ml-1 list item-view-radio-group"
                buttons
                size="sm"
                button-variant="outline-primary"
              >
                <b-form-radio
                  v-for="option in itemViewOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  <feather-icon :icon="option.icon" size="18" />
                </b-form-radio>
              </b-form-radio-group>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Overlay -->
    <div class="body-content-overlay" />

    <!-- Searchbar -->
    <div class="ecommerce-searchbar mt-1">
      <b-row>
        <b-col cols="12">
          <b-input-group class="input-group-merge">
            <b-form-input
              v-model="filters.q"
              placeholder="Search Product"
              class="search-product"
            />
            <b-input-group-append is-text>
              <feather-icon icon="SearchIcon" class="text-muted" />
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </div>

    <!-- Prodcuts -->
    <section :class="itemView">
      <b-card
        v-for="product in products"
        :key="product.id"
        class="ecommerce-card"
        no-body
      >
        <div class="item-img text-center">
          <b-link :to="{ name: 'menu', params: { code: product.code_store } }">
            <b-img
              :alt="`${product.store_name}-${product.store_id}`"
              fluid
              class="card-img-top"
              :src="product.store_profile"
            />
          </b-link>
        </div>

        <!-- Product Details -->
        <b-card-body>
          <div class="item-wrapper">
            <h6 class="item-name">
              <b-link
                class="text-body"
                :to="{ name: 'menu', params: { code: product.code_store } }"
              >
                {{ product.store_name }}
              </b-link>
            </h6>
            <!-- <div>
              <h6 class="item-price">{{ product.menu_price }}฿</h6>
            </div> -->
          </div>
        </b-card-body>

        <!-- Product Actions -->
        <div class="item-options text-center">
          <!-- <div class="item-wrapper">
            <div class="item-cost">
              <h4 class="item-price">${{ product.menu_price }}</h4>
            </div>
          </div> -->
          <b-button
            variant="primary"
            tag="a"
            class="btn-cart"
            :to="{ name: 'menu', params: { code: product.code_store } }"
          >
            <feather-icon icon="ShoppingCartIcon" class="mr-50" />
            <span>เลือกร้าน</span>
          </b-button>
        </div>
      </b-card>
    </section>

    <infinite-loading @infinite="infiniteHandler">
      <template slot="no-more">ไม่มีสินค้าเพิ่มเติม</template>
    </infinite-loading>
  </div>
</template>

<script>
import {
  BDropdown,
  BDropdownItem,
  BFormRadioGroup,
  BFormRadio,
  BRow,
  BCol,
  BInputGroup,
  BInputGroupAppend,
  BFormInput,
  BCard,
  BCardBody,
  BLink,
  BImg,
  BCardText,
  BButton,
  BPagination,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { watch } from "@vue/composition-api";
import {
  useShopFiltersSortingAndPagination,
  useShopUi,
} from "@/components/shop/useECommerceShop";
import { useEcommerceUi } from "@/components/shop/useEcommerce";
import { HTTP } from "@/services/http-common";

export default {
  directives: {
    Ripple,
  },
  components: {
    // BSV
    BDropdown,
    BDropdownItem,
    BFormRadioGroup,
    BFormRadio,
    BRow,
    BCol,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BCard,
    BCardBody,
    BLink,
    BImg,
    BCardText,
    BButton,
    BPagination,
  },
  setup() {
    const { filters } = useShopFiltersSortingAndPagination();

    const { handleCartActionClick, toggleProductInWishlist } = useEcommerceUi();

    const { itemView, itemViewOptions, totalProducts } = useShopUi();

    watch(
      [filters],
      () => {
        fetchShopProducts();
      },
      {
        deep: true,
      }
    );

    return {
      // useShopFiltersSortingAndPagination
      filters,

      // useShopUi
      itemView,
      itemViewOptions,
      totalProducts,
      toggleProductInWishlist,
      handleCartActionClick,
    };
  },
  data() {
    return {
      products: [],
      page: 1,
      perPage: 6,
    };
  },
  methods: {
    infiniteHandler($state) {
      HTTP.get(`api/store`, {
        params: {
          page: this.page,
          perPage: this.perPage,
        },
      }).then(({ data }) => {
        if (data.data.length) {
          this.page += 1;
          this.products.push(...data.data);
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-ecommerce.scss";
</style>

<style lang="scss" scoped>
.item-view-radio-group ::v-deep {
  .btn {
    display: flex;
    align-items: center;
  }
}
</style>

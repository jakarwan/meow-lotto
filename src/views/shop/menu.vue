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

    <div class="text-center m-2">
      <span
        class="badge bg-primary"
        style="font-size: 24px; padding: 10px; width: 100%"
      >
        {{ storeName }}</span
      >
    </div>

    <!-- Searchbar -->
    <div class="ecommerce-searchbar mt-1">
      <b-row>
        <b-col cols="12">
          <b-input-group class="input-group-merge">
            <b-form-input
              v-model="filters.q"
              placeholder="Search Product"
              class="search-product"
              @input="fetchMenuSearch()"
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
          <b-link>
            <b-img
              :alt="`${product.menu_name}-${product.menu_id}`"
              fluid
              class="card-img-top"
              :src="product.menu_img"
            />
          </b-link>
        </div>

        <!-- Product Details -->
        <b-card-body>
          <div class="item-wrapper">
            <h6 class="item-name">
              <b-link class="text-body">
                {{ product.menu_name }}
              </b-link>
            </h6>
            <div>
              <h6 class="item-price">{{ product.menu_price }} บาท</h6>
            </div>
          </div>
        </b-card-body>

        <!-- Product Actions -->
        <div class="item-options text-center">
          <div class="item-wrapper">
            <div class="item-cost">
              <h4 class="item-price">{{ product.menu_price }} บาท</h4>
            </div>
          </div>
          <b-button
            variant="primary"
            tag="a"
            class="btn-cart"
            @click="addMenu(product)"
          >
            <feather-icon icon="ShoppingCartIcon" class="mr-50" />
            <span>{{ product.isInCart ? "ดูในตะกร้า" : "เพิ่มลงตะกร้า" }}</span>
          </b-button>
        </div>
      </b-card>
    </section>

    <infinite-loading @infinite="infiniteHandler">
      <template slot="no-more">ไม่มีสินค้าเพิ่มเติม</template>
      <div slot="no-results">ไม่มีรายการอาหาร</div>
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
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

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
    // const { filters } = useShopFiltersSortingAndPagination();

    const { handleCartActionClick, toggleProductInWishlist } = useEcommerceUi();

    const { itemView, itemViewOptions, totalProducts } = useShopUi();

    // watch(
    //   [filters],
    //   () => {
    //     this.infiniteHandler();
    //   },
    //   {
    //     deep: true,
    //   }
    // );

    return {
      // useShopFiltersSortingAndPagination
      // filters,

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
      storeName: "",
      storeProfile: "",
      filters: {
        q: null,
      },
    };
  },
  methods: {
    infiniteHandler($state) {
      HTTP.get(`api/store/menu`, {
        params: {
          page: this.page,
          perPage: this.perPage,
          codeStore: this.$route.params.code,
        },
      })
        .then(({ data }) => {
          this.storeName = data.store.store_name;
          this.storeProfile = data.store.store_profile;
          if (data.data.data.length) {
            this.page += 1;
            this.products.push(...data.data.data);
            $state.loaded();
          } else {
            $state.complete();
          }
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
    fetchMenuSearch() {
      HTTP.get(`api/store/menu`, {
        params: {
          page: 1,
          perPage: this.perPage,
          codeStore: this.$route.params.code,
          name: this.filters.q != null ? this.filters.q : undefined,
        },
      })
        .then((resp) => {
          // this.storeName = resp.data.data.data.store.store_name;
          // this.storeProfile = resp.data.data.data.store.store_profile;
          this.products = resp.data.data.data;
          console.log(resp.data.data.data);
        })
        .catch((err) => {
          console.log(err);
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
          console.log(err);
        });
    },
    addMenu(product) {
      HTTP.post(`api/store/menu/add-order`, {
        codeStore: product.code_store,
        menuId: product.menu_id,
      })
        .then((resp) => {
          this.showToast(
            resp.data.message != undefined
              ? resp.data.message
              : "เพิ่มรายการลงตะกร้าสำเร็จ",
            "success"
          );
          this.fetchProfile();
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

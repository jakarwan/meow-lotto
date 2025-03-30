<template>
  <div
    class="navbar-container d-flex content align-items-center"
    :style="{
      backgroundColor: skin === 'dark' ? '#283046' : '#fff',
      borderRadius: '5px',
    }"
  >
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" style="color: #6e6b7b !important;" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div
      class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex"
    >
      <dark-Toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <!-- <cart-dropdown /> -->

      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
          เครดิต:
          <span class="badge bg-info">
            {{ numberWithCommas(User.balance) }}</span
          >
        </p>
      </div>
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p
              class="user-name font-weight-bolder mb-0"
              :style="{ color: skin === 'dark' ? '#d0d2d6' : '#6e6b7b' }"
            >
              {{ User.name }} {{ User.familyName }}
            </p>
            <!-- <span class="user-status">Admin</span> -->
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            :src="require('@/assets/images/avatars/13-small.png')"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="UserIcon" class="mr-50" />
          <span>Profile</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="MailIcon" class="mr-50" />
          <span>Inbox</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="CheckSquareIcon" class="mr-50" />
          <span>Task</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="MessageSquareIcon" class="mr-50" />
          <span>Chat</span>
        </b-dropdown-item>

        <b-dropdown-divider />

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="onLogout()"
        >
          <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem,
  BDropdownDivider,
  BAvatar,
} from "bootstrap-vue";
import DarkToggler from "@core/layouts/components/app-navbar/components/DarkToggler.vue";
// import CartDropdown from "@core/layouts/components/app-navbar/components/CartDropdown.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { HttpAuth } from "@/services/http-common";
import { HTTP } from "@/services/http-common";
import { mapGetters } from "vuex";
import useAppConfig from "@core/app-config/useAppConfig";

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,

    // Navbar Components
    DarkToggler,
    // CartDropdown,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  mounted() {
    this.fetchUserProfile();
  },
  setup() {
    const { skin } = useAppConfig();
    // if (skin.value === "dark") document.body.classList.add("dark-layout");
    return { skin };
  },
  methods: {
    numberWithCommas(x) {
      return parseFloat(x)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    fetchUserProfile() {
      HTTP.get(`/api/auth/profile`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("bb_token"),
        },
      })
        .then((resp) => {
          if (resp.data.status != undefined && !resp.data.status) {
            this.$toast.error(
              resp.data.msg != undefined
                ? resp.data.msg
                : "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้ กรุณาลองใหม่"
            );
          } else {
            this.$store.dispatch("setUser", resp.data.data);
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
        });
    },
    // fetchProfile() {
    //   HTTP.get(`api/auth/profile`)
    //     .then((resp) => {
    //       if (resp.data.status != undefined && resp.data.status === "error") {
    //         console.log("error");
    //       } else {
    //         console.log(resp.data.data);
    //         this.$store.dispatch("loginAuth", resp.data.data.user);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    onLogout() {
      this.$store.dispatch("logoutAuth");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters(["User"]),
    ...mapGetters(["Auth"]),
  },
};
</script>

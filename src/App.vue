<template>
  <div id="app" class="h-100" :class="[skinClasses]">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { $themeColors, $themeBreakpoints, $themeConfig } from "@themeConfig";
import { provideToast } from "vue-toastification/composition";
import { watch } from "@vue/composition-api";
import useAppConfig from "@core/app-config/useAppConfig";
import { mapGetters } from "vuex";
import { useWindowSize, useCssVar } from "@vueuse/core";
import store from "@/store";

const LayoutVertical = () => import("@/layouts/vertical/LayoutVertical.vue");
const LayoutHorizontal = () =>
  import("@/layouts/horizontal/LayoutHorizontal.vue");
const LayoutFull = () => import("@/layouts/full/LayoutFull.vue");

export default {
  components: {
    LayoutHorizontal,
    LayoutVertical,
    LayoutFull,
  },
  computed: {
    layout() {
      if (this.$route.meta.layout === "full") return "layout-full";
      return `layout-${this.contentLayoutType}`;
    },
    contentLayoutType() {
      return this.$store.state.appConfig?.layout?.type || "vertical";
    },
    ...mapGetters(["User"]),
    ...mapGetters(["Auth"]),
  },
  beforeCreate() {
    // Set colors in theme
    const colors = [
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "danger",
      "light",
      "dark",
    ];

    for (let i = 0, len = colors.length; i < len; i++) {
      const colorVar = useCssVar(`--${colors[i]}`, document.documentElement);
      if (!colorVar.value) {
        console.warn(`CSS variable --${colors[i]} is not defined`);
      } else {
        $themeColors[colors[i]] = colorVar.value.trim();
      }
    }

    // Set Theme Breakpoints
    const breakpoints = ["xs", "sm", "md", "lg", "xl"];

    for (let i = 0, len = breakpoints.length; i < len; i++) {
      const breakpointVar = useCssVar(
        `--breakpoint-${breakpoints[i]}`,
        document.documentElement
      );
      if (!breakpointVar.value) {
        console.warn(`CSS variable --breakpoint-${breakpoints[i]} is not defined`);
      } else {
        $themeBreakpoints[breakpoints[i]] = Number(
          breakpointVar.value.slice(0, -2)
        );
      }
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout || { isRTL: false };
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  },
  setup() {
    const { skin, skinClasses } = useAppConfig();

    if (skin.value === "dark") document.body.classList.add("dark-layout");

    provideToast({
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      icon: false,
      timeout: 3000,
      transition: "Vue-Toastification__fade",
    });

    store.commit("app/UPDATE_WINDOW_WIDTH", window.innerWidth);
    const { width: windowWidth } = useWindowSize();
    watch(windowWidth, (val) => {
      store.commit("app/UPDATE_WINDOW_WIDTH", val);
    });

    return {
      skinClasses,
    };
  },
};
</script>

import { computed, watch } from '@vue/composition-api'
import store from '@/store'

export default function usAppConfig() {
  // ------------------------------------------------
  // isVerticalMenuCollapsed
  // ------------------------------------------------
  const isVerticalMenuCollapsed = computed({
    get: () => store.state.verticalMenu?.isVerticalMenuCollapsed || false,
    set: val => {
      store.commit('verticalMenu/UPDATE_VERTICAL_MENU_COLLAPSED', val)
    },
  })

  // ------------------------------------------------
  // RTL
  // ------------------------------------------------
  const isRTL = computed({
    get: () => store.state.appConfig?.layout?.isRTL || false,
    set: val => {
      store.commit('appConfig/TOGGLE_RTL', val)
    },
  })

  // ------------------------------------------------
  // Skin
  // ------------------------------------------------
  const skin = computed({
    get: () => store.state.appConfig?.layout?.skin || 'light',
    set: val => {
      store.commit('appConfig/UPDATE_SKIN', val)
    },
  })

  const skinClasses = computed(() => {
    if (skin.value === 'bordered') return 'bordered-layout'
    if (skin.value === 'semi-dark') return 'semi-dark-layout'

    return null
  })

  // ------------------------------------------------
  // routerTransition
  // ------------------------------------------------
  const routerTransition = computed({
    get: () => store.state.appConfig?.layout?.routerTransition || 'fade',
    set: val => {
      store.commit('appConfig/UPDATE_ROUTER_TRANSITION', val)
    },
  })

  // ------------------------------------------------
  // Layout Type
  // ------------------------------------------------
  const layoutType = computed({
    get: () => store.state.appConfig?.layout?.type || 'vertical',
    set: val => {
      store.commit('appConfig/UPDATE_LAYOUT_TYPE', val)
    },
  })

  watch(layoutType, val => {
    if (val === 'horizontal' && skin.value === 'semi-dark') skin.value = 'light'
  })

  // ------------------------------------------------
  // Content Width
  // ------------------------------------------------
  const contentWidth = computed({
    get: () => store.state.appConfig?.layout?.contentWidth || 'full',
    set: val => {
      store.commit('appConfig/UPDATE_CONTENT_WIDTH', val)
    },
  })

  // ------------------------------------------------
  // isNavMenuHidden
  // ------------------------------------------------
  const isNavMenuHidden = computed({
    get: () => store.state.appConfig?.layout?.menu?.hidden || false,
    set: val => {
      store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', val)
    },
  })

  // ------------------------------------------------
  // Navbar Config
  // ------------------------------------------------
  const navbarBackgroundColor = computed({
    get: () => store.state.appConfig?.layout?.navbar?.backgroundColor || 'white',
    set: val => {
      store.commit('appConfig/UPDATE_NAVBAR_CONFIG', { backgroundColor: val })
    },
  })

  const navbarType = computed({
    get: () => store.state.appConfig?.layout?.navbar?.type || 'static',
    set: val => {
      store.commit('appConfig/UPDATE_NAVBAR_CONFIG', { type: val })
    },
  })

  // ------------------------------------------------
  // Footer Config
  // ------------------------------------------------
  const footerType = computed({
    get: () => store.state.appConfig?.layout?.footer?.type || 'static',
    set: val => {
      store.commit('appConfig/UPDATE_FOOTER_CONFIG', { type: val })
    },
  })

  return {
    isVerticalMenuCollapsed,
    isRTL,
    skin,
    skinClasses,
    routerTransition,

    // Navbar
    navbarBackgroundColor,
    navbarType,

    // Footer
    footerType,

    // Layout
    layoutType,
    contentWidth,
    isNavMenuHidden,
  }
}

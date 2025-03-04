import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import ecommerceStoreModule from './shop/eCommerceStoreModule'

// Auth User
import user from "./user"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    user,
    'app-ecommerce': ecommerceStoreModule,
  },
  strict: process.env.DEV,
})

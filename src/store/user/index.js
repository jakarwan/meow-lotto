const token = localStorage.getItem("bb_token");
const initialState = token ? { LoggedIn: true } : { LoggedIn: false };

export default {
  state() {
    return {
      Auth: initialState,
      User: {
        phone: null,
        name: null,
        familyName: null,
        balance: null,
        bank: null,
        bank_number: null,
        role: null,
      },
    };
  },
  getters: {
    Auth: (state) => {
      return state.Auth.LoggedIn;
    },
    User: (state) => {
      return state.User;
    },
  },
  actions: {
    loginAuth(context, token) {
      context.commit("loginAuth", token);
    },
    logoutAuth(context) {
      context.commit("logoutAuth");
    },
    setUser(context, profile) {
      context.commit("setUser", profile);
    },
  },
  mutations: {
    loginAuth(state, profile) {
      state.Auth.LoggedIn = true;
      state.User.phone = profile.phone;
      state.User.name = profile.name;
      state.User.familyName = profile.familyName;
      state.User.bank = profile.bank;
      state.User.bank_number = profile.bank_number;
      state.User.balance = profile.credit_balance.toFixed(2);
    },
    logoutAuth(state) {
      state.Auth.LoggedIn = false;
      state.User.phone = null;
      state.User.name = null;
      state.User.familyName = null;
      state.User.bank = null;
      state.User.banknumber = null;
      state.User.balance = null;
      localStorage.removeItem("bb_token");
      // window.location.replace("../");
    },
    setUser(state, profile) {
      state.User.phone = profile.phone;
      state.User.name = profile.name;
      state.User.familyName = profile.familyName;
      state.User.bank = profile.bank;
      state.User.banknumber = profile.bank_number;
      state.User.balance = profile.credit_balance.toFixed(2);
    },
  },
};

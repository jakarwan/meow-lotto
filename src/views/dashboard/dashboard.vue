<template>
  <section id="dashboard-ecommerce">
    <b-row class="match-height d-flex justify-content-center">
      <b-col xl="12" md="6">
        <ecommerce-statistics :data="dashboard" />
      </b-col>
    </b-row>
    <!-- <b-row class="d-flex justify-content-center">
      <b-col cols="12">
        <AddLottery />
      </b-col>
    </b-row> -->
  </section>
</template>

<script>
import { BRow, BCol } from "bootstrap-vue";
import EcommerceStatistics from "../../components/dashboard/EcommerceStatistics.vue";
import AddLottery from "../../components/dashboard/AddLottery.vue";
import { mapGetters } from "vuex";
import { HTTP } from "@/services/http-common";

export default {
  components: {
    BRow,
    BCol,
    EcommerceStatistics,
    AddLottery,
  },
  data() {
    return {
      data: {},
      dashboard: [],
    };
  },
  created() {},
  mounted() {
    this.fetchDashboard();
  },
  methods: {
    fetchDashboard() {
      HTTP.get(`api/admin/dashboard`)
        .then((response) => {
          this.dashboard = response.data.data;
          console.log(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    ...mapGetters(["User"]),
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/dashboard-ecommerce.scss";
@import "@core/scss/vue/libs/chart-apex.scss";
</style>

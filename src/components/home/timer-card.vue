<template>
  <section class="timer-card">
    <div class="col d-flex justify-content-center">
      <b-card>
        <b-card-text class="header">
          ระบบจะเปิดขายอีกครั้งใน...
        </b-card-text>
        <flip-countdown
          deadline="2022-12-31 00:00:00"
          :labels="TimerLabels"
          countdownSize="2.5em"
        ></flip-countdown>
      </b-card>
    </div>
  </section>
</template>

<script>
import { BCard, BCardText } from "bootstrap-vue";
import FlipCountdown from "vue2-flip-countdown";
// import { mapGetters } from "vuex";

export default {
  components: {
    BCard,
    BCardText,
    FlipCountdown,
  },
  data() {
    return {
      TimerLabels: {
        days: "วัน",
        hours: "ชั่วโมง",
        minutes: "นาที",
        seconds: "วินาที",
      },
    };
  },
  // computed: {
  //   ...mapGetters(["Auth"]),
  // },
};
</script>

<style scoped>
.timer-card {
  font-weight: bold;
  font-size: 1.2em;
  text-align: center;
}
</style>

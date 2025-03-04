<template>
  <Timer />
</template>

<script>
import { mapGetters } from "vuex";
import Timer from "../components/home/timer-card.vue";

export default {
  components: {
    Timer
  },
  created() {
    if (!this.Auth) {
      this.$router.push("/login");
    }
  },
  computed: {
    ...mapGetters(["Auth"])
  }
}
</script>

<style scoped>

</style>

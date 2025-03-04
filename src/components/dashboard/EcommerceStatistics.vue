<template>
  <b-card no-body class="card-statistics">
    <b-card-header>
      <b-card-title>DASHBOARD</b-card-title>
      <b-card-text class="font-small-2 mr-25 mb-0">
        Updated 1 month ago
      </b-card-text>
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row>
        <b-col xl="3" sm="6" class="mb-2 mb-xl-0">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="light-primary">
                <feather-icon size="24" icon="DollarSignIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ commaNumber(data.totalPrice) }} ฿
              </h4>
              <b-card-text class="font-small-3 mb-2">
                ยอดขายทั้งหมด
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col xl="3" sm="6" class="mb-2 mb-xl-0">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="light-primary">
                <feather-icon size="24" icon="DollarSignIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ commaNumber(data.totalToday) }} ฿
              </h4>
              <b-card-text class="font-small-3 mb-2">
                ยอดขายวันนี้
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col xl="3" sm="6" class="mb-2 mb-xl-0">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="light-success">
                <feather-icon size="24" icon="TrendingUpIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ commaNumber(data.depositeTotal) }} ฿
              </h4>
              <b-card-text class="font-small-3 mb-2">
                ยอดฝากทั้งหมด
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col xl="3" sm="6" class="mb-2 mb-xl-0">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="light-success">
                <feather-icon size="24" icon="TrendingUpIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ commaNumber(data.depositeTotalToday) }} ฿
              </h4>
              <b-card-text class="font-small-3 mb-2">
                ยอดฝากวันนี้
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col xl="3" sm="6" class="mb-2 mb-xl-0">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="light-danger">
                <feather-icon size="24" icon="TrendingDownIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ commaNumber(data.withdrawTotal) }} ฿
              </h4>
              <b-card-text class="font-small-3 mb-2">
                ยอดถอนทั้งหมด
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col xl="3" sm="6" class="mb-2 mb-xl-0">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="light-danger">
                <feather-icon size="24" icon="TrendingDownIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ commaNumber(data.withdrawTotalToday) }} ฿
              </h4>
              <b-card-text class="font-small-3 mb-2">
                ยอดถอนวันนี้
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col xl="3" sm="6" class="mb-2 mb-xl-0">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="light-danger">
                <feather-icon size="24" icon="BoxIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ commaNumber(data.count) }}
              </h4>
              <b-card-text class="font-small-3 mb-2"> โพยทั้งหมด </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col xl="3" sm="6" class="mb-2 mb-xl-0">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="light-danger">
                <feather-icon size="24" icon="BoxIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ commaNumber(data.countToday) }}
              </h4>
              <b-card-text class="font-small-3 mb-2"> โพย / วัน </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col xl="3" sm="6" class="mb-2 mb-xl-0">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="light-info">
                <feather-icon size="24" icon="UserIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ commaNumber(data.member) }}
              </h4>
              <b-card-text class="font-small-3 mb-2">
                สมาชิกทั้งหมด
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col xl="3" sm="6" class="mb-2 mb-xl-0">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="light-info">
                <feather-icon size="24" icon="UserIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ commaNumber(data.memberNews) }}
              </h4>
              <b-card-text class="font-small-3 mb-2">
                สมาชิกใหม่วันนี้
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </b-card-body>
    <b-card-header>
      <b-card-title>รายงานยอดเงินในระบบ</b-card-title>
      <!-- <b-card-text class="font-small-2 mr-25 mb-0">
        Updated 1 month ago
      </b-card-text> -->
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row>
        <b-col xl="3" sm="6" class="mb-2 mb-xl-0">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="light-primary">
                <feather-icon size="24" icon="DollarSignIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ commaNumber(data.totalCreditMember) }} ฿
              </h4>
              <b-card-text class="font-small-3 mb-2">
                ยอดเครดิตรวมของผู้ใช้
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <!-- <b-col xl="3" sm="6" class="mb-2 mb-xl-0">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="light-primary">
                <feather-icon size="24" icon="DollarSignIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ commaNumber(data.totalCreditMember) }} ฿
              </h4>
              <b-card-text class="font-small-3 mb-2">
                ยอดเครดิตรวมของผู้ใช้
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col xl="3" sm="6" class="mb-2 mb-xl-0">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" variant="light-primary">
                <feather-icon size="24" icon="DollarSignIcon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ commaNumber(data.totalCreditMember) }} ฿
              </h4>
              <b-card-text class="font-small-3 mb-2">
                ยอดเครดิตรวมของผู้ใช้
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col> -->
      </b-row>
    </b-card-body>
  </b-card>
  
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardText,
  BCardBody,
  BRow,
  BCol,
  BMedia,
  BMediaAside,
  BAvatar,
  BMediaBody,
} from "bootstrap-vue";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
  },
  props: ["data"],
  methods: {
    commaNumber(num) {
      // if (num) {
      //   num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // }
      return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "";
    },
  },
};
</script>

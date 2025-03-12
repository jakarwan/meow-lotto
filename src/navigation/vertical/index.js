const menu = [
  {
    title: "Dashboard",
    route: "dashboard",
    icon: "HomeIcon",
    role: "USER",
  },
  // {
  //   title: "แทงหวย",
  //   route: "lotto",
  //   icon: "UsersIcon",
  //   role: "AGENT",
  // },
  {
    title: "รายการผลรางวัล",
    icon: "AwardIcon",
    role: "USER",
    children: [
      {
        title: "ผลรางวัลทั้งหมด",
        route: "prize",
      },
      {
        title: "รายการแทง",
        route: "prize-result",
      },
      {
        title: "สรุปการเล่น",
        route: "lotto-play",
      },
    ],
  },
  // {
  //   title: "หน้าหลัก",
  //   route: "home",
  //   icon: "HomeIcon",
  //   role: "USER",
  // },
  // {
  //   title: "ร้านอาหาร",
  //   route: "shop",
  //   icon: "ShoppingCartIcon",
  //   role: "USER",
  // },
  {
    title: "รายการสมาชิก",
    // route: "addlottery",
    icon: "UsersIcon",
    role: "USER",
    children: [
      {
        title: "สมาชิกทั้งหมด",
        route: "member",
      },
    ],
  },
  // {
  //   title: "รายการรออนุมัติ",
  //   icon: "AwardIcon",
  //   role: "USER",
  //   children: [
  //     {
  //       title: "รายการรอเติมเงินเข้า",
  //       route: "transaction",
  //     },
  //     {
  //       title: "รายการรอถอนออก",
  //       route: "withdraw",
  //     },
  //   ],
  // },
  {
    title: "รายการเงินเข้า-ออก",
    icon: "TrendingUpIcon",
    role: "USER",
    children: [
      {
        title: "รายการเครดิตเข้า-ออก",
        route: "deposite",
      },
      {
        title: "รายการถอนเครดิต",
        route: "report-withdraw",
      },
    ],
  },
  {
    title: "รายการ Affiliate",
    icon: "AwardIcon",
    role: "USER",
    children: [
      {
        title: "รายการ Affiliate",
        route: "affiliate",
      },
    ],
  },
  // {
  //   title: "รายการโพย",
  //   icon: "AwardIcon",
  //   role: "USER",
  //   children: [
  //     {
  //       title: "รายการโพยทั้งหมด",
  //       route: "poy",
  //     },
  //   ],
  // },
  {
    title: "ตั้งค่าเว็บไซต์",
    icon: "AwardIcon",
    role: "USER",
    children: [
      {
        title: "ประเภทหวย",
        route: "lotto-type",
      },
      {
        title: "เลขปิดรับ",
        route: "close-lotto",
      },
      {
        title: "อัตราจ่าย",
        route: "pay-rate",
      },
    ],
  },
];

export default menu;

import {
  RiSpaceShipLine,
  RiArrowUpCircleLine,
  RiExchangeDollarLine,
  RiArrowDownCircleLine,
  RiPulseLine,
  RiTrophyLine,
  RiServiceLine,
} from "react-icons/ri";

const crmWidgets = [
  {
    id: 1,
    label: "Campaign Sent",
    badge: <RiArrowUpCircleLine color="green" size={16} />,
    icon: <RiSpaceShipLine size={32} color="#878a99" />,
    number: "197",
    decimals: 0,
    suffix: "",
    prefix: "",
  },
  {
    id: 2,
    label: "Annual Profit",
    badge: <RiArrowUpCircleLine color="green" size={16} />,
    icon: <RiExchangeDollarLine size={32} color="#878a99" />,
    number: "489.4",
    decimals: 1,
    suffix: "k",
    prefix: "$",
  },
  {
    id: 3,
    label: "Lead Conversation",
    badge: <RiArrowDownCircleLine color="red" size={16} />,
    icon: <RiPulseLine size={32} color="#878a99" />,
    number: "32.89",
    decimals: 2,
    suffix: "%",
    prefix: "",
  },
  {
    id: 4,
    label: "Daily Average Income",
    badge: <RiArrowUpCircleLine color="green" size={16} />,
    icon: <RiTrophyLine size={32} color="#878a99" />,
    number: "1596.5",
    decimals: 1,
    prefix: "$",
    separator: ",",
    suffix: "",
  },
  {
    id: 5,
    label: "Annual Deals",
    badge: <RiArrowDownCircleLine color="red" size={16} />,
    icon: <RiServiceLine size={32} color="#878a99" />,
    number: "2659",
    decimals: 0,
    separator: ",",
    suffix: "",
    prefix: "",
  },
];

const salesForecastData = [
  {
    id: 1,
    value: "Oct 2021",
    series: [
      {
        name: "Goal",
        value: 17,
      },
      {
        name: "Pending Forecast",
        value: 6,
        fill: "#00bfa5",
      },
      {
        name: "Revenue",
        value: 37,
        fill: "#ffba42",
      },
    ],
  },

  {
    id: 2,
    value: "Nov 2021",
    series: [
      {
        name: "Goal",
        value: 37,
      },
      {
        name: "Pending Forecast",
        value: 12,
        fill: "#00bfa5",
      },
      {
        name: "Revenue",
        value: 18,
        fill: "#ffba42",
      },
    ],
  },

  {
    id: 3,
    value: "Dec 2021",
    series: [
      {
        name: "Goal",
        value: 25,
      },
      {
        name: "Pending Forecast",
        value: 20,
        fill: "#00bfa5",
      },
      {
        name: "Revenue",
        value: 27,
        fill: "#ffba42",
      },
    ],
  },

  {
    id: 4,
    value: "Jan 2022",
    series: [
      {
        name: "Goal",
        value: 7,
      },
      {
        name: "Pending Forecast",
        value: 5,
        fill: "#00bfa5",
      },
      {
        name: "Revenue",
        value: 32,
        fill: "#ffba42",
      },
    ],
  },
];

const dealTypeData = [
  {
    id: "1",
    value: "Today",
    data: [
      {
        year: "2016",
        pending: 40,
        loss: 40,
        won: 22,
        fullMark: 100,
      },
      {
        year: "2017",
        pending: 25,
        loss: 60,
        won: 37,
        fullMark: 100,
      },
      {
        year: "2018",
        pending: 15,
        loss: 80,
        won: 39,
        fullMark: 100,
      },
      {
        year: "2019",
        pending: 20,
        loss: 100,
        won: 3,
        fullMark: 100,
      },
      {
        year: "2020",
        pending: 50,
        loss: 40,
        won: 23,
        fullMark: 100,
      },
      {
        year: "2021",
        pending: 10,
        loss: 100,
        won: 5,
        fullMark: 100,
      },
    ],
  },
  {
    id: "2",
    value: "Weekly",
    data: [
      {
        year: "2016",
        pending: 40,
        loss: 40,
        won: 24,
        fullMark: 100,
      },
      {
        year: "2017",
        pending: 25,
        loss: 60,
        won: 56,
        fullMark: 100,
      },
      {
        year: "2018",
        pending: 30,
        loss: 20,
        won: 58,
        fullMark: 100,
      },
      {
        year: "2019",
        pending: 40,
        loss: 40,
        won: 43,
        fullMark: 100,
      },
      {
        year: "2020",
        pending: 100,
        loss: 10,
        won: 23,
        fullMark: 100,
      },
      {
        year: "2021",
        pending: 20,
        loss: 50,
        won: 30,
        fullMark: 100,
      },
    ],
  },
  {
    id: "3",
    value: "Monthly",
    data: [
      {
        year: "2016",
        pending: 80,
        loss: 20,
        won: 44,
        fullMark: 100,
      },
      {
        year: "2017",
        pending: 50,
        loss: 30,
        won: 76,
        fullMark: 100,
      },
      {
        year: "2018",
        pending: 30,
        loss: 40,
        won: 78,
        fullMark: 100,
      },
      {
        year: "2019",
        pending: 40,
        loss: 80,
        won: 13,
        fullMark: 100,
      },
      {
        year: "2020",
        pending: 100,
        loss: 20,
        won: 43,
        fullMark: 100,
      },
      {
        year: "2021",
        pending: 20,
        loss: 80,
        won: 10,
        fullMark: 100,
      },
    ],
  },
  {
    id: "4",
    value: "Yearly",
    data: [
      {
        year: "2016",
        pending: 140,
        loss: 70,
        won: 50,
        fullMark: 100,
      },
      {
        year: "2017",
        pending: 70,
        loss: 60,
        won: 56,
        fullMark: 100,
      },
      {
        year: "2018",
        pending: 50,
        loss: 50,
        won: 48,
        fullMark: 100,
      },
      {
        year: "2019",
        pending: 120,
        loss: 60,
        won: 63,
        fullMark: 100,
      },
      {
        year: "2020",
        pending: 120,
        loss: 60,
        won: 63,
        fullMark: 100,
      },
      {
        year: "2021",
        pending: 120,
        loss: 40,
        won: 50,
        fullMark: 100,
      },
    ],
  },
];

const balanceOverViewWidgets = [
  {
    id: 1,
    lable: "Revenue",
    number: "584",
    suffix: "k",
    prefix: "$",
    decimals: 0,
  },

  {
    id: 2,
    lable: "Expenses",
    number: "497",
    suffix: "k",
    prefix: "$",
    decimals: 0,
  },

  {
    id: 3,
    lable: "Profit Ratio",
    number: "3.6",
    suffix: "%",
    prefix: "",
    decimals: 1,
  },
];

const balanceOverviewData = [
  {
    id: 1,
    value: "Today",
    data: [
      {
        name: "Jan",
        rv: 10,
        ex: 12,
      },
      {
        name: "Feb",
        rv: 45,
        ex: 17,
      },
      {
        name: "Mar",
        rv: 30,
        ex: 75,
      },
      {
        name: "Apr",
        rv: 35,
        ex: 82,
      },
      {
        name: "May",
        rv: 50,
        ex: 44,
      },
      {
        name: "Jun",
        rv: 55,
        ex: 35,
      },
      {
        name: "Jul",
        rv: 70,
        ex: 52,
      },
      {
        name: "Aug",
        rv: 120,
        ex: 75,
      },
      {
        name: "Sep",
        rv: 150,
        ex: 112,
      },
      {
        name: "Oct",
        rv: 160,
        ex: 108,
      },
      {
        name: "Nov",
        rv: 210,
        ex: 240,
      },
      {
        name: "Dec",
        rv: 240,
        ex: 289,
      },
    ],
  },

  {
    id: 2,
    value: "Last Week",
    data: [
      {
        name: "Jan",
        rv: 40,
        ex: 32,
      },
      {
        name: "Feb",
        rv: 55,
        ex: 37,
      },
      {
        name: "Mar",
        rv: 40,
        ex: 65,
      },
      {
        name: "Apr",
        rv: 35,
        ex: 22,
      },
      {
        name: "May",
        rv: 20,
        ex: 44,
      },
      {
        name: "Jun",
        rv: 35,
        ex: 85,
      },
      {
        name: "Jul",
        rv: 40,
        ex: 42,
      },
      {
        name: "Aug",
        rv: 70,
        ex: 75,
      },
      {
        name: "Sep",
        rv: 110,
        ex: 122,
      },
      {
        name: "Oct",
        rv: 140,
        ex: 118,
      },
      {
        name: "Nov",
        rv: 230,
        ex: 156,
      },
      {
        name: "Dec",
        rv: 210,
        ex: 199,
      },
    ],
  },

  {
    id: 3,
    value: "Last Month",
    data: [
      {
        name: "Jan",
        rv: 40,
        ex: 22,
      },
      {
        name: "Feb",
        rv: 35,
        ex: 37,
      },
      {
        name: "Mar",
        rv: 20,
        ex: 25,
      },
      {
        name: "Apr",
        rv: 65,
        ex: 62,
      },
      {
        name: "May",
        rv: 80,
        ex: 34,
      },
      {
        name: "Jun",
        rv: 65,
        ex: 75,
      },
      {
        name: "Jul",
        rv: 120,
        ex: 142,
      },
      {
        name: "Aug",
        rv: 90,
        ex: 145,
      },
      {
        name: "Sep",
        rv: 50,
        ex: 122,
      },
      {
        name: "Oct",
        rv: 80,
        ex: 108,
      },
      {
        name: "Nov",
        rv: 170,
        ex: 136,
      },
      {
        name: "Dec",
        rv: 150,
        ex: 199,
      },
    ],
  },

  {
    id: 4,
    value: "Current Year",
    data: [
      {
        name: "Jan",
        rv: 20,
        ex: 12,
      },
      {
        name: "Feb",
        rv: 25,
        ex: 17,
      },
      {
        name: "Mar",
        rv: 30,
        ex: 45,
      },
      {
        name: "Apr",
        rv: 35,
        ex: 42,
      },
      {
        name: "May",
        rv: 40,
        ex: 24,
      },
      {
        name: "Jun",
        rv: 55,
        ex: 35,
      },
      {
        name: "Jul",
        rv: 70,
        ex: 42,
      },
      {
        name: "Aug",
        rv: 110,
        ex: 75,
      },
      {
        name: "Sep",
        rv: 150,
        ex: 102,
      },
      {
        name: "Oct",
        rv: 180,
        ex: 108,
      },
      {
        name: "Nov",
        rv: 210,
        ex: 156,
      },
      {
        name: "Dec",
        rv: 250,
        ex: 199,
      },
    ],
  },
];

export {
  crmWidgets,
  salesForecastData,
  dealTypeData,
  balanceOverViewWidgets,
  balanceOverviewData,
};

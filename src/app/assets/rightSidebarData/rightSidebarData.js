import defaultImg from "../images/demos/default.png";

export const rightSidebarThemeData = [
  {
    id: "default",
    label: "Default",
    themeImage: defaultImg,
  },
];

export const rightSidbarLayoutWidthData = [
  {
    id: `fluid`,
    label: "Fluid",
  },
  {
    id: "boxed",
    label: "Boxed",
  },
];

export const rightSidbarLayoutPositionData = [
  {
    id: "fixed",
    label: "Fixed",
  },
  {
    id: "scrollable",
    label: "Scrollable",
  },
];

export const rightSidbarTopbarColorData = [
  {
    id: "light-color",
    label: "Light",
  },
  {
    id: "dark-color",
    label: "Dark",
  },
];

export const rightSidbarColorData = [
  {
    id: "light-bg-color",
    label: "Light",
    leftColor: "bg-[#fff]",
    leftInnerColor: "bg-[#e2e5ed] dark:bg-[#e2e5ed]",
  },
  {
    id: "dark-bg-color",
    label: "Dark",
    leftColor: "bg-accent-yankees-blue",
    leftInnerColor: "bg-[#536395]",
  },
  {
    id: "gradient-bg-color",
    label: "Gradient",
    leftColor: "bg-gradient-to-r from-[#3d578a] to-[#10a99a]",
    leftInnerColor: "bg-[#39919d]",
    childrenElem: [
      {
        id: "child-1",
        label: "gradient-bg-color",
        leftColor: "bg-gradient-to-r from-[#3d578a] to-[#10a99a]",
      },
      {
        id: "child-2",
        label: "sec-child-gradient-bg-color",
        leftColor: "bg-gradient-to-r from-[#2a99dd] to-[#347cef]",
      },
      {
        id: "child-3",
        label: "third-child-gradient-bg-color",
        leftColor: "bg-gradient-to-r from-[#2a99dd] to-[#0fb0a6]",
      },
      {
        id: "child-4",
        label: "fourth-child-gradient-bg-color",
        leftColor: "bg-gradient-to-r from-[#1d2129] to-[#3b4b7d]",
      },
    ],
  },
];

export const rightSidebarImagesData = [
  {
    id: "none",
    bgColor: "bg-[#F3F6F9]",
  },
  {
    id: "snow",
    bgImage: "bg-sidebar-snow",
  },
  {
    id: "office",
    bgImage: "bg-sidebar-office",
  },
  {
    id: "pattern",
    bgImage: "bg-sidebar-pattern",
  },
  {
    id: "bubble",
    bgImage: "bg-sidebar-bubble",
  },
];

export const rightSidebarPrimaryColorData = [
  {
    id: "default",
    bgColor: "bg-accent-yankees-blue",
  },
  {
    id: "teal-green",
    bgColor: "bg-[#066b5e]",
  },
  {
    id: "royal-purple",
    bgColor: "bg-[#5147A3]",
  },
  {
    id: "cobalt-blue",
    bgColor: "bg-[#2a5fc1]",
  },
];

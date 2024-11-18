import defaultImg from "../images/demos/default.png";
import classicImg from "../images/demos/classic.png";
import corporateImg from "../images/demos/corporate.png";
import creativeImg from "../images/demos/creative.png";
import galaxyImg from "../images/demos/galaxy.png";
import interactiveImg from "../images/demos/interactive.png";
import materialImg from "../images/demos/material.png";
import minimalImg from "../images/demos/minimal.png";
import modernImg from "../images/demos/modern.png";
import saasImg from "../images/demos/saas.png";
import vintageImg from "../images/demos/vintage.png";

export const rightSidebarThemeData = [
  {
    id: "default",
    label: "Default",
    themeImage: defaultImg,
  },
  {
    id: "saas",
    label: "Saas",
    themeImage: saasImg,
  },
  {
    id: "corporate",
    label: "Corporate",
    themeImage: corporateImg,
  },
  {
    id: "galaxy",
    label: "Galaxy",
    themeImage: galaxyImg,
  },
  {
    id: "material",
    label: "Material",
    themeImage: materialImg,
  },
  {
    id: "creative",
    label: "Creative",
    themeImage: creativeImg,
  },
  {
    id: "minimal",
    label: "Minimal",
    themeImage: minimalImg,
  },
  {
    id: "modern",
    label: "Modern",
    themeImage: modernImg,
  },
  {
    id: "interactive",
    label: "Interactive",
    themeImage: interactiveImg,
  },
  {
    id: "classic",
    label: "Classic",
    themeImage: classicImg,
  },
  {
    id: "vintage",
    label: "Vintage",
    themeImage: vintageImg,
  },
];

export const rightSidbarColorSchemaData = [
  {
    id: "light",
    label: "Light",
  },
  {
    id: "dark",
    label: "Dark",
  },
];

export const rightSidbarLayoutWidthData = [
  {
    id: "fluid",
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
    leftColor: "bg-sidebar-color-light",
    leftInnerColor: "bg-[#e2e5ed]",
  },
  {
    id: "dark-bg-color",
    label: "Dark",
    leftColor: "bg-sidebar-color-yankees-blue",
    leftInnerColor: "bg-[#536395]",
  },
  {
    id: "gradient-bg-color",
    label: "Gradient",
    leftColor: "bg-sidebar-color-gradient-parent",
    leftInnerColor: "bg-[#39919d]",
    childrenElem: [
      {
        id: "child-1",
        label: "gradient-bg-color",
        leftColor: "bg-sidebar-color-gradient-first-child",
      },
      {
        id: "child-2",
        label: "sec-child-gradient-bg-color",
        leftColor: "bg-sidebar-color-gradient-second-child",
      },
      {
        id: "child-3",
        label: "third-child-gradient-bg-color",
        leftColor: "bg-sidebar-color-gradient-third-child",
      },
      {
        id: "child-4",
        label: "fourth-child-gradient-bg-color",
        leftColor: "bg-sidebar-color-gradient-fourth-child",
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
    bgColor: "bg-sidebar-color-yankees-blue",
  },
  {
    id: "teal-green",
    bgColor: "bg-sidebar-color-dark-teal-green",
  },
  {
    id: "royal-purple",
    bgColor: "bg-sidebar-color-royal-purple",
  },
  {
    id: "cobalt-blue",
    bgColor: "bg-sidebar-color-cobalt-blue",
  },
];

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rightSideBarIsOpen: false, // true
  toggleButtonStatus: false, // true
  layoutType: "vertical", // horizontal, two-column, semi-box
  sidebarUserProfileAvtarType: "show", // hide
  layoutThemeType: "default", // sass, corporate, galaxy, material, creative, minimal, mordern, interactive, classic, vintage
  layoutModeType: "light", // dark
  layoutWidthType: "fluid", // boxed
  layoutPositionType: "fixed", // scrollable
  topbarColorType: "light-color", // dark-color
  leftSidbarSizeType: "default", // compact, small-icon-view, small-hover-view
  leftSidebarViewType: "default", // detached
  leftSidebarColorType: "dark-bg-color", // light-bg-color, gradient-bg-color
  leftSidebarGradientColorType: "gradient-bg-color", // sec-child-gradient-bg-color, third-child-gradient-bg-color, fourth-child-gradient-bg-color
  leftSidebarImageType: "none", // snow, office, pattern, bubble
  layoutThemePrimaryColorType: "default", // teal-green, royal-purple, cobalt-blue
  preloader: "disable", // top-loader, spinner
};

export const layoutCustomizerSlice = createSlice({
  name: "customizer",
  initialState,
  reducers: {
    changeRightSideBarIsOpen: (state, action) => {
      state.rightSideBarIsOpen = action.payload;
    },
    
    changeToggleButtonStatus: (state, action) => {
      state.toggleButtonStatus = action.payload;
    },

    changeLayoutType: (state, action) => {
      state.layoutType = action.payload || "vertical";
    },

    changeLeftSideBarSizeType: (state, action) => {
      state.leftSidbarSizeType = action.payload || "default";
    },

    changeSidebarUserProfileAvtarType: (state, action) => {
      state.sidebarUserProfileAvtarType = action.payload;
    },

    changeLayoutThemeType: (state, action) => {
      state.layoutThemeType = action.payload;
    },

    changeLayoutModeType: (state, action) => {
      state.layoutModeType = action.payload;
    },

    changeLayoutWidthType: (state, action) => {
      state.layoutWidthType = action.payload;
    },

    changeLayoutPositionType: (state, action) => {
      state.layoutPositionType = action.payload;
    },

    changeTopbarColorType: (state, action) => {
      state.topbarColorType = action.payload;
    },

    changeLeftSidbarSizeType: (state, action) => {
      state.leftSidbarSizeType = action.payload;
    },

    changeLeftSidebarViewType: (state, action) => {
      state.leftSidebarViewType = action.payload;
    },

    changeLeftSidebarColorType: (state, action) => {
      state.leftSidebarColorType = action.payload;
    },

    changeLeftSidebarGradientColorType: (state, action) => {
      state.leftSidebarGradientColorType = action.payload;
    },

    changeLeftSidebarImageType: (state, action) => {
      state.leftSidebarImageType = action.payload;
    },

    changeLayoutThemePrimaryColorType: (state, action) => {
      state.layoutThemePrimaryColorType = action.payload;
    },

    changePreloader: (state, action) => {
      state.preloader = action.payload;
    },
  },
});

export const {
  changeRightSideBarIsOpen,
  changeToggleButtonStatus,
  changeLayoutType,
  changeLeftSideBarSizeType,
  changeSidebarUserProfileAvtarType,
  changeLayoutThemeType,
  changeLayoutModeType,
  changeLayoutWidthType,
  changeLayoutPositionType,
  changeTopbarColorType,
  changeLeftSidbarSizeType,
  changeLeftSidebarViewType,
  changeLeftSidebarColorType,
  changeLeftSidebarGradientColorType,
  changeLeftSidebarImageType,
  changeLayoutThemePrimaryColorType,
  changePreloader,
} = layoutCustomizerSlice.actions;
export default layoutCustomizerSlice.reducer;

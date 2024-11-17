import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  layoutType: "vertical", // horizontal, two-column, semi-box
  sidebarUserProfileAvtarType: "show", // hide
  layoutThemeType: "default", // sass, corporate, galaxy, material, creative, minimal, mordern, interactive, classic, vintage
  layoutModeType: "light", // dark
  layoutWidthType: "fluid", // boxed
  layoutPositionType: "fixed", // scrollable
  topbarColorType: "light-color", // dark-color
  leftSidbarSizeType: "default", // compact, small-icon-view, small-hover-view
  leftSidebarViewType: "default", // detached
  leftSidebarColorType: "dark", // light, gradient
  leftSidebarImageType: "none", // TODO
  layoutThemePrimaryColorType: "default",
  preloader: "disable", // enable
  rightSideBarIsOpen: true, // false
};

export const layoutCustomizerSlice = createSlice({
  name: "customizer",
  initialState,
  reducers: {
    initialCustomize: (state) => {
      state.layoutType = "vertical";
      state.layoutThemeType = "default";
      state.layoutThemeColorType = "default";
      state.leftSidebarType = "dark";
      state.layoutModeType = "light";
      state.layoutWidthType = "lg";
      state.layoutPositionType = "fixed";
      state.topbarThemeType = "light";
      state.leftsidbarSizeType = "lg";
      state.leftSidebarViewType = "default";
      state.leftSidebarImageType = "none";
      state.preloader = "disable";
      state.sidebarVisibilitytype = "show";
      state.rightSideBarIsOpen = true;
    },
    changeLayoutType: (state, action) => {
      state.layoutType = action.payload || "vertical";
    },

    changeLeftSideBarSizeType: (state, action) => {
      state.leftSidbarSizeType = action.payload || "default";
    },

    changeRightSideBarIsOpen: (state, action) => {
      state.rightSideBarIsOpen = action.payload;
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
  },
});

export const {
  initialCustomize,
  changeLayoutType,
  changeLeftSideBarSizeType,
  changeRightSideBarIsOpen,
  changeSidebarUserProfileAvtarType,
  changeLayoutThemeType,
  changeLayoutModeType,
  changeLayoutWidthType,
  changeLayoutPositionType,
  changeTopbarColorType,
  changeLeftSidbarSizeType,
} = layoutCustomizerSlice.actions;
export default layoutCustomizerSlice.reducer;

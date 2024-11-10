import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  layoutType: "vertical",
  layoutThemeType: "default",
  layoutThemeColorType: "default",
  leftSidebarType: "dark",
  layoutModeType: "light",
  layoutWidthType: "lg",
  layoutPositionType: "fixed",
  topbarThemeType: "light",
  leftsidbarSizeType: "lg",
  leftSidebarViewType: "default",
  leftSidebarImageType: "none",
  preloader: "disable",
  sidebarVisibilitytype: "show",
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
    },
  },
});

export const { initialCustomize } = layoutCustomizerSlice.actions;
export default layoutCustomizerSlice.reducer;

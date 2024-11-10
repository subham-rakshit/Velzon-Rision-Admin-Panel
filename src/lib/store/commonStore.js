import { configureStore } from "@reduxjs/toolkit";

import layoutReducer from "./features/layoutCustomizer/layoutCustomizerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      layout: layoutReducer,
    },
  });
};

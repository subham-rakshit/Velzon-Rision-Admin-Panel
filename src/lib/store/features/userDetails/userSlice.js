import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initialRender: (state) => {
      state.loading = false;
    },
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    signInFailure: (state) => {
      state.loading = false;
    },
    authenticationStart: (state) => {
      state.loading = true;
    },
    authenticationSuccess: (state) => {
      state.loading = false;
    },
    authenticationFailure: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initialRender,
  signInStart,
  signInSuccess,
  signInFailure,
  authenticationStart,
  authenticationSuccess,
  authenticationFailure,
} = userSlice.actions;

export default userSlice.reducer;

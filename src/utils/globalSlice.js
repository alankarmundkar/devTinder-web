import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    toast: {
      show: false,
      message: "",
      type: "",
    },
  },
  reducers: {
    addToast: (state, action) => {
      state.toast = action.payload;
    },
    removeToast: (state) => {
      state.toast = {
        show: false,
        message: "",
        type: "",
      };
    },
    resetGlobal: (state) => {
      state.toast = {
        show: false,
        message: "",
        type: "",
      };
    },
  },
});

export const { addToast, removeToast, resetGlobal } = globalSlice.actions;

export default globalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    clearLocation: (state) => {
      state.location = "";
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;

export default locationSlice.reducer;
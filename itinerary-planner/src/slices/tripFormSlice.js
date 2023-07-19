import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const tripFormSlice = createSlice({
  name: "tripForm",
  initialState,
  reducers: {
    toggleTripFormOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleTripFormOpen } = tripFormSlice.actions;

export default tripFormSlice.reducer;
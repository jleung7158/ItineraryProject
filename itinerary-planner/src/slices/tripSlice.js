import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trip: "",
};

export const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setTrip: (state, action) => {
      state.trip = action.payload;
    },
    clearTrip: (state) => {
      state.trip = "";
    },
  },
});

export const { setTrip, clearTrip } = tripSlice.actions;

export default tripSlice.reducer;
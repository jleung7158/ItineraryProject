import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plan: "",
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlan: (state, action) => {
      state.plan = action.payload;
    },
    clearPlan: (state) => {
      state.plan = "";
    },
  },
});

export const { setPlan, clearPlan } = planSlice.actions;

export default planSlice.reducer;
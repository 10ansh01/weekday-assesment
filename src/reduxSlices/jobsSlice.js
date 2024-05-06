import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addJobs: (state, action) => {
      state.push(...action.payload);
    },
  },
});
export const { addJobs } = jobsSlice.actions;
export default jobsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { filterJobs, filterOnSiteOrRemote } from "./filterUtils/filter-jobs";

const initialState = [];

export const filteredJobsSlice = createSlice({
  name: "filteredJobs",
  initialState,
  reducers: {
    updateFilteredJobs: (state, action) => {
      const { jobsToFilter, selectedFilters, keyToFilter } = action.payload;
      let filteredJobsList;
      if (keyToFilter === "selectedWorkMode") {
        filteredJobsList = filterOnSiteOrRemote(
          jobsToFilter,
          selectedFilters["selectedWorkMode"][0]
        );
      } else {
        filteredJobsList = filterJobs(
          jobsToFilter,
          selectedFilters,
          keyToFilter
        );
      }

      console.log(filteredJobsList, "getOptionLabel");
      //I am replacing the already present job data with the new filtered data.
      //Because I want to be more sure that the saved data is correct according to the applied filters
      filteredJobsList && state.splice(0, state.length, ...filteredJobsList);
    },
  },
});
export const { updateFilteredJobs } = filteredJobsSlice.actions;
export default filteredJobsSlice.reducer;

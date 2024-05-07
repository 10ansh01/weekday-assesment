//This slice updates the filtered jobs
import { createSlice } from "@reduxjs/toolkit";
import {
  filterCompanyNames,
  filterExperience,
  filterJobs,
  filterMoreThanBase,
  filterOnSiteOrRemote,
} from "./filterUtils/filter-jobs";

const initialState = [];

export const filteredJobsSlice = createSlice({
  name: "filteredJobs",
  initialState,
  reducers: {
    updateFilteredJobs: (state, action) => {
      const { jobsToFilter, selectedFilters, keyToFilter } = action.payload;
      let filteredJobsList;

      switch (keyToFilter) {
        case "selectedCompanyNames":
          filteredJobsList = filterCompanyNames(
            jobsToFilter,
            selectedFilters["selectedCompanyNames"][0]
          );
          break;
        case "selectedExperience":
          filteredJobsList = filterExperience(
            jobsToFilter,
            selectedFilters["selectedExperience"][0]
          );
          break;
        case "selectedMinPay":
          filteredJobsList = filterMoreThanBase(
            jobsToFilter,
            selectedFilters["selectedMinPay"][0]
          );
          break;
        case "selectedWorkMode":
          filteredJobsList = filterOnSiteOrRemote(
            jobsToFilter,
            selectedFilters["selectedWorkMode"][0]
          );
          break;
        default:
          filteredJobsList = filterJobs(
            jobsToFilter,
            selectedFilters,
            keyToFilter
          );
      }

      //I am replacing the already present job data with the new filtered data.
      //Because I want to be more sure that the saved data is correct according to the
      //applied filters
      filteredJobsList && state.splice(0, state.length, ...filteredJobsList);
    },
  },
});
export const { updateFilteredJobs } = filteredJobsSlice.actions;
export default filteredJobsSlice.reducer;

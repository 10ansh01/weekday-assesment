import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../reduxSlices/filterOptionsSlice";
import jobsReducer from "../reduxSlices/jobsSlice";
import selectFiltersReducer from "../reduxSlices/selectedFiltersSlice";
import filteredJobsReducer from "../reduxSlices/filteredJobsSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    filtersList: filterReducer,
    selectedFilters: selectFiltersReducer,
    filteredJobs: filteredJobsReducer,
  },
});

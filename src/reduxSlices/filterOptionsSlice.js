import { createSlice } from "@reduxjs/toolkit";
import { combineAndSortArrays } from "./filterUtils/combine-and-sort-arrays";

const initialState = {
  LocationFilterOptions: [],
  CompanyNameFilterOptions: [],
  ExperienceFilterOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  TechStackFilterOptions: [],
  RoleFilterOptions: [],
  MinPayFilterOptions: [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  WorkModeFilterOptions: ["remote", "Onsite"],
};

export const filterOptionsSlice = createSlice({
  name: "filtersList",
  initialState,
  reducers: {
    addFilterOptions: (state, action) => {
      const { payload } = action;
      const newLocationFilterOptions = payload
        .map((job) => job.location)
        .filter(Boolean);
      const newCompanyNameFilterOptions = payload
        .map((job) => job.companyName)
        .filter(Boolean);
      const newTechStackFilterOptions = payload
        .map((job) => job.techStack)
        .filter(Boolean);
      const newRoleFilterOptions = payload
        .map((job) => job.jobRole)
        .filter(Boolean);

      state.LocationFilterOptions = combineAndSortArrays(
        state.LocationFilterOptions,
        newLocationFilterOptions
      );
      state.CompanyNameFilterOptions = combineAndSortArrays(
        state.CompanyNameFilterOptions,
        newCompanyNameFilterOptions
      );
      state.TechStackFilterOptions = combineAndSortArrays(
        state.TechStackFilterOptions,
        newTechStackFilterOptions
      );
      state.RoleFilterOptions = combineAndSortArrays(
        state.RoleFilterOptions,
        newRoleFilterOptions
      );
    },
  },
});

export const { addFilterOptions, removeFilterOption } =
  filterOptionsSlice.actions;
export default filterOptionsSlice.reducer;

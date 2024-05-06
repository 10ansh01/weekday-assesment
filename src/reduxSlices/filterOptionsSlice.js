import { createSlice } from "@reduxjs/toolkit";
import { combineAndSortArrays } from "./filterUtils/combine-and-sort-arrays";

const initialState = {
  LocationFilterOptions: [],
  CompanyNameFilterOptions: [],
  ExperienceFilterOptions: [],
  TechStackFilterOptions: [],
  RoleFilterOptions: [],
  MinPayFilterOptions: [],
  WorkModeFilterOptions: ["Remote", "Onsite"],
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
      const newExperienceFilterOptions = payload
        .map((job) => job.minExp)
        .filter(Boolean);
      const newTechStackFilterOptions = payload
        .map((job) => job.techStack)
        .filter(Boolean);
      const newRoleFilterOptions = payload
        .map((job) => job.jobRole)
        .filter(Boolean);
      const newMinPayFilterOptions = payload
        .map((job) => job.minJdSalary)
        .filter(Boolean);

      state.LocationFilterOptions = combineAndSortArrays(
        state.LocationFilterOptions,
        newLocationFilterOptions
      );
      state.CompanyNameFilterOptions = combineAndSortArrays(
        state.CompanyNameFilterOptions,
        newCompanyNameFilterOptions
      );
      state.ExperienceFilterOptions = combineAndSortArrays(
        state.ExperienceFilterOptions,
        newExperienceFilterOptions
      );
      state.TechStackFilterOptions = combineAndSortArrays(
        state.TechStackFilterOptions,
        newTechStackFilterOptions
      );
      state.RoleFilterOptions = combineAndSortArrays(
        state.RoleFilterOptions,
        newRoleFilterOptions
      );
      state.MinPayFilterOptions = combineAndSortArrays(
        state.MinPayFilterOptions,
        newMinPayFilterOptions
      );
    },
  },
});

export const { addFilterOptions, removeFilterOption } =
  filterOptionsSlice.actions;
export default filterOptionsSlice.reducer;

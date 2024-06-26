//This slice provides options to filter from
import { createSlice } from "@reduxjs/toolkit";
import { combineAndSortArrays } from "./filterUtils/combine-and-sort-arrays";

const initialState = {
  LocationFilterOptions: [],
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

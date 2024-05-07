import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFilterSelected: false,
  selectedLocations: [],
  selectedCompanyNames: [],
  selectedExperience: [],
  selectedTechStack: [],
  selectedJobRole: [],
  selectedMinPay: [],
  selectedWorkMode: [],
};

export const selectedFiltersSlice = createSlice({
  name: "selectedFilters",
  initialState,
  reducers: {
    addSelectedFilter: (state, action) => {
      const { filterType, filterValue, multiple } = action.payload;
      state.isFilterSelected = true;

      if (multiple && !state[filterType].includes(filterValue)) {
        state[filterType].push(filterValue);
      } else if (filterValue.length === 0) {
        state[filterType] = [];
      } else {
        state[filterType] = [filterValue];
      }
    },
    removeFilter: (state, action) => {
      const { removedFilterOption, keyToFilter } = action.payload;
      state[keyToFilter] = state[keyToFilter].filter(
        (value) => value !== removedFilterOption
      );
    },
  },
});

export const { addSelectedFilter, removeFilter } = selectedFiltersSlice.actions;
export default selectedFiltersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFilterSelected: false,
  selectedLocations: [],
  selectedCompanyNames: [],
  selectedExperience: null,
  selectedTechStack: [],
  selectedJobRole: [],
  selectedMinPay: null,
  selectedWorkMode: null,
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
      } else {
        state[filterType] = filterValue;
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

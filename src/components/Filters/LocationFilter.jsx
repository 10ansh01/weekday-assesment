import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { CustomAutocompleteDropdown } from "../utilityComponents/CustomAutocompleteDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedFilter,
  removeFilter,
} from "../../reduxSlices/selectedFiltersSlice";
import { updateFilteredJobs } from "../../reduxSlices/filteredJobsSlice";
import { isAnyOtherFilterAlreadySelected } from "../../reduxSlices/filterUtils/is-any-filter-selected";

export const LocationFilter = () => {
  const LocationFilterOption = useSelector(
    (state) => state.filtersList.LocationFilterOptions
  );
  const jobs = useSelector((state) => state.jobs);
  const selectedFilters = useSelector((state) => state.selectedFilters);
  const filteredJobs = useSelector((state) => state.filteredJobs);

  const dispatch = useDispatch();

  const [selectedFilterOptions, setSelectedFilterOptions] = useState([]);
  const [filterRemoved, setFiterRemoved] = useState(true);

  const handleFilterChange = (newValue) => {
    setSelectedFilterOptions(newValue);

    //If Block -> Remove removed filter from redux
    // Else Block -> Add selected filter to redux
    if (newValue.length < selectedFilters["selectedLocations"].length) {
      let removedFilterOption;
      selectedFilters["selectedLocations"].forEach((element) => {
        if (!newValue.includes(element)) {
          removedFilterOption = element;
        }
      });
      setFiterRemoved(true);
      dispatch(
        removeFilter({ removedFilterOption, keyToFilter: "selectedLocations" })
      );
    } else {
      dispatch(
        addSelectedFilter({
          filterType: "selectedLocations",
          filterValue: newValue[newValue.length - 1],
          multiple: true,
        })
      );
    }
  };

  useEffect(() => {
    const isAnyOtherFilterSelected = isAnyOtherFilterAlreadySelected(
      selectedFilters,
      "selectedLocations"
    );
    //if a filter option was removed from current filter and
    // the length of filtered jobs was already null
    // then on removal of the current filter option,
    // we need to filter all the jobs according to all the other filters that are selected
    // apart from the one which was removed.
    if (
      filterRemoved &&
      isAnyOtherFilterSelected &&
      filteredJobs &&
      filteredJobs.length === 0
    ) {
      for (const filterType in selectedFilters) {
        //below if statement checks if any other filter is selected apart from the current filter type
        if (
          selectedFilters[filterType] &&
          selectedFilters[filterType].length > 0 &&
          selectedFilters[filterType] !== "selectedLocations"
        ) {
          dispatch(
            updateFilteredJobs({
              jobsToFilter: jobs,
              selectedFilters,
              keyToFilter: filterType,
            })
          );
        }
      }
    } else {
      const jobsToFilter = isAnyOtherFilterSelected ? filteredJobs : jobs;

      if (Object.keys(selectedFilters).length > 0) {
        dispatch(
          updateFilteredJobs({
            jobsToFilter,
            selectedFilters,
            keyToFilter: "selectedLocations",
          })
        );
      }
    }
    setFiterRemoved(false);
  }, [selectedFilters["selectedLocations"]]);

  return (
    <>
      <CustomAutocompleteDropdown
        options={LocationFilterOption}
        getOptionLabel={(option) => option}
        onChange={handleFilterChange}
        placeholder="Location"
        minWidth={200}
      />
    </>
  );
};

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

export const WorkModeFilter = React.memo(() => {
  const WorkModeFilterOption = useSelector(
    (state) => state.filtersList.WorkModeFilterOptions
  );
  const jobs = useSelector((state) => state.jobs);
  const selectedFilters = useSelector((state) => state.selectedFilters);
  const filteredJobs = useSelector((state) => state.filteredJobs);

  const dispatch = useDispatch();

  const [selectedFilterOptions, setSelectedFilterOptions] = useState([]);
  const [filterRemoved, setFiterRemoved] = useState(true);

  const handleFilterChange = (newValue) => {
    setSelectedFilterOptions(newValue);
    const newValueInArray = newValue ? [newValue] : [];

    //If Block -> Remove removed filter from redux
    // Else Block -> Add selected filter to redux
    if (newValueInArray.length < selectedFilters["selectedWorkMode"].length) {
      let removedFilterOption = selectedFilters["selectedWorkMode"][0];
      setFiterRemoved(true);
      dispatch(
        removeFilter({ removedFilterOption, keyToFilter: "selectedWorkMode" })
      );
    } else {
      dispatch(
        addSelectedFilter({
          filterType: "selectedWorkMode",
          filterValue: newValueInArray[newValueInArray.length - 1],
          multiple: false,
        })
      );
    }
  };

  useEffect(() => {
    const isAnyOtherFilterSelected = isAnyOtherFilterAlreadySelected(
      selectedFilters,
      "selectedWorkMode"
    );
    // if a filter option was removed from current filter and
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
          selectedFilters[filterType] !== "selectedWorkMode"
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
            keyToFilter: "selectedWorkMode",
          })
        );
      }
    }
    setFiterRemoved(false);
  }, [selectedFilters["selectedWorkMode"]]);

  return (
    <>
      <CustomAutocompleteDropdown
        options={WorkModeFilterOption}
        getOptionLabel={(option) => option}
        onChange={handleFilterChange}
        placeholder="Remote"
        minWidth={200}
        multiple={false}
      />
    </>
  );
});

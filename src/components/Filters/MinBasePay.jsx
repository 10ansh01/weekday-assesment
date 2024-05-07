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

export const MinBasePayFilter = React.memo(() => {
  const MinPayFilterOption = useSelector(
    (state) => state.filtersList.MinPayFilterOptions
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
    if (newValueInArray.length < selectedFilters["selectedMinPay"].length) {
      let removedFilterOption = selectedFilters["selectedMinPay"][0];
      setFiterRemoved(true);
      dispatch(
        removeFilter({ removedFilterOption, keyToFilter: "selectedMinPay" })
      );
    } else {
      dispatch(
        addSelectedFilter({
          filterType: "selectedMinPay",
          filterValue: newValueInArray[newValueInArray.length - 1],
          multiple: false,
        })
      );
    }
  };

  useEffect(() => {
    const isAnyOtherFilterSelected = isAnyOtherFilterAlreadySelected(
      selectedFilters,
      "selectedMinPay"
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
          selectedFilters[filterType] !== "selectedMinPay"
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
            keyToFilter: "selectedMinPay",
          })
        );
      }
    }
    setFiterRemoved(false);
  }, [selectedFilters["selectedMinPay"]]);

  return (
    <>
      <CustomAutocompleteDropdown
        options={MinPayFilterOption}
        getOptionLabel={(option) => option.toString()}
        onChange={handleFilterChange}
        placeholder="Min Base Pay Salary"
        minWidth={200}
        multiple={false}
      />
    </>
  );
});

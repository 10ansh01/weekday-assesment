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

  const handleFilterChange = (newValue) => {
    setSelectedFilterOptions(newValue);
    const newValueInArray = newValue ? [newValue] : [];

    //If Block -> Remove removed filter from redux
    // Else Block -> Add selected filter to redux
    if (newValueInArray.length < selectedFilters["selectedWorkMode"].length) {
      let removedFilterOption = selectedFilters["selectedWorkMode"][0];

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

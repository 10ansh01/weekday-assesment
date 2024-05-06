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

  const handleFilterChange = (newValue) => {
    setSelectedFilterOptions(newValue);
    const newValueInArray = newValue ? [newValue] : [];

    //If Block -> Remove removed filter from redux
    // Else Block -> Add selected filter to redux
    if (newValueInArray.length < selectedFilters["selectedMinPay"].length) {
      let removedFilterOption = selectedFilters["selectedMinPay"][0];

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
  }, [selectedFilters["selectedMinPay"]]);

  console.log(MinPayFilterOption);
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

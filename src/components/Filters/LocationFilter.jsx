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

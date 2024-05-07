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
import useFilteredJobsUpdater from "./useFilteredJobsUpdater";

export const MaxExperienceFilter = React.memo(() => {
  const ExperienceFilterOption = useSelector(
    (state) => state.filtersList.ExperienceFilterOptions
  );
  const jobs = useSelector((state) => state.jobs);
  const selectedFilters = useSelector((state) => state.selectedFilters);
  const filteredJobs = useSelector((state) => state.filteredJobs);

  const dispatch = useDispatch();

  const [selectedFilterOptions, setSelectedFilterOptions] = useState([]);
  const [filterRemoved, setFilterRemoved] = useState(true);

  const handleFilterChange = (newValue) => {
    setSelectedFilterOptions(newValue);
    const newValueInArray = newValue ? [newValue] : [];

    //If Block -> Remove removed filter from redux
    // Else Block -> Add selected filter to redux
    if (newValueInArray.length < selectedFilters["selectedExperience"].length) {
      let removedFilterOption = selectedFilters["selectedExperience"][0];
      setFilterRemoved(true);
      dispatch(
        removeFilter({ removedFilterOption, keyToFilter: "selectedExperience" })
      );
    } else {
      dispatch(
        addSelectedFilter({
          filterType: "selectedExperience",
          filterValue: newValueInArray[newValueInArray.length - 1],
          multiple: false,
        })
      );
    }
  };

  useFilteredJobsUpdater(
    "selectedExperience",
    selectedFilters,
    filterRemoved,
    setFilterRemoved
  );

  return (
    <>
      <CustomAutocompleteDropdown
        options={ExperienceFilterOption}
        getOptionLabel={(option) => option.toString()}
        onChange={handleFilterChange}
        label="Experience"
        minWidth={150}
        multiple={false}
      />
    </>
  );
});

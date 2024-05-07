import React, { useState } from "react";
import { CustomAutocompleteDropdown } from "../utilityComponents/CustomAutocompleteDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedFilter,
  removeFilter,
} from "../../reduxSlices/selectedFiltersSlice";
import useFilteredJobsUpdater from "../../hooks/useFilteredJobsUpdater";

export const MaxExperienceFilter = React.memo(() => {
  const ExperienceFilterOption = useSelector(
    (state) => state.filtersList.ExperienceFilterOptions
  );
  const selectedFilters = useSelector((state) => state.selectedFilters);

  const dispatch = useDispatch();

  const [filterRemoved, setFilterRemoved] = useState(true);

  const handleFilterChange = (newValue) => {
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

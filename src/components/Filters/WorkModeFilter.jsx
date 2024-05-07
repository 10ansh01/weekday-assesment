import React, { useState } from "react";
import { CustomAutocompleteDropdown } from "../utilityComponents/CustomAutocompleteDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedFilter,
  removeFilter,
} from "../../reduxSlices/selectedFiltersSlice";
import useFilteredJobsUpdater from "../../hooks/useFilteredJobsUpdater";

export const WorkModeFilter = React.memo(() => {
  const WorkModeFilterOption = useSelector(
    (state) => state.filtersList.WorkModeFilterOptions
  );
  const selectedFilters = useSelector((state) => state.selectedFilters);

  const dispatch = useDispatch();

  const [filterRemoved, setFilterRemoved] = useState(true);

  const handleFilterChange = (newValue) => {
    const newValueInArray = newValue ? [newValue] : [];

    //If Block -> Remove removed filter from redux
    // Else Block -> Add selected filter to redux
    if (newValueInArray.length < selectedFilters["selectedWorkMode"].length) {
      let removedFilterOption = selectedFilters["selectedWorkMode"][0];
      setFilterRemoved(true);
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

  useFilteredJobsUpdater(
    "selectedWorkMode",
    selectedFilters,
    filterRemoved,
    setFilterRemoved
  );

  return (
    <>
      <CustomAutocompleteDropdown
        options={WorkModeFilterOption}
        getOptionLabel={(option) => option}
        onChange={handleFilterChange}
        label="Remote"
        minWidth={150}
        multiple={false}
      />
    </>
  );
});

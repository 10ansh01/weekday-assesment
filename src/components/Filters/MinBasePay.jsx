import React, { useState } from "react";
import { CustomAutocompleteDropdown } from "../utilityComponents/CustomAutocompleteDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedFilter,
  removeFilter,
} from "../../reduxSlices/selectedFiltersSlice";
import useFilteredJobsUpdater from "../../hooks/useFilteredJobsUpdater";

export const MinBasePayFilter = React.memo(() => {
  const MinPayFilterOption = useSelector(
    (state) => state.filtersList.MinPayFilterOptions
  );
  const selectedFilters = useSelector((state) => state.selectedFilters);

  const dispatch = useDispatch();

  const [filterRemoved, setFilterRemoved] = useState(true);

  const handleFilterChange = (newValue) => {
    const newValueInArray = newValue ? [newValue] : [];

    //If Block -> Remove removed filter from redux
    // Else Block -> Add selected filter to redux
    if (newValueInArray.length < selectedFilters["selectedMinPay"].length) {
      let removedFilterOption = selectedFilters["selectedMinPay"][0];
      setFilterRemoved(true);
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

  useFilteredJobsUpdater(
    "selectedMinPay",
    selectedFilters,
    filterRemoved,
    setFilterRemoved
  );

  return (
    <>
      <CustomAutocompleteDropdown
        options={MinPayFilterOption}
        getOptionLabel={(option) => option.toString()}
        onChange={handleFilterChange}
        label="Min Base Pay Salary"
        minWidth={200}
        multiple={false}
      />
    </>
  );
});

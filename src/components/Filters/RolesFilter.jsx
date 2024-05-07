import React, { useState } from "react";
import { CustomAutocompleteDropdown } from "../utilityComponents/CustomAutocompleteDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedFilter,
  removeFilter,
} from "../../reduxSlices/selectedFiltersSlice";
import useFilteredJobsUpdater from "../../hooks/useFilteredJobsUpdater";

export const RolesFilter = React.memo(() => {
  const RoleFilterOption = useSelector(
    (state) => state.filtersList.RoleFilterOptions
  );
  const selectedFilters = useSelector((state) => state.selectedFilters);

  const dispatch = useDispatch();

  const [filterRemoved, setFilterRemoved] = useState(true);

  const handleFilterChange = (newValue) => {
    //If Block -> Remove removed filter from redux
    // Else Block -> Add selected filter to redux
    if (newValue.length < selectedFilters["selectedJobRole"].length) {
      let removedFilterOption;
      selectedFilters["selectedJobRole"].forEach((element) => {
        if (!newValue.includes(element)) {
          removedFilterOption = element;
        }
      });
      setFilterRemoved(true);
      dispatch(
        removeFilter({ removedFilterOption, keyToFilter: "selectedJobRole" })
      );
    } else {
      dispatch(
        addSelectedFilter({
          filterType: "selectedJobRole",
          filterValue: newValue[newValue.length - 1],
          multiple: true,
        })
      );
    }
  };

  useFilteredJobsUpdater(
    "selectedJobRole",
    selectedFilters,
    filterRemoved,
    setFilterRemoved
  );

  return (
    <>
      <CustomAutocompleteDropdown
        options={RoleFilterOption}
        getOptionLabel={(option) => option}
        onChange={handleFilterChange}
        label="Roles"
        minWidth={130}
      />
    </>
  );
});

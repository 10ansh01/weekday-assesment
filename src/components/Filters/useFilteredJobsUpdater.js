import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleJobsToFilter } from "../../reduxSlices/filterUtils/filter-jobs";
import { isAnyOtherFilterAlreadySelected } from "../../reduxSlices/filterUtils/is-any-filter-selected";
import { updateFilteredJobs } from "../../reduxSlices/filteredJobsSlice";

const useFilteredJobsUpdater = (
  filterKey,
  selectedFilters,
  filterRemoved,
  setFilterRemoved
) => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);

  useEffect(() => {
    const isAnyOtherFilterSelected = isAnyOtherFilterAlreadySelected(
      selectedFilters,
      filterKey
    );

    let locallyFilteredJobList = jobs;
    const otherFilters = { ...selectedFilters };
    delete otherFilters[filterKey];

    if (isAnyOtherFilterSelected && filterRemoved) {
      for (const type in otherFilters) {
        if (selectedFilters[type].length > 0) {
          locallyFilteredJobList = handleJobsToFilter(
            locallyFilteredJobList,
            selectedFilters,
            type
          );
        }
      }
    } else {
      for (const type in otherFilters) {
        if (otherFilters[type].length > 0) {
          locallyFilteredJobList = handleJobsToFilter(
            locallyFilteredJobList,
            selectedFilters,
            type
          );
        }
      }
    }

    dispatch(
      updateFilteredJobs({
        jobsToFilter: locallyFilteredJobList,
        selectedFilters,
        keyToFilter: filterKey,
      })
    );

    // Reset the filterRemoved flag
    setFilterRemoved(false);
  }, [filterKey, selectedFilters, filterRemoved, jobs]);
};

export default useFilteredJobsUpdater;

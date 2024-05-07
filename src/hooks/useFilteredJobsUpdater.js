//This is a common hook getting used in every filter component:

//Logic: I am basically checking here the following cases:

// 1. If there is no other filter selected apart from the current filter that the user is interacting with
// in that case, it will just confirm that no other filter is selected and will then update the jobs
// based on the current filter value

//2. If there is any other filter already selected and user adds another filter
//in that case first the hook will filter out all the jobs from current jobs based on every other
//filter except from current filter and store them locally. Once the filtered list is there, that list
// will be sent to an action dispatch and the action will filter out jobs
//based on the current filter from the list that was sent to it

//3. If there was a filter removed, it will filter out jobs from every other filter except from current filter
// then it will store the filtered jobs locally, the locally stored list will be sent to
//an action dispatch which will filter jobs based on current filter from the list that was sent.

/*
*
//PS: IF ANY OF THE LOGIC WAS CONFUSING, I AM REALLY HAPPY TO DISCUSS MORE ON THIS
// AND HOW I CAN MAKE IT MORE ROBUST.
*
*/

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleJobsToFilter } from "../reduxSlices/filterUtils/filter-jobs";
import { isAnyOtherFilterAlreadySelected } from "../reduxSlices/filterUtils/is-any-filter-selected";
import { updateFilteredJobs } from "../reduxSlices/filteredJobsSlice";

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

    setFilterRemoved(false);
  }, [filterKey, selectedFilters, filterRemoved, jobs]);
};

export default useFilteredJobsUpdater;

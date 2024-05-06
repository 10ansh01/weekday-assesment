// I have created this method to use in each Filter Component
//Reason: If any filter was already selected then the new selected
//filter will filter out the results from already filtered jobs

//Example: If Location Chennai is selected and the user selects IOS Job role,
// Then the results would contain IOS Job roles in Chennai
export const isAnyOtherFilterAlreadySelected = (
  selectedFilters,
  currentFilterKey
) => {
  let isAnyOtherFilterAlreadySelected = false;
  for (const filterType in selectedFilters) {
    if (
      filterType !== "isFilterSelected" &&
      selectedFilters.hasOwnProperty(filterType)
    ) {
      const filterArray = selectedFilters[filterType];
      if (Array.isArray(filterArray) && filterArray.length > 0) {
        isAnyOtherFilterAlreadySelected = Boolean(
          filterType !== currentFilterKey
        );
        break; // Exit the loop early if any other filter is already selected
      }
    }
  }

  return isAnyOtherFilterAlreadySelected;
};

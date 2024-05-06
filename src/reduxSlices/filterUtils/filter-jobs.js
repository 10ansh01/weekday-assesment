const selectedFilterKeyMap = {
  selectedLocations: "location",
  selectedCompanyNames: "companyName",
  selectedExperience: "minExp",
  selectedTechStack: "",
  selectedJobRole: "jobRole",
  selectedMinPay: "minJdSalary",
  selectedWorkMode: "location",
};

export const filterJobs = (jobs, selectedFilters, keyToFilter = null) => {
  if (keyToFilter) {
    return jobs.filter((job) =>
      selectedFilters[keyToFilter].includes(
        job[selectedFilterKeyMap[keyToFilter]]
      )
    );
  }
  if (jobs && jobs.length > 0 && selectedFilters) {
    return jobs.filter((job) => {
      for (const filterType in selectedFilters) {
        const filterValues = selectedFilters[filterType];
        if (
          filterValues &&
          filterValues.length > 0 &&
          filterValues.includes(job[selectedFilterKeyMap[filterType]])
        ) {
          return true;
        }
      }
      return false;
    });
  }
  return [];
};

export const filterOnSiteOrRemote = (jobs, locationType) => {
  return jobs.filter((job) => {
    //if Location Type is remote, then filter out remote jobs
    if (
      locationType &&
      job.location === "remote" &&
      locationType === "remote"
    ) {
      return true;
    } else if (
      //if location type is not remote, filter out onsite jobs
      locationType &&
      locationType !== "remote" &&
      job.location !== "remote"
    ) {
      return true;
    } else {
      //if locationTypeIsUndefined, do not filter
      return false;
    }
  });
};

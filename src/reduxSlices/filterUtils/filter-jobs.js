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
    if (
      keyToFilter &&
      selectedFilters[keyToFilter] &&
      selectedFilters[keyToFilter].length === 0
    ) {
      return jobs;
    }

    return jobs.filter((job) =>
      selectedFilters[keyToFilter].includes(
        job[selectedFilterKeyMap[keyToFilter]]
      )
    );
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

export const filterMoreThanBase = (jobs, requiredBasePay) => {
  return jobs.filter((job) => {
    if (job.minJdSalary >= requiredBasePay) {
      return true;
    }
  });
};

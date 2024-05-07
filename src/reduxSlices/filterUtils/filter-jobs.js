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
  if (locationType === undefined) {
    return jobs;
  }

  return jobs.filter((job) => {
    if (locationType === "remote") {
      return job.location === "remote";
    }

    return job.location !== "remote";
  });
};

export const filterMoreThanBase = (jobs, requiredBasePay = 0) => {
  return jobs.filter((job) => {
    if (job.minJdSalary >= requiredBasePay) {
      return true;
    }
  });
};

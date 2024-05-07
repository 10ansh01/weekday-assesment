export const selectedFilterKeyMap = {
  selectedLocations: "location",
  selectedCompanyNames: "companyName",
  selectedExperience: "minExp",
  selectedTechStack: "",
  selectedJobRole: "jobRole",
  selectedMinPay: "minJdSalary",
  selectedWorkMode: "location",
};

export const handleJobsToFilter = (
  jobs,
  selectedFilters,
  keyToFilter = null
) => {
  if (keyToFilter === "selectedExperience") {
    return filterExperience(jobs, selectedFilters[keyToFilter][0]);
  } else if (keyToFilter === "selectedMinPay") {
    return filterMoreThanBase(jobs, selectedFilters[keyToFilter][0]);
  } else if (keyToFilter === "selectedWorkMode") {
    return filterOnSiteOrRemote(jobs, selectedFilters[keyToFilter][0]);
  } else {
    return filterJobs(jobs, selectedFilters, keyToFilter);
  }
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

export const filterExperience = (jobs, requiredMaxExperience = 200) => {
  //in case requiredMaxExp is undefined, the value to compare from should be large enough so
  // that all the jobs are returned and no jobs are filtered out
  return jobs.filter(
    (job) => job.minExp !== null && job.minExp <= requiredMaxExperience
  );
};

export const filterCompanyNames = (jobs, enteredCompanyName) => {
  return jobs.filter((job) =>
    job.companyName.toLowerCase().includes(enteredCompanyName.toLowerCase())
  );
};

import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import { updateFilteredJobs } from "../../reduxSlices/filteredJobsSlice";
import { addSelectedFilter } from "../../reduxSlices/selectedFiltersSlice";

export const CompanyNameFilter = () => {
  const [inputValue, setInputValue] = useState("");

  const jobs = useSelector((state) => state.jobs);
  const selectedFilters = useSelector((state) => state.selectedFilters);
  const dispatch = useDispatch();
  const debouncedInputValue = useDebounce(inputValue, 500);

  const jobSearchHandler = (inputValue) => {
    const filtered = jobs.filter((job) =>
      job.companyName.toLowerCase().includes(inputValue.toLowerCase())
    );

    dispatch(
      addSelectedFilter({
        filterType: "selectedCompanyNames",
        filterValue: inputValue,
        multiple: false,
      })
    );
  };

  useEffect(() => {
    jobSearchHandler(debouncedInputValue);
  }, [debouncedInputValue]);

  useEffect(() => {
    dispatch(
      updateFilteredJobs({
        jobsToFilter: jobs,
        selectedFilters,
        keyToFilter: "selectedCompanyNames",
      })
    );
  }, [selectedFilters]);

  const handleChange = (value) => {
    setInputValue(value);
  };

  return (
    <Stack
      component="form"
      sx={{
        width: "180px",
      }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        label="Search Company Name"
        size="small"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        sx={{
          "& label": {
            fontSize: "13px",
          },
        }}
      />
    </Stack>
  );
};

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";
import JobCard from "./JobCard";
import { addJobs } from "../reduxSlices/jobsSlice";
import axios from "axios";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { addFilterOptions } from "../reduxSlices/filterOptionsSlice";
import { updateFilteredJobs } from "../reduxSlices/filteredJobsSlice";
import CustomTypography from "./utilityComponents/CustomTypography";

const JobListing = () => {
  const [jobData, setJobData] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);
  const [errorState, setErrorState] = useState(false);

  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);
  const selectedFilters = useSelector((state) => state.selectedFilters);
  const filteredJobs = useSelector((state) => state.filteredJobs);

  const fetchData = async () => {
    setLoading(true);
    const body = {
      limit: 10,
      offset: offset,
    };
    await axios
      .post("https://api.weekday.technology/adhoc/getSampleJdJSON", body)
      .then((response) => {
        setTotalJobs(response.data.totalCount);
        setOffset(offset + 10);
        dispatch(addJobs(response.data.jdList));
        dispatch(addFilterOptions(response.data.jdList));

        // if there is any filter selected already and the user reaches end of the page resulting
        // in more jobs LocalAtmRounded, in that case the new jobs will be filtered out before rendering
        // (jobs will be filtered out according to the applied filters)
        if (selectedFilters.isFilterSelected) {
          dispatch(updateFilteredJobs({ jobsToFilter: jobs, selectedFilters }));
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorState(true);
      })
      .finally(() => {
        setLoading(false);
        setFirstLoad(true);
      });
  };

  useEffect(() => {}, [jobs]);

  useEffect(() => {
    setJobData(filteredJobs && filteredJobs.length > 0 ? filteredJobs : jobs);
  }, [jobs.length, filteredJobs]);

  //I made a custom hook to implement infinite scroll functionality
  useInfiniteScroll(fetchData);

  useEffect(() => {
    if (!firstLoad) {
      fetchData();
      setFirstLoad(true);
    }
  }, []);

  return (
    <>
      <Grid
        container
        direction="row"
        style={{ height: "100%", marginTop: 0 }}
        spacing={3}
      >
        {/* Error Handling */}
        {errorState && (
          <CustomTypography
            variant="h1"
            color="TextError"
            sx={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Error in loading Jobs. Please refresh the page...
          </CustomTypography>
        )}

        {/* Rendering Jobs */}
        {!errorState &&
          jobData &&
          jobData.slice(0, totalJobs).map((job, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <JobCard {...job} />
            </Grid>
          ))}

        {/* Loader rendering */}
        {loading && (
          <Grid item xs={120} style={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default React.memo(JobListing);

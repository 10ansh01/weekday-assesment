import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";
import { addJobs } from "../reduxSlices/jobsSlice";
import axios from "axios";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { addFilterOptions } from "../reduxSlices/filterOptionsSlice";
import { updateFilteredJobs } from "../reduxSlices/filteredJobsSlice";
import CustomTypography from "./utilityComponents/CustomTypography";

const JobCard = lazy(() => import("./JobCard"));

const JobListing = () => {
  const [jobData, setJobData] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [
    noJobWithCurrentFilterCombination,
    setNoJobWithCurrentFilterCombination,
  ] = useState(false);

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
        // if there is any filter selected already and the user reaches end of the page resulting
        // in more jobs LocalAtmRounded, in that case the new jobs will be filtered out before rendering
        // (jobs will be filtered out according to the applied filters)
        for (const filterType in selectedFilters) {
          if (
            selectedFilters[filterType] &&
            selectedFilters[filterType].length > 0
          ) {
            dispatch(
              updateFilteredJobs({
                jobsToFilter: jobs,
                selectedFilters,
                keyToFilter: filterType,
              })
            );
          }
        }
        dispatch(addFilterOptions(response.data.jdList));
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

  useEffect(() => {
    if (
      selectedFilters.isFilterSelected &&
      filteredJobs &&
      filteredJobs.length === 0
    ) {
      setNoJobWithCurrentFilterCombination(true);
    } else {
      setJobData(filteredJobs && filteredJobs.length > 0 ? filteredJobs : jobs);
      setNoJobWithCurrentFilterCombination(false);
    }
  }, [jobs.length, filteredJobs]);

  //I made a custom hook to implement infinite scroll functionality
  useInfiniteScroll(fetchData, offset);

  useEffect(() => {
    if (!firstLoad) {
      fetchData();
      setFirstLoad(true);
    }
  }, []);

  // if no jobs are there with current filter noJobWithCurrentFilterCombination, return
  // eg. Location is bangalore and job role is remote:
  // If there is no remote job in bangalore, it will return
  if (!errorState && noJobWithCurrentFilterCombination) {
    return (
      <>
        <Grid
          container
          direction="row"
          style={{ height: "100%", marginTop: 0 }}
          spacing={3}
        >
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
            No Jobs for this filter combination. Please refresh or change
            filters.
          </CustomTypography>
        </Grid>
      </>
    );
  }

  // Handling error from API
  if (errorState) {
    return (
      <>
        <Grid
          container
          direction="row"
          style={{ height: "100%", marginTop: 0 }}
          spacing={3}
        >
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
            OOPS! There was an error. Please referesh the page.
          </CustomTypography>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid
        container
        direction="row"
        style={{ height: "100%", marginTop: 0 }}
        spacing={3}
      >
        {/* Rendering Jobs */}
        {!errorState &&
          jobData &&
          jobData.slice(0, totalJobs).map((job, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Suspense fallback={<CircularProgress />}>
                <JobCard {...job} />
              </Suspense>
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

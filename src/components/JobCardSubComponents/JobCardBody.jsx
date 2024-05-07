import React from "react";
import { Grid, Box } from "@mui/material";
import CustomTypography from "../utilityComponents/CustomTypography";
import "../../styles/JobListing.css";

export const JobCardBody = (props) => {
  return (
    <>
      <Grid container direction="column" class="JobCardBody">
        <Grid item mb={1}>
          <CustomTypography variant="h1"> About company:</CustomTypography>
        </Grid>
        <Grid item>
          <Box>
            <CustomTypography>About us:</CustomTypography>
          </Box>
          <Box className="JobCardBody-description" component="div">
            {props.jobDetailsFromCompany}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

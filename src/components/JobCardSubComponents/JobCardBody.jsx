import React from "react";
import { Grid, Box } from "@mui/material";
import CustomTypography from "../utilityComponents/CustomTypography";
import "../../styles/JobListing.css";

export const JobCardBody = (props) => {
  return (
    <>
      <Grid container direction="column" class="JobCardBody">
        <Grid item mt={1}>
          <CustomTypography variant="h1" color="#000000DE" fontSize="16px">
            {" "}
            About company:
          </CustomTypography>
        </Grid>
        <Grid item>
          <Box>
            <CustomTypography color="#000000DE" fontSize="14px">
              About us:
            </CustomTypography>
          </Box>
          <Box
            className="JobCardBody-description"
            component="div"
            color="#000000DE"
            fontSize="14px"
          >
            {props.jobDetailsFromCompany}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

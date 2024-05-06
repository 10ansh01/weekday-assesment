import React from "react";
import { Grid, Box } from "@mui/material";
import CustomTypography from "../utilityComponents/CustomTypography";
import JobCardImage from "../utilityComponents/CustomAvatar";

export const JobCardHead = (props) => {
  return (
    <>
      <Grid container direction="row">
        <Box component="div">
          <CustomTypography
            variant="body1"
            textAlign="center"
            fontSize="9px"
            color="textSecondary"
            border="1px solid rgb(230, 230, 230)"
            borderRadius="10px"
            padding="4px 6px"
            shadow="rgba(6, 6, 6, 0.05) 0px 2px 6px 0px"
          >
            {"\u23F3"} Posted 11 days ago
          </CustomTypography>
        </Box>
      </Grid>
      <Grid container direction="row" mt={2} spacing={1}>
        <Grid item>
          <Box>
            <JobCardImage
              src={props.logoUrl}
              alt={props.companyName}
              variant="square"
            />
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <CustomTypography
              variant="h3"
              fontSize="13px"
              color="textSecondary"
              align="left"
            >
              {props.companyName}
            </CustomTypography>
            <CustomTypography
              variant="h3"
              fontSize="13px"
              color="textSecondary"
            >
              {props.jobRole}
            </CustomTypography>
          </Box>
          <Box component="div">
            <CustomTypography
              variant="h3"
              fontSize="13px"
              color="textSecondary"
            >
              {props.location}
            </CustomTypography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

import React from "react";
import { Grid } from "@mui/material";
import CustomTypography from "../utilityComponents/CustomTypography";
import CustomButton from "../utilityComponents/CustomButton";
import JobCardImage from "../utilityComponents/CustomAvatar";
import "../../styles/JobListing.css";

export const JobCardFoot = (props) => {
  return (
    <>
      <Grid container direction="column">
        <Grid item mb={1} sx={{ minHeight: "30px" }}>
          {props.minExp && (
            <>
              <CustomTypography variant="h1">
                {" "}
                Minimum experience
              </CustomTypography>
              <CustomTypography variant="h1" color="textPrimary">
                {props.minExp} years
              </CustomTypography>
            </>
          )}
        </Grid>

        <Grid container spacing={1} direction="column">
          <Grid item>
            <CustomButton
              variant="contained"
              fontWeight={500}
              backgroundcolor="#55EFC4"
              fullWidth
            >
              {"\u26A1"} Easy Apply
            </CustomButton>
          </Grid>
          <Grid item>
            <CustomButton
              variant="contained"
              backgroundcolor="#4943DA"
              color="secondary"
              sx={{
                display: "felx",
                gap: "4px",
              }}
              fullWidth
            >
              {/* The images rendering below are static. I know its not a best 
              practice. But it is there for just represntational purposes.*/}
              <JobCardImage
                src="https://atlantabuilding.com.au/wp-content/uploads/2017/03/dummy-face.jpg"
                alt="ansh"
                height="24px"
                variant="circle"
                blur={1.5}
              />
              <JobCardImage
                src="https://atlantabuilding.com.au/wp-content/uploads/2017/03/dummy-face.jpg"
                alt="ansh"
                height="24px"
                variant="circle"
                blur={1.5}
              />
              <p>Unlock referral asks</p>
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

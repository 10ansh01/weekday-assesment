import React from "react";
import CustomTypography from "./utilityComponents/CustomTypography";
import { styled } from "@mui/material/styles";
import { Link, Box } from "@mui/material";
import { Paper } from "@mui/material";
import { JobCardHead } from "./JobCardSubComponents/JobCardHead";
import { JobCardBody } from "./JobCardSubComponents/JobCardBody";
import { JobCardFoot } from "./JobCardSubComponents/JobCardFoot";
import { getCurrencySymbol } from "../utils/get-currency-symbol";

const JobCardView = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
  borderRadius: "20px",
}));

const JobCard = (props) => {
  const currency = getCurrencySymbol(props.salaryCurrencyCode);

  return (
    <JobCardView className="JobCard" square={false} elevation={1}>
      <JobCardHead {...props} />
      <CustomTypography
        variant="body1"
        sx={{ minHeight: "20px", fontWeight: 200, marginTop: "5px" }}
      >
        Estimated Salary :{" "}
        {props.minJdSalary && currency + props.minJdSalary + "K" + " - "}
        {props.maxJdSalary && currency + props.maxJdSalary}K {"\u2705"}
      </CustomTypography>
      <JobCardBody {...props} />
      <Box class="JobCard-ShowMoreText">
        <Link underline="none" href="https://weekday.works">
          View Job
        </Link>
      </Box>
      <JobCardFoot {...props} />
    </JobCardView>
  );
};

export default React.memo(JobCard);

import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export const CompanyNameFilter = () => {
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
        sx={{
          "& label": {
            fontSize: "13px",
          },
        }}
      />
    </Stack>
  );
};

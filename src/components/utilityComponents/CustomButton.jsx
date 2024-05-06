import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)(
  ({
    fontSize,
    fontWeight,
    backgroundcolor,
    color,
    borderRadius,
    padding,
  }) => ({
    fontSize: fontSize || "16px",
    backgroundColor: backgroundcolor,
    color: color || "#000",
    borderRadius: borderRadius || "8px",
    padding: padding || "8px 18px",
    textTransform: "none",
    "&.MuiButton-root": {
      fontWeight: fontWeight || 400,
      "&:hover": {
        backgroundColor: backgroundcolor, // Change background color on hover
      },
    },
  })
);

export default CustomButton;

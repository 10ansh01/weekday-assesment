import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const CustomTypography = styled(Typography)(
  ({
    textAlign,
    fontSize,
    color,
    border,
    borderRadius,
    padding,
    shadow,
    margin,
  }) => ({
    textAlign: textAlign || "left",
    fontSize: fontSize || "14px",
    color: color || "rgba(0, 0, 0, 0.54)",
    border: border || "none",
    borderRadius: borderRadius || 0,
    padding: padding || "0",
    boxShadow: shadow || "none",
    margin: margin || 0,
    textTransform: "capitalize",
  })
);

export default CustomTypography;

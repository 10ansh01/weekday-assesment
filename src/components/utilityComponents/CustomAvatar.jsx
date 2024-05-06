import React from "react";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

const SquareAvatar = styled(Avatar)(({ theme, width, height, blur }) => ({
  width: width || "25px",
  height: height || "",
  filter: blur ? `blur(${blur}px)` : "none",
}));

const JobCardImage = ({ src, alt, width, height, variant, blur }) => {
  return (
    <SquareAvatar
      src={src}
      alt={alt}
      variant={variant}
      blur={blur}
      width={width}
      height={height}
    />
  );
};
export default JobCardImage;

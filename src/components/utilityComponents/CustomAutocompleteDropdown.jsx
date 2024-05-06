import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "&:before": {
    content: "''",
    position: "absolute",
    right: 34,
    top: 5,
    height: "75%",
    width: 2,
    background: "rgb(204,204,204)",
  },
}));

export const CustomAutocompleteDropdown = ({
  options,
  getOptionLabel,
  defaultValue,
  onChange,
  placeholder,
  minWidth,
  multiple = true,
  renderTags,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(defaultValue || []);

  const handleFilterChange = (event, newValue) => {
    setSelectedOptions(newValue);
    onChange(newValue);
  };

  return (
    <Autocomplete
      sx={{ minWidth: minWidth }}
      multiple={multiple}
      size="small"
      options={options}
      getOptionLabel={getOptionLabel}
      defaultValue={defaultValue}
      onChange={handleFilterChange}
      renderTags={renderTags}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            sx: { fontSize: "13px", height: "40px" },
          }}
        />
      )}
    />
  );
};

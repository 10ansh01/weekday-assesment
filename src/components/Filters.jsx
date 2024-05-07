import { Grid } from "@mui/material";
import { MaxExperienceFilter } from "./Filters/MaxExperienceFilter";
import { RolesFilter } from "./Filters/RolesFilter";
import { CompanyNameFilter } from "./Filters/CompanyNameFilter";
import { LocationFilter } from "./Filters/LocationFilter";
import { WorkModeFilter } from "./Filters/WorkModeFilter";
import { MinBasePayFilter } from "./Filters/MinBasePay";

export const Filters = () => {
  return (
    <Grid container direction="row" spacing={1}>
      <Grid item>
        <RolesFilter />
      </Grid>
      <Grid item>
        <MaxExperienceFilter />
      </Grid>
      <Grid item>
        <WorkModeFilter />
      </Grid>
      <Grid item>
        <MinBasePayFilter />
      </Grid>
      <Grid item>
        <LocationFilter />
      </Grid>
      <Grid item>
        <CompanyNameFilter />
      </Grid>
    </Grid>
  );
};

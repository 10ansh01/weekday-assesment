import { Container } from "@mui/material";
import JobListing from "./components/JobListing";
import { Filters } from "./components/Filters";

export const App = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: "30px" }}>
      <Filters />
      <JobListing />
    </Container>
  );
};

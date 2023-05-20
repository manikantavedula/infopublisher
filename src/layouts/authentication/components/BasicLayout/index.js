// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication pages components
// import Footer from "layouts/authentication/components/Footer";

function BasicLayout({ children }) {
  return (
    <PageLayout>
      <Grid display="flex" width="100%" height="100vh" mx="auto">
        <Grid item xs={6}>
          <Grid>Hello</Grid>
        </Grid>

        <Grid
          item
          xs={6}
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
          sx={{ background: "#d6e2ea" }}
        >
          {children}
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default BasicLayout;

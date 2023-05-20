/* eslint-disable no-unused-vars */
import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import LoginFormComponent from "./LoginFormComponent";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <LoginFormComponent />

      <MDBox mt={3} mb={1} textAlign="center">
        <MDTypography variant="button" color="text">
          Don&apos;t have an account?{" "}
          <MDTypography
            component={Link}
            to="/authentication/sign-up"
            variant="button"
            color="info"
            fontWeight="medium"
            textGradient
          >
            Sign up
          </MDTypography>
        </MDTypography>
      </MDBox>
    </BasicLayout>
  );
}

export default Basic;

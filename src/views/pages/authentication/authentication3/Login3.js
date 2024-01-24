import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import AuthWrapper1 from "../AuthWrapper1";
import AuthCardWrapper from "../AuthCardWrapper";
import AuthLogin from "../auth-forms/AuthLogin";
import Logo from "ui-component/Logo";
import AuthFooter from "ui-component/cards/AuthFooter";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useLayoutEffect } from "react";
import { RefreshToken } from "layouts/callback";
import { useDispatch } from "react-redux";
import { commonActions } from "slices/common";
import { getLocalItems } from "layouts/callback";
import { loginCheck } from "layouts/callback";
import { removeLocalItems } from "layouts/callback";
import { getRemovedLocalItemsStatus } from "layouts/callback";

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = (bool) => {
    setIsLoading((prevLoad) => !prevLoad);
  };

  useLayoutEffect(() => {
    setIsLoading(true);

    dispatch(commonActions.getUserRole());
  }, []);

  useEffect(() => {
    console.log(getLocalItems());
    const storedAccessRole = localStorage.getItem("access_role");

    if (storedAccessRole) {
      setIsLoading(false);
      if (storedAccessRole === "admin") {
        navigate("/dashboard/default");
      } else {
        navigate("/learn/onlineclasses");
      }
    } else {
      setIsLoading(false);
      navigate("/");
    }
  }, []);

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <AuthWrapper1>
        <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: "100vh" }}>
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: "calc(100vh - 68px)" }}
            >
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item sx={{ mb: 3 }}>
                      <Link to="#">
                        <Logo />
                      </Link>
                    </Grid>

                    <Grid item xs={12}>
                      <AuthLogin isLoading={isLoading} handleLoading={handleLoading} />
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AuthWrapper1>
    </>
  );
};

export default Login;

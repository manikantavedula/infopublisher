import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";

// project imports
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

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    setIsLoading(true);

    dispatch(commonActions.getUserRole());
  }, []);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("access_token");
    const storedRefreshToken = localStorage.getItem("refresh_token");
    const storedUserInfoResponse = localStorage.getItem("userinfo_response");
    const expirationTimestamp = localStorage.getItem("expiration_timestamp");

    console.log(expirationTimestamp && Date.now() > expirationTimestamp && storedRefreshToken);

    if (
      storedAccessToken &&
      storedRefreshToken &&
      expirationTimestamp &&
      storedUserInfoResponse &&
      Date.now() < expirationTimestamp
    ) {
      setIsLoading(false);
      navigate("/dashboard/default");
    } else if (expirationTimestamp && Date.now() > expirationTimestamp && storedRefreshToken) {
      console.log("refresh token for login auth");
      let status;

      (async () => {
        status = await RefreshToken();

        await dispatch(commonActions.storeTokens());

        await console.log("refresh token status", status);

        if (status === "error") {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("expiration_timestamp");
          localStorage.removeItem("userinfo_response");

          const storedAccessToken = localStorage.getItem("access_token");
          const storedRefreshToken = localStorage.getItem("refresh_token");
          const expirationTimestamp = localStorage.getItem("expiration_timestamp");
          const userInfoResponse = localStorage.getItem("userinfo_response");

          if (
            !storedAccessToken ||
            !storedRefreshToken ||
            !expirationTimestamp ||
            !userInfoResponse ||
            !(Date.now() < expirationTimestamp)
          ) {
            navigate("/");
          }
        }

        setIsLoading(false);
      })();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {!isLoading && (
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
                      {/* <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? "h3" : "h2"}
                          >
                            Hi, Welcome Back
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            textAlign={matchDownSM ? "center" : "inherit"}
                          >
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid> */}
                      <Grid item xs={12}>
                        <AuthLogin />
                      </Grid>
                      {/* <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography
                        component={Link}
                        to="/pages/register/register3"
                        variant="subtitle1"
                        sx={{ textDecoration: "none" }}
                      >
                        Don&apos;t have an account?
                      </Typography>
                    </Grid>
                  </Grid> */}
                    </Grid>
                  </AuthCardWrapper>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid> */}
          </Grid>
        </AuthWrapper1>
      )}
    </>
  );
};

export default Login;

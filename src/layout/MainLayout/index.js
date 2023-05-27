import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { commonActions } from "slices/common";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from "@mui/material";

// project imports
import PerfectScrollbar from "react-perfect-scrollbar";
import Breadcrumbs from "ui-component/extended/Breadcrumbs";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Customization from "../Customization";
import navigation from "menu-items";
import { drawerWidth } from "store/constant";
import { SET_MENU } from "store/actions";

// assets
import { IconChevronRight } from "@tabler/icons";
import { RefreshToken } from "layouts/callback";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// styles
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("md")]: {
        marginLeft: -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
        marginRight: "10px",
      },
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
      },
    }),
  })
);

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  // Handle left drawer
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("access_token");
    const storedRefreshToken = localStorage.getItem("refresh_token");
    const storedUserInfoResponse = localStorage.getItem("userinfo_response");
    const expirationTimestamp = localStorage.getItem("expiration_timestamp");

    dispatch(commonActions.getUserRole());

    if (
      storedAccessToken &&
      storedRefreshToken &&
      expirationTimestamp &&
      storedUserInfoResponse &&
      Date.now() < expirationTimestamp
    ) {
      console.log("Auth is working fine.");
    } else if (expirationTimestamp && Date.now() > expirationTimestamp && storedRefreshToken) {
      console.log("refresh token for main layout");
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
      })();
    } else {
      navigate("/");
    }
  }, []);

  const userRole = useSelector((state) => state.common.role);

  useEffect(() => {
    console.log(userRole);

    if (userRole && userRole.role !== "none" && userRole?.message !== "role verified") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("expiration_timestamp");
      localStorage.removeItem("userinfo_response");
      localStorage.removeItem("role");

      const storedAccessToken = localStorage.getItem("access_token");
      const storedRefreshToken = localStorage.getItem("refresh_token");
      const expirationTimestamp = localStorage.getItem("expiration_timestamp");
      const userInfoResponse = localStorage.getItem("userinfo_response");
      const role = localStorage.getItem("role");

      if (
        !storedAccessToken ||
        !storedRefreshToken ||
        !expirationTimestamp ||
        !userInfoResponse ||
        !role ||
        !(Date.now() < expirationTimestamp)
      ) {
        navigate("/");
      }
    }
  }, [userRole]);

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* header */}
        <AppBar
          enableColorOnDark
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{
            bgcolor: theme.palette.background.default,
            transition: leftDrawerOpened ? theme.transitions.create("width") : "none",
          }}
        >
          <Toolbar>
            <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
          </Toolbar>
        </AppBar>

        {/* drawer */}
        <Sidebar
          drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
          drawerToggle={handleLeftDrawerToggle}
        />

        {/* main content */}
        <Main theme={theme} open={leftDrawerOpened}>
          {/* breadcrumb */}
          <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
          {/* <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 88px)",
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingBottom: "40px",
          }}
        > */}
          <Outlet />
          {/* </PerfectScrollbar> */}
        </Main>
        <Customization />
      </Box>
    </>
  );
};

export default MainLayout;

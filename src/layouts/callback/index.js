// Import required dependencies
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { useTheme } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { commonActions } from "slices/common";
import { useLayoutEffect } from "react";

export const getLocalItems = () => {
  const storedAccessToken = localStorage.getItem("access_token");
  const storedRefreshToken = localStorage.getItem("refresh_token");
  const storedUserInfoResponse = localStorage.getItem("userinfo_response");
  const expirationTimestamp = localStorage.getItem("expiration_timestamp");

  return { storedAccessToken, storedRefreshToken, storedUserInfoResponse, expirationTimestamp };
};

export const removeLocalItems = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expiration_timestamp");
  localStorage.removeItem("userinfo_response");
  localStorage.removeItem("role");
  localStorage.removeItem("email_check");
};

export const getRemovedLocalItemsStatus = () => {
  const { storedAccessToken, storedRefreshToken, storedUserInfoResponse, expirationTimestamp } =
    getLocalItems();

  if (
    !storedAccessToken ||
    !storedRefreshToken ||
    !expirationTimestamp ||
    !storedUserInfoResponse ||
    !(Date.now() < expirationTimestamp)
  ) {
    return true;
  }
};

export const loginCheck = () => {
  const { storedAccessToken, storedRefreshToken, storedUserInfoResponse, expirationTimestamp } =
    getLocalItems();

  if (
    storedAccessToken &&
    storedRefreshToken &&
    expirationTimestamp &&
    storedUserInfoResponse &&
    Date.now() < expirationTimestamp
  ) {
    return true;
  } else if (expirationTimestamp && Date.now() > expirationTimestamp && storedRefreshToken) {
    return false;
  }
};

export const loginCheckWithoutUser = () => {
  const { storedAccessToken, storedRefreshToken, expirationTimestamp } = getLocalItems();

  if (
    storedAccessToken &&
    storedRefreshToken &&
    expirationTimestamp &&
    Date.now() < expirationTimestamp
  ) {
    return true;
  } else {
    return false;
  }
};

export const getGoogleUrl = () => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  const options = {
    redirect_uri: process.env.REACT_APP_OAUTH_REDIRECT,
    client_id: process.env.REACT_APP_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "openid",
      "profile",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      // "https://www.googleapis.com/auth/gmail.readonly",
    ].join(" "),
    state: "/login",
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};

export const getUserInfo = async (tokenResponse, handleLoading, handleLogin) => {
  console.log("getUserInfo", tokenResponse);

  let userInfoResponse;

  try {
    console.log(tokenResponse.data);

    const { access_token } = tokenResponse.data;
    console.log(access_token);

    userInfoResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log(tokenResponse, userInfoResponse);

    // const isGmail = response.data.emailAddress.endsWith("@gmail.com"); // return isGmail;
  } catch (error) {
    console.error("Error Getting User Info:", error);
    return false;
  } finally {
    handleLogin(tokenResponse, userInfoResponse);
  }
};

export const getAccessToken = async (code, handleLoading, handleLogin) => {
  console.log("getAccessToken", code);

  let tokenResponse;

  try {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    const redirectUri = process.env.REACT_APP_OAUTH_REDIRECT;

    tokenResponse = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      scope: "https://www.googleapis.com/auth/userinfo.profile",
    });

    const accessToken = tokenResponse.data.access_token;

    console.log(accessToken);

    return accessToken;
  } catch (error) {
    console.error("Error obtaining access token:", error);
    throw error;
  } finally {
    getUserInfo(tokenResponse, handleLoading, handleLogin);
  }
};

export const RefreshToken = async () => {
  const { storedRefreshToken, expirationTimestamp } = getLocalItems();

  console.log(expirationTimestamp && Date.now() < expirationTimestamp);

  if (expirationTimestamp && Date.now() < expirationTimestamp) {
    console.log("access token is not expired");

    return "logout";
  } else {
    try {
      const response = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        refresh_token: storedRefreshToken,
        grant_type: "refresh_token",
      });

      console.log(response.data);

      const { access_token, expires_in } = response.data;

      const expirationTimestamp = Date.now() + expires_in * 1000;

      // Update the stored tokens
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expiration_timestamp", expirationTimestamp);

      console.log("Access Token:", access_token);

      return "refreshed";
    } catch (error) {
      console.log("Error refreshing token:", error);

      return "error";
    }
  }
};

const Callback = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [tokenData, setTokenData] = useState([]);
  const [userData, setUserData] = useState([]);

  const handleLogin = async (tokenResponse, userInfoResponse) => {
    console.log(tokenResponse, userInfoResponse, userInfoResponse?.data.email);

    await localStorage.setItem("email_check", userInfoResponse?.data.email);

    dispatch(commonActions.getEmailCheck());

    setTokenData(tokenResponse);
    setUserData(userInfoResponse);
  };

  const emailCheck = useSelector((state) => state.common.emailCheck);
  const tokens = useSelector((state) => state.common.tokens);

  useEffect(() => {
    console.log(tokens);

    if (tokens && tokens?.message !== "no data") {
      (async () => {
        await console.log("email_check");

        await dispatch(commonActions.getUserRole());

        await navigate("/dashboard/default");
      })();
    } else if (tokens && tokens?.message === "no data") {
      (async () => {
        await console.log("remove everything");

        await removeLocalItems();

        await navigate("/");
      })();
    }
  }, [tokens]);

  useEffect(() => {
    console.log(emailCheck);

    if (emailCheck && emailCheck?.message === "success") {
      console.log("Token Data:", tokenData);

      const { access_token, refresh_token, expires_in } = tokenData.data;

      const expirationTimestamp = Date.now() + expires_in * 1000;

      localStorage.setItem("expiration_timestamp", expirationTimestamp);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("userinfo_response", JSON.stringify(userData));
      localStorage.setItem("role", emailCheck?.role);

      const {
        storedAccessToken: acc,
        storedRefreshToken: ref,
        storedUserInfoResponse: usr,
        expirationTimestamp: exp,
      } = getLocalItems();

      if (exp && acc && ref && usr) {
        (async () => {
          await dispatch(commonActions.storeTokens());
        })();
      }
    } else if (emailCheck && emailCheck?.message === "no data") {
      console.log("No Profile Available");
      navigate("/");
    }
  }, [emailCheck]);

  const handleLoading = (bool) => {
    setIsLoading(bool);
  };

  useEffect(() => {
    setIsLoading(true);

    if (loginCheckWithoutUser()) {
      setIsLoading(false);
      handleLogin();
    } else {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get("code");

      console.log("code", code);

      const params = {};
      for (let [key, value] of urlParams.entries()) {
        params[key] = value;
      }

      console.log(urlParams, params, code);

      if (code) {
        getAccessToken(code, handleLoading, handleLogin);
      }
    }
  }, [location.search]);

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div
        style={{
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1>Please Wait For Some Time</h1>
        <p>Processing authorization</p>
      </div>
    </>
  );
};

export default Callback;

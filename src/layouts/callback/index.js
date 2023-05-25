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
    console.error("Error checking Gmail address:", error);
    return false;
  } finally {
    handleLogin(tokenResponse, userInfoResponse);
  }
};

export const getAccessToken = async (code, handleLoading, handleLogin) => {
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

export const refreshToken = async () => {
  try {
    const expirationTimestamp = localStorage.getItem("expiration_timestamp");

    if (expirationTimestamp && Date.now() < expirationTimestamp) {
      console.log("access token is not expired");
    } else {
      const storedRefreshToken = localStorage.getItem("refresh_token");
      const response = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        refresh_token: storedRefreshToken,
        grant_type: "refresh_token",
      });

      const { access_token } = response.data;

      // Update the stored tokens
      localStorage.setItem("access_token", access_token);

      console.log("Access Token:", access_token);
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
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
    console.log(tokenResponse, userInfoResponse, userInfoResponse.data.email);

    await localStorage.setItem("email_check", userInfoResponse.data.email);

    dispatch(commonActions.getEmailCheck());

    setTokenData(tokenResponse);
    setUserData(userInfoResponse);
  };

  const emailCheck = useSelector((state) => state.common.emailCheck);

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

      const exp = localStorage.getItem("expiration_timestamp");
      const acc = localStorage.getItem("access_token");
      const ref = localStorage.getItem("refresh_token");
      const usr = localStorage.getItem("userinfo_response");

      if (exp && acc && ref && usr) {
        localStorage.removeItem("email_check");
        navigate("/dashboard/default");
      }
    } else if (emailCheck && emailCheck?.message === "no data") {
      localStorage.removeItem("email_check");
      console.log("No Profile Available");
      navigate("/");
    }
  }, [emailCheck]);

  const handleLoading = (bool) => {
    setIsLoading(bool);
  };

  useEffect(() => {
    setIsLoading(true);
    const storedAccessToken = localStorage.getItem("access_token");
    const storedRefreshToken = localStorage.getItem("refresh_token");
    const expirationTimestamp = localStorage.getItem("expiration_timestamp");

    if (
      storedAccessToken &&
      storedRefreshToken &&
      expirationTimestamp &&
      Date.now() < expirationTimestamp
    ) {
      setIsLoading(false);
      handleLogin();
    } else {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get("code");

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

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import AuthEnterOTP from "./AuthEnterOTP";
import AuthGetOTP from "./AuthGetOTP";
import { Grid } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

function generateSecretKey() {
  return CryptoJS.lib.WordArray.random(32).toString();
}

const validationSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "Mobile number is not valid")
    .required("Mobile number is required"),
});

const validationSchemaOTP = Yup.object().shape({
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "Mobile number is not valid")
    .required("Mobile number is required"),
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be a 6-digit number")
    .required("OTP is required"),
});

const AuthLogin = React.memo(({ isLoading, handleLoading, ...others }) => {
  const [secretKey, setSecretKey] = useState(() => {
    return generateSecretKey();
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOTP, setIsOTP] = useState(false);

  const [initialValues, setInitialValues] = useState({
    mobileNumber: "",
    otp: "",
  });

  useEffect(() => {
    console.log(isOTP);
  }, [isOTP]);

  const handleInitialValues = (values) => {
    setInitialValues((prev) => values);
  };

  const handleIsOTP = (bool) => {
    console.log(bool);
    setIsOTP(bool);
  };

  return (
    <Grid container direction="column" justifyContent="center" spacing={2}>
      <Grid item xs={12} margin={"auto"}>
        {isOTP ? (
          <AuthEnterOTP
            initialValues={initialValues}
            validationSchemaOTP={validationSchemaOTP}
            handleLoading={handleLoading}
            dispatch={dispatch}
            secretKey={secretKey}
            navigate={navigate}
          />
        ) : (
          <AuthGetOTP
            initialValues={initialValues}
            handleInitialValues={handleInitialValues}
            validationSchema={validationSchema}
            handleLoading={handleLoading}
            handleIsOTP={handleIsOTP}
          />
        )}
      </Grid>
    </Grid>
  );
});

export default AuthLogin;

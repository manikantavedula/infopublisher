import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { commonActions } from "slices/common";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

// project imports
import useScriptRef from "hooks/useScriptRef";
import AnimateButton from "ui-component/extended/AnimateButton";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Google from "assets/images/icons/social-google.svg";
import styles from "./googleButton.module.css";

import { getGoogleUrl } from "layouts/callback";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import CryptoJS from "crypto-js";
// ============================|| FIREBASE - LOGIN ||============================ //

function generateSecretKey() {
  // Generate a random secret key
  return CryptoJS.lib.WordArray.random(32).toString();
}

function encryptObject(object, secretKey) {
  // Encrypt the object using AES
  const plaintext = JSON.stringify(object);
  const ciphertext = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
  return ciphertext;
}

function decryptObject(ciphertext, secretKey) {
  // Decrypt the object using AES
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(plaintext);
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

const FirebaseLogin = React.memo(
  ({
    isLoading,
    handleLoading,
    isOTP,
    handleIsOTP,
    initialValues,
    handleInitialValues,
    ...others
  }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch();

    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
    const customization = useSelector((state) => state.customization);
    const [checked, setChecked] = useState(true);

    const [showPassword, setShowPassword] = useState(false);
    const [mobileNumber, setMobileNumber] = useState("");

    const [secretKey, setSecretKey] = useState(generateSecretKey());

    const googleHandler = async () => {
      console.error("Login");
    };

    const handleIsOTPHere = useCallback((bool) => {
      handleIsOTP(bool);
    }, []);

    useEffect(() => {
      console.log(isOTP);
    }, [isOTP]);

    const handleMobileOTP = useCallback((values) => {
      handleInitialValues(values);
      console.log("handle login OTP values", values);
      handleLoading(true);

      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      let response;

      fetch(
        `https://2factor.in/API/V1/e6d1f0ea-fa33-11ed-addf-0200cd936042/SMS/+91${values.mobileNumber}/AUTOGEN2/INFOPU`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => JSON.parse(result))
        .then((results) => {
          console.log(results);

          if (results["Status"] === "Success") {
            handleLoading(false);
            handleIsOTPHere(true);
            console.warn("Success True");
            // try {
            //   response = axios.post(
            //     `${process.env.REACT_APP_API_URL}/common/api/otp-login`,
            //     {
            //       ...results,
            //       ...values,
            //     },
            //     {
            //       headers: {
            //         "Content-Type": "application/json",
            //         "Access-Control-Allow-Origin": "https://app.infopublisher.in", //https://app.infopublisher.in
            //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            //         "Access-Control-Allow-Headers":
            //           "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type",
            //         "Access-Control-Allow-Credentials": "true",
            //       },
            //     }
            //   );
            // } catch (error) {
            //   handleLoading(false);
            //   console.error(error);
            // }
            // return response;
          } else {
            console.error("login failed");
            handleLoading(false);
          }
        })
        // .then((response) => {
        //   console.log(response.data.message);

        //   if (response.data.message === "success") {
        //     handleIsOTP(true);
        //     console.warn("Success True");
        //   }

        //   handleLoading(false);
        // })
        .catch((error) => console.log("error", error));
    }, []);

    const handleMobileOTPVerification = useCallback(async (values) => {
      console.log(values);

      console.log("handle login OTP values", values);
      handleLoading(true);

      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      let response1, success;

      fetch(
        `https://2factor.in/API/V1/e6d1f0ea-fa33-11ed-addf-0200cd936042/SMS/VERIFY3/+91${values.mobileNumber}/${values.otp}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => JSON.parse(result))
        .then(async (results) => {
          console.log(results);

          if (results["Status"] === "Success") {
            success = true;
            response1 = results;
            dispatch(commonActions.getUserRole());

            if (success === true) {
              try {
                const response = await axios.post(
                  `${process.env.REACT_APP_API_URL}/common/api/getLoginRole`,
                  {
                    ...values,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "Access-Control-Allow-Origin": "https://app.infopublisher.in",
                      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                      "Access-Control-Allow-Headers":
                        "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type",
                      "Access-Control-Allow-Credentials": "true",
                    },
                  }
                );
                console.log(response.data);

                console.log(response1, values);

                let encryptedData;

                if (response.data["role"] === "admin" || response.data["role"] === "school") {
                  encryptedData = await encryptObject(
                    { ...response.data["data"][0], role: response.data["role"] },
                    secretKey
                  );
                } else if (response.data["role"] === "student") {
                  const mergedObject = response.data["data"].reduce((result, item) => {
                    const keys = Object.keys(item);
                    keys.forEach((key) => {
                      if (!result[key]) {
                        result[key] = new Set();
                      }
                      result[key].add(item[key]);
                    });
                    return result;
                  }, {});

                  // Convert sets back to arrays in the mergedObject
                  Object.keys(mergedObject).forEach((key) => {
                    mergedObject[key] = Array.from(mergedObject[key]);
                  });

                  console.log(mergedObject);

                  encryptedData = await encryptObject(
                    { ...mergedObject, role: response.data["role"] },
                    secretKey
                  );
                }

                await localStorage.setItem("role", response.data["role"]);
                await localStorage.setItem("access_role", response.data["role"]);
                await localStorage.setItem("access_role_data", encryptedData);
                await localStorage.setItem("key_for_access", secretKey);
                await dispatch(commonActions.setUserRole());

                if (response.data["role"] === "admin") {
                  navigate("/dashboard/default");
                } else {
                  navigate("/learn/onlineclasses");
                }

                handleLoading(false);
              } catch (error) {
                handleLoading(false);
                console.error(error);
              }
            }
          } else {
            console.error("login failed");
            success = false;
            handleLoading(false);
          }
        })
        .catch((error) => console.log("error", error));
    }, []);

    return (
      <>
        <Grid container direction="column" justifyContent="center" spacing={2}>
          {/* <Grid item xs={12} margin={"auto"}>
          <a className={styles["google-btn"]} href={getGoogleUrl()}>
            <div className={styles["google-icon-wrapper"]}>
              <img className={styles["google-icon"]} src={Google} alt="Google Icon" />
            </div>
            <span className={styles["btn-text"]}>Sign in with Google</span>
          </a>
        </Grid> */}

          <Grid item xs={12} margin={"auto"}>
            {isOTP ? (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchemaOTP}
                onSubmit={handleMobileOTPVerification}
              >
                {({ values, handleSubmit, handleChange, handleBlur, touched, errors }) => (
                  <Form onSubmit={handleSubmit}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-mobileNumber">
                        Mobile Number
                      </InputLabel>
                      <Field
                        as={OutlinedInput}
                        id="outlined-adornment-mobileNumber"
                        type="tel"
                        value={values.mobileNumber}
                        name="mobileNumber"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Mobile Number"
                        inputProps={{}}
                      />
                      <ErrorMessage
                        name="mobileNumber"
                        component={FormHelperText}
                        error
                        id="standard-weight-helper-text-mobileNumber"
                      />
                    </FormControl>

                    <br />
                    <br />

                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-otp">OTP</InputLabel>
                      <Field
                        as={OutlinedInput}
                        id="outlined-adornment-otp"
                        type="tel"
                        value={values.otp}
                        name="otp"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="OTP"
                        inputProps={{}}
                      />
                      <ErrorMessage
                        name="otp"
                        component={FormHelperText}
                        error
                        id="standard-weight-helper-text-otp"
                      />
                    </FormControl>

                    <Box sx={{ mt: 2 }}>
                      <AnimateButton>
                        <Button
                          disableElevation
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Sign in
                        </Button>
                      </AnimateButton>
                    </Box>
                  </Form>
                )}
              </Formik>
            ) : (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleMobileOTP}
              >
                {({ values, handleSubmit, handleChange, handleBlur, touched, errors }) => (
                  <Form onSubmit={handleSubmit}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-mobileNumber">
                        Mobile Number
                      </InputLabel>
                      <Field
                        as={OutlinedInput}
                        id="outlined-adornment-mobileNumber"
                        type="tel"
                        value={values.mobileNumber}
                        name="mobileNumber"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Mobile Number"
                        inputProps={{}}
                      />
                      <ErrorMessage
                        name="mobileNumber"
                        component={FormHelperText}
                        error
                        id="standard-weight-helper-text-mobileNumber"
                      />
                    </FormControl>

                    <Box sx={{ mt: 2 }}>
                      <AnimateButton>
                        <Button
                          disableElevation
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                          color="secondary"
                        >
                          Get OTP
                        </Button>
                      </AnimateButton>
                    </Box>
                  </Form>
                )}
              </Formik>
            )}
          </Grid>
        </Grid>
      </>
    );
  }
);

export default FirebaseLogin;

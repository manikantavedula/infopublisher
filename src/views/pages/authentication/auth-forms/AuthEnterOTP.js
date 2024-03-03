import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  useMediaQuery,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AnimateButton from "ui-component/extended/AnimateButton";
import useHandleMobileOTPVerificationMethod from "./useHandleMobileOTPVerificationMethod";

function AuthEnterOTP({
  initialValues,
  validationSchemaOTP,
  handleLoading,
  dispatch,
  secretKey,
  navigate,
}) {
  const { performCheckOTP } = useHandleMobileOTPVerificationMethod(
    handleLoading,
    dispatch,
    secretKey,
    navigate
  );

  const onSubmit = (values) => {
    performCheckOTP(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemaOTP}
      onSubmit={onSubmit}
    >
      {({ values, handleSubmit, handleChange, handleBlur }) => (
        <Form onSubmit={handleSubmit}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-mobileNumber">Mobile Number</InputLabel>
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
  );
}

export default AuthEnterOTP;

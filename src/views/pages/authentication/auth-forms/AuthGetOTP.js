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
import { handleMobileOTPMethod } from "./handleMobileOTPMethod";

function AuthGetOTP({
  initialValues,
  validationSchema,
  handleLoading,
  handleIsOTP,
  handleInitialValues,
}) {
  const onSubmit = (values) => {
    handleMobileOTPMethod(handleInitialValues, values, handleLoading, handleIsOTP);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
  );
}

export default AuthGetOTP;

import { useState, useEffect, useLayoutEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormGroup, IconButton, TextField, Box } from "@mui/material";
// import { styled } from "@mui/material/styles";
import { Close } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { seriesActions } from "slices/series";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  standard: yup.string().required("Standard is required"),
});

export function StandardViewModal({ isOpen, onCloseEmpty, editModalData }) {
  // eslint-disable-next-line camelcase
  const { name } = editModalData;

  const initialValues = { standard: name };

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle className="flex justify-content-between">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box padding="8px">Confirm Delete</Box>

          <IconButton onClick={onCloseEmpty}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {({ values, handleSubmit, errors, touched, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <FormGroup row style={{ display: "flex", flexDirection: "column" }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="standard"
                      label="Standard"
                      variant="outlined"
                      error={touched.standard && Boolean(errors.standard)}
                      helperText={touched.standard && errors.standard}
                      defaultValue={values.standard}
                      disabled
                    />
                  </Grid>
                </Grid>
              </FormGroup>
            </DialogContent>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default StandardViewModal;

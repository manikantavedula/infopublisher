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
  subject: yup.string().required("Subject is required"),
});

export function SubjectDeleteModal({ isOpen, onClose, onCloseEmpty, editModalData }) {
  // eslint-disable-next-line camelcase
  const { name } = editModalData;

  const initialValues = { subject: name };

  const onSubmit = (values) => {
    console.log(values);
    onClose(values);
  };

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
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ values, handleSubmit, errors, touched, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <FormGroup row style={{ display: "flex", flexDirection: "column" }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="subject"
                      label="Subject"
                      variant="outlined"
                      error={touched.subject && Boolean(errors.subject)}
                      helperText={touched.subject && errors.subject}
                      defaultValue={values.subject}
                      disabled
                    />
                  </Grid>
                </Grid>
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Delete
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default SubjectDeleteModal;

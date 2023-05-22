import { useLayoutEffect, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormGroup, IconButton, TextField, Box } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { seriesActions } from "slices/series";
import Grid from "@mui/material/Grid";
import * as yup from "yup";
import Autocomplete from "@mui/material/Autocomplete";

const validationSchema = yup.object().shape({
  onlineClasses: yup.string().required("OnlineClasses is required"),
});

export function OnlineClassesEditModal({ isOpen, onClose, onCloseEmpty, editModalData }) {
  // eslint-disable-next-line camelcase
  const { name } = editModalData;

  const initialValues = { onlineClasses: name };

  useEffect(() => {
    console.log(initialValues);
  }, [initialValues]);

  const onSubmit = (values) => {
    console.log({
      ...values,
    });
    onClose({
      ...values,
    });
  };

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle className="flex justify-content-between">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box padding="8px" fontSize={18}>
            Edit OnlineClasses
          </Box>

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
                      name="onlineClasses"
                      label="OnlineClasses"
                      variant="outlined"
                      error={touched.onlineClasses && Boolean(errors.onlineClasses)}
                      helperText={touched.onlineClasses && errors.onlineClasses}
                      defaultValue={values.onlineClasses}
                      onChange={(event) => {
                        setFieldValue("onlineClasses", event.target.value);
                      }}
                      focused
                    />
                  </Grid>
                </Grid>
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default OnlineClassesEditModal;

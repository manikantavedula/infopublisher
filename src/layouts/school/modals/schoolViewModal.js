import { useLayoutEffect, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
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
  school: yup.string().required("School is required"),
  contact: yup
    .string()
    .matches(/^\d{10}$/, "Phone number is not valid")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  school_series: yup.array().min(1, "Please select at least one option"),
});

export function SchoolViewModal({ isOpen, onCloseEmpty, editModalData }) {
  // eslint-disable-next-line camelcase
  const { name, contact, address, school_series } = editModalData;
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(seriesActions.getAll());
  }, []);

  // const [names, setNames] = useState();

  const series = useSelector((state) => state.series.data);

  useEffect(() => {
    console.log(series);

    // if (series && series !== null && series.length !== 0) {
    //   setNames(series.map((v) => v.name));
    // }
  }, [series]);

  const initialValues = {
    school: name,
    contact,
    address,
    // eslint-disable-next-line camelcase
    school_series,
  };

  useEffect(() => {
    console.log(initialValues);
  }, [initialValues]);

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle className="flex justify-content-between">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box padding="8px">View School</Box>

          <IconButton onClick={onCloseEmpty}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <DialogContent>
              <FormGroup
                row
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="school"
                      label="School"
                      variant="outlined"
                      error={touched.school && Boolean(errors.school)}
                      helperText={touched.school && errors.school}
                      onChange={(event) => {
                        setFieldValue("school", event.target.value);
                      }}
                      defaultValue={values.school}
                      fullWidth
                      disabled
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="contact"
                      label="Contact"
                      variant="outlined"
                      error={touched.contact && Boolean(errors.contact)}
                      helperText={touched.contact && errors.contact}
                      onChange={(event) => {
                        setFieldValue("contact", event.target.value);
                      }}
                      fullWidth
                      inputProps={{
                        maxLength: 10,
                      }}
                      defaultValue={values.contact}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="address"
                      label="Address"
                      multiline
                      rows={6}
                      placeholder="Address"
                      defaultValue={values.address}
                      style={{ width: "100%" }}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                      onChange={(event) => {
                        setFieldValue("address", event.target.value);
                      }}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={6}>
                    {series && series !== null && series.length > 0 && (
                      <Autocomplete
                        multiple
                        id="tags-standard"
                        options={series && series !== null && series.length > 0 && series}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        filterSelectedOptions
                        disabled
                        readOnly
                        // eslint-disable-next-line camelcase
                        defaultValue={[
                          ...series.filter((v) => values.school_series.includes(v.name)),
                        ]}
                        onInputChange={(e, newInputValue) => {
                          const newValue = e.target.value;
                          console.log(newValue, newInputValue);
                          setFieldValue("school_series", newInputValue);
                        }}
                        onChange={(e, newInputValue) => {
                          const newValue = e.target.value;
                          console.log(newValue, newInputValue);
                          setFieldValue("school_series", newInputValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Select Series"
                            placeholder="Series"
                            error={touched.school_series && Boolean(errors.school_series)}
                            helperText={touched.school_series && errors.school_series}
                            disabled
                          />
                        )}
                      />
                    )}
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

export default SchoolViewModal;

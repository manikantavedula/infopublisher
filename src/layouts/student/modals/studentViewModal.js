import { useEffect, useLayoutEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormGroup,
  IconButton,
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { seriesActions } from "slices/series";
import { standardActions } from "slices/standard";
import { Close } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
// import CustomizedHook from "./selectComponent";

import CryptoJS from "crypto-js";

function decryptObject(ciphertext, secretKey) {
  // Decrypt the object using AES
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);

  console.log(plaintext);
  return JSON.parse(plaintext);
}

export function StudentViewModal({ isOpen, onClose, onCloseEmpty, errorContact, editModalData }) {
  const [filteredSeries, setFilteredSeries] = useState([]);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(seriesActions.getAll());
    dispatch(standardActions.getAll());

    console.log(editModalData);
  }, []);

  const series = useSelector((state) => state.series.data);
  const standard = useSelector((state) => state.standard.data);

  const {
    name,
    email,
    contact,
    series: series_name,
    standard: standard_name,
    address,
  } = editModalData;

  let initialValues = {
    name,
    email,
    contact,
    series: series && series.length > 0 && series.filter((v) => v.name === series_name)[0],
    standard:
      standard && standard.length > 0 && standard.filter((v) => v.name === standard_name)[0],
    address,
  };

  console.log(initialValues);

  // const [names, setNames] = useState();

  const key = localStorage.getItem("key_for_access");
  const login_role_data = localStorage.getItem("access_role_data");
  const decryptedObject = decryptObject(login_role_data, key);

  useEffect(() => {
    console.log(filteredSeries);
  }, [filteredSeries]);

  useEffect(() => {
    console.log(series);

    // const inputString = JSON.parse(localStorage.getItem("access_role_data"))["school_series"];
    const inputString = decryptedObject["school_series"];

    const filter = [...new Set(inputString.split(", ").map((v) => Number(v.split("|-|")[0])))];

    setFilteredSeries(series && series.length > 0 && series.filter((v) => filter.includes(v.id)));
  }, [series]);

  useEffect(() => {
    console.log(standard);

    if (series && series.length > 0 && standard && standard.length > 0) {
      initialValues = {
        name,
        email,
        contact,
        series: series.filter((v) => v.name === series_name)[0],
        standard: standard.filter((v) => v.name === standard_name)[0],
        address,
      };
    }
  }, [series, standard]);

  useEffect(() => {
    console.log(errorContact);
  }, [errorContact]);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    series: yup.string().required("Series is required"),
    standard: yup.string().required("Standard is required"),
    contact: yup
      .string()
      .matches(/^\d{10}$/, "Phone number is not valid")
      .test("contact-check", "Contact Already Exists", async function (value) {
        if (value === errorContact) {
          return false;
        }
        return true;
      })
      .required("Phone number is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Invalid Gmail address")
      .required("Email is required"),
    address: yup.string().required("Address is required"),
    series: yup.object().required("Series is required"),
    standard: yup.object().required("Standard is required"),
  });

  const onSubmit = (values) => {
    console.log(values);
    // onClose(values);
  };

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle className="flex justify-content-between">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box padding="8px" fontSize={18}>
            Edit Student
          </Box>

          <IconButton onClick={onCloseEmpty}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      {series &&
        standard &&
        filteredSeries &&
        series.length > 0 &&
        standard.length > 0 &&
        filteredSeries.length > 0 && (
          <Formik initialValues={initialValues} validationSchema={validationSchema}>
            {({ values, errors, touched, setFieldValue }) => (
              <Form
                onSubmit={(v) => {
                  console.log(v);
                  // handleSubmit(v);
                }}
              >
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
                          name="name"
                          label="Name"
                          variant="outlined"
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                          onChange={(event) => {
                            setFieldValue("name", event.target.value);
                          }}
                          fullWidth
                          defaultValue={values.name}
                          disabled
                          readOnly
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          name="email"
                          label="Email"
                          variant="outlined"
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          onChange={(event) => {
                            setFieldValue("email", event.target.value);
                          }}
                          fullWidth
                          defaultValue={values.email}
                          disabled
                          readOnly
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <FormHelperText sx={{ color: "red" }}>
                          {errorContact && "Contact Already Exists"}
                        </FormHelperText>
                        <TextField
                          name="contact"
                          label="Contact"
                          variant="outlined"
                          error={touched.contact && Boolean(errors.contact)}
                          helperText={touched.contact && errors.contact}
                          onChange={(event) => {
                            setFieldValue("contact", event.target.value);
                            console.log(values);
                          }}
                          fullWidth
                          inputProps={{
                            maxLength: 10,
                          }}
                          sx={{
                            marginBottom: "16px",
                          }}
                          defaultValue={values.contact}
                          disabled
                          readOnly
                        />

                        {filteredSeries && filteredSeries !== null && filteredSeries.length > 0 && (
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Series</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-series"
                              label="Series"
                              error={touched.series && Boolean(errors.series)}
                              helperText={touched.series && errors.series}
                              onChange={(event) => {
                                setFieldValue("series", event.target.value);
                              }}
                              sx={{
                                marginBottom: "16px",
                              }}
                              value={filteredSeries.filter((v) => v.name === values.series.name)[0]}
                              disabled
                              readOnly
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {filteredSeries &&
                                filteredSeries.length > 0 &&
                                filteredSeries.map((v) => <MenuItem value={v}>{v.name}</MenuItem>)}
                            </Select>
                            <FormHelperText sx={{ color: "red" }}>
                              {errors.series && touched.series ? errors.series : ""}
                            </FormHelperText>
                          </FormControl>
                        )}

                        {standard && standard !== null && standard.length > 0 && (
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Standard</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-standard"
                              label="Standard"
                              error={touched.standard && Boolean(errors.standard)}
                              helperText={touched.standard && errors.standard}
                              onChange={(event) => {
                                setFieldValue("standard", event.target.value);
                              }}
                              sx={{
                                marginBottom: "16px",
                              }}
                              value={standard.filter((v) => v.name === values.standard.name)[0]}
                              disabled
                              readOnly
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {standard &&
                                standard.length > 0 &&
                                standard.map((v) => <MenuItem value={v}>{v.name}</MenuItem>)}
                            </Select>
                            <FormHelperText sx={{ color: "red" }}>
                              {errors.standard && touched.standard ? errors.standard : ""}
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          name="address"
                          label="Address"
                          multiline
                          rows={6}
                          placeholder="Address"
                          style={{ width: "100%" }}
                          error={touched.address && Boolean(errors.address)}
                          helperText={touched.address && errors.address}
                          onChange={(event) => {
                            setFieldValue("address", event.target.value);
                          }}
                          defaultValue={values.address}
                          disabled
                          readOnly
                        />
                      </Grid>
                    </Grid>
                  </FormGroup>
                </DialogContent>
                {/* <DialogActions>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </DialogActions> */}
              </Form>
            )}
          </Formik>
        )}
    </Dialog>
  );
}

export default StudentViewModal;

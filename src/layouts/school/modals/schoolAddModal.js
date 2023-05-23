import { useState, useEffect, useLayoutEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormGroup, IconButton, TextField, Box, Checkbox, FormControlLabel } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { seriesActions } from "slices/series";
import { schoolActions } from "slices/school";
import { Close } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { Formik, Form } from "formik";
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

export function SchoolAddModal({ isOpen, onClose, onCloseEmpty }) {
  const [checkedItems, setCheckedItems] = useState([]);

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(seriesActions.getAll());
    dispatch(schoolActions.getSchoolSeries());
  }, []);

  const series = useSelector((state) => state.series.data);
  const schoolSeries = useSelector((state) => state.school.dataSchoolSeries);

  useEffect(() => {
    console.log(series, schoolSeries);

    console.log(
      series &&
        series.length > 0 &&
        series.map(
          (v) =>
            schoolSeries &&
            schoolSeries.length > 0 &&
            schoolSeries.filter((w) => w.series === v.name).map((w) => w)
        )
    );
  }, [series, schoolSeries]);

  const initialValues = { school: "", contact: "", address: "", school_series: [] };

  const onSubmit = (values) => {
    console.log(values);
    onClose(values);
  };

  useEffect(() => {
    const newCheckedItems = [];
    series &&
      series.length > 0 &&
      series.forEach((parent) => {
        const children =
          schoolSeries &&
          schoolSeries.length > 0 &&
          schoolSeries.filter((item) => item.series === parent.name).map((item) => item.standard);
        if (
          children &&
          children.length > 0 &&
          children.every((child) => checkedItems.includes(child))
        ) {
          newCheckedItems.push(parent.name);
          newCheckedItems.push(...children);
        }
      });
    setCheckedItems(newCheckedItems);
  }, [series, schoolSeries]);

  const handleParentCheckboxChange = (parent) => {
    let newCheckedItems = [...checkedItems];
    const parentIndex = newCheckedItems.indexOf(parent);

    if (parentIndex === -1) {
      // Parent checkbox was unchecked, so add it and its associated children to checkedItems
      newCheckedItems.push(parent);
      const children = schoolSeries.filter((item) => item.series === parent).map((item) => item);
      console.log(children);
      children.forEach((child) => {
        if (!newCheckedItems.some((item) => item.standard === child.standard)) {
          newCheckedItems.push(child);
        }
      });
    } else {
      // Parent checkbox was checked, so remove it and its associated children from checkedItems
      newCheckedItems.splice(parentIndex, 1);
      const children = schoolSeries.filter((item) => item.series === parent).map((item) => item);
      children.forEach((child) => {
        const childIndex = newCheckedItems.findIndex((item) => item.standard === child.standard);
        if (childIndex !== -1) {
          newCheckedItems.splice(childIndex, 1);
        }
      });
    }

    setCheckedItems(newCheckedItems);
  };

  const handleChildCheckboxChange = (child) => {
    let newCheckedItems = [...checkedItems];
    const childIndex = newCheckedItems.findIndex((item) => item.standard === child.standard);

    if (childIndex === -1) {
      // Child checkbox was unchecked, so add it to checkedItems
      newCheckedItems.push(child);
    } else {
      // Child checkbox was checked, so remove it from checkedItems
      newCheckedItems.splice(childIndex, 1);
    }

    setCheckedItems(newCheckedItems);
  };

  const isParentChecked = (parent) => {
    const children =
      schoolSeries &&
      schoolSeries.length > 0 &&
      schoolSeries.filter((item) => item.series === parent).map((item) => item);
    return (
      children && children.length > 0 && children.every((child) => checkedItems.includes(child))
    );
  };

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle className="flex justify-content-between">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box padding="8px" fontSize={18}>
            Add School
          </Box>

          <IconButton onClick={onCloseEmpty}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          onSubmit(values);
        }}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <Form
            onSubmit={(v) => {
              console.log(v);
              handleSubmit(v);
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
                      name="school"
                      label="School"
                      variant="outlined"
                      error={touched.school && Boolean(errors.school)}
                      helperText={touched.school && errors.school}
                      onChange={(event) => {
                        setFieldValue("school", event.target.value);
                      }}
                      fullWidth
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
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="address"
                      label="Address"
                      multiline
                      rows={6}
                      placeholder="Address"
                      defaultValue=""
                      style={{ width: "100%" }}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                      onChange={(event) => {
                        setFieldValue("address", event.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormGroup>
                      {series &&
                        series.length > 0 &&
                        series.map((parent) => (
                          <FormGroup key={parent.name}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={isParentChecked(parent.name)}
                                  onChange={() => handleParentCheckboxChange(parent.name)}
                                />
                              }
                              label={parent.name}
                            />
                            {schoolSeries &&
                              schoolSeries.length > 0 &&
                              schoolSeries
                                .filter((item) => item.series === parent.name)
                                .map((child) => (
                                  <FormControlLabel
                                    key={`${child.standard}-${child.series}`}
                                    control={
                                      <Checkbox
                                        checked={checkedItems.some(
                                          (item) =>
                                            item.standard === child.standard &&
                                            item.series === parent.name
                                        )}
                                        onChange={() => handleChildCheckboxChange(child)}
                                      />
                                    }
                                    label={child.standard}
                                  />
                                ))}
                          </FormGroup>
                        ))}
                    </FormGroup>
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
                            label="Select Series"
                            placeholder="Series"
                            error={touched.school_series && Boolean(errors.school_series)}
                            helperText={touched.school_series && errors.school_series}
                            variant="outlined"
                            focused
                          />
                        )}
                      />
                    )}
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

export default SchoolAddModal;

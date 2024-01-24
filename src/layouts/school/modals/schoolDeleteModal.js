import { useLayoutEffect, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
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
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { seriesActions } from "slices/series";
import { schoolActions } from "slices/school";
import Grid from "@mui/material/Grid";
import * as yup from "yup";
import Autocomplete from "@mui/material/Autocomplete";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  // flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const validationSchema = yup.object().shape({
  school: yup.string().required("School is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Invalid Gmail address")
    .required("Email is required"),
  contact: yup
    .string()
    .matches(/^\d{10}$/, "Phone number is not valid")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
});

export function SchoolDeleteModal({ isOpen, onClose, onCloseEmpty, editModalData }) {
  // eslint-disable-next-line camelcase
  const { name, email, contact, address, school_series, formatted_series } = editModalData;

  const initialValues = {
    school: name,
    email,
    contact,
    address,
    // eslint-disable-next-line camelcase
    school_series,
  };

  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState([]);

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(seriesActions.getAll());
    dispatch(schoolActions.getSchoolSeries());
  }, []);

  const series = useSelector((state) => state.series.data);
  const schoolSeries = useSelector((state) => state.school.dataSchoolSeries);

  useEffect(() => {
    console.log(initialValues);
  }, [initialValues]);

  useEffect(() => {
    console.log(checkedItems);
  }, [checkedItems]);

  useEffect(() => {
    const format = [];

    formatted_series &&
      formatted_series.length > 0 &&
      formatted_series.forEach((series) => {
        const { series_id, series_name, standards } = series;
        standards.forEach((standard) => {
          const { standard_id, standard_name } = standard;
          format.push({
            series: series_name,
            series_id,
            standard: standard_name,
            standard_id,
          });
        });
      });

    console.log(format);
    setCheckedItems(format);
  }, [formatted_series]);

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

  useEffect(() => {
    console.log(selectedSeries);
  }, [selectedSeries]);

  const onSubmit = (values) => {
    console.log(values, checkedItems);
    onClose(values, checkedItems);
  };

  const handleParentCheckboxChange = (parent) => {
    let newCheckedItems = [...checkedItems];
    const parentIndex = newCheckedItems.filter((item) => item.series === parent);

    const childCount = schoolSeries.filter((item) => item.series === parent);

    if (parentIndex.length < childCount.length) {
      // Parent checkbox was unchecked, so add it and its associated children to checkedItems
      // newCheckedItems.push(parent);
      const children = schoolSeries.filter((item) => item.series === parent);
      console.log(children);
      children.forEach((child) => {
        if (
          !newCheckedItems.some(
            (item) => item.standard === child.standard && item.series === child.series
          )
        ) {
          newCheckedItems.push(child);
        }
      });
    } else {
      // Parent checkbox was checked, so remove it and its associated children from checkedItems
      // newCheckedItems.splice(parentIndex, 1);
      const children = schoolSeries.filter((item) => item.series === parent);
      children.forEach((child) => {
        const childIndex = newCheckedItems.findIndex(
          (item) => item.standard === child.standard && item.series === child.series
        );
        if (childIndex !== -1) {
          newCheckedItems.splice(childIndex, 1);
        }
      });
    }

    setCheckedItems(newCheckedItems);
  };

  const handleChildCheckboxChange = (child) => {
    let newCheckedItems = [...checkedItems];
    const childIndex = newCheckedItems.findIndex(
      (item) => item.standard === child.standard && item.series === child.series
    );

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
      schoolSeries.filter((item) => item.series === parent);

    console.log(
      children,
      parent,
      children &&
        children.length > 0 &&
        children.every((child) =>
          checkedItems.some((item) => item.standard === child.standard && item.series === parent)
        )
    );

    return (
      children &&
      children.length > 0 &&
      children.every((child) =>
        checkedItems.some((item) => item.standard === child.standard && item.series === parent)
      )
    );
  };

  const isParentIndeterminate = (parent) => {
    const childItems =
      schoolSeries &&
      schoolSeries.length > 0 &&
      schoolSeries.filter((child) => child.series === parent);

    console.log(childItems);

    const checkedChildItems =
      childItems &&
      childItems.length > 0 &&
      childItems.filter((child) =>
        checkedItems.some((item) => item.standard === child.standard && item.series === parent)
      );

    console.log(checkedChildItems);

    return (
      checkedChildItems &&
      checkedChildItems.length > 0 &&
      checkedChildItems.length !== childItems.length
    );
  };

  const [expandedSeries, setExpandedSeries] = useState(false);

  const handleChangeAccSeries = (panel) => (event, newExpanded) => {
    setExpandedSeries(newExpanded ? panel : false);
  };

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle className="flex justify-content-between">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box padding="8px" fontSize={18}>
            Confirm Delete School?
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
        {({ values, handleSubmit, errors, touched, setFieldValue }) => (
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
                      defaultValue={values.school}
                      fullWidth
                      disabled
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
                      sx={{
                        marginBottom: "16px",
                      }}
                      defaultValue={values.contact}
                      disabled
                    />

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
                    <Box
                      sx={{
                        border: "1px solid rgba(0, 0, 0, 0.12)",
                        borderRadius: "12px",
                        overflow: "hidden",
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      <Typography sx={{ margin: "15.5px 14px" }}>Class Access</Typography>
                      <FormGroup sx={{ borderRadius: "13px" }}>
                        {series &&
                          series.length > 0 &&
                          series.map((parent, i) => (
                            <Accordion
                              expanded={expandedSeries === `panelseries${i + 1}`}
                              onChange={handleChangeAccSeries(`panelseries${i + 1}`)}
                              key={`panelseries${i + 1}`}
                            >
                              <AccordionSummary
                                aria-controls={`panelseries${i + 1}d-content`}
                                id={`panelseries${i + 1}d-header`}
                              >
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={isParentChecked(parent.name)}
                                      // onChange={() => handleParentCheckboxChange(parent.name)}
                                      indeterminate={isParentIndeterminate(parent.name)}
                                      disabled
                                    />
                                  }
                                  label={parent.name}
                                />
                              </AccordionSummary>
                              <AccordionDetails sx={{ border: "1px solid rgba(0, 0, 0, 0.12)" }}>
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
                                            // onChange={() => handleChildCheckboxChange(child)}
                                            disabled
                                          />
                                        }
                                        label={child.standard}
                                      />
                                    ))}
                              </AccordionDetails>
                              {/* </FormGroup> */}
                            </Accordion>
                          ))}
                      </FormGroup>
                    </Box>
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

export default SchoolDeleteModal;
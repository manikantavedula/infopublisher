import { useEffect, useLayoutEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormGroup, IconButton, TextField, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { seriesActions } from "slices/series";
import { Close } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Autocomplete from "@mui/material/Autocomplete";
// import CustomizedHook from "./selectComponent";

const validationSchema = yup.object().shape({
  student: yup.string().required("Student is required"),
  contact: yup
    .string()
    .matches(/^\d{10}$/, "Phone number is not valid")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  student_school: yup
    .object()
    .test(
      "is-object-empty",
      "Please select one option",
      (value) => Object.keys(value).length !== 0
    ),
});

export function StudentAddModal({ isOpen, onClose, onCloseEmpty }) {
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

  const initialValues = { student: "", contact: "", address: "", student_school: {} };

  const onSubmit = (values) => {
    console.log(values);
    onClose(values);
  };

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle className="flex justify-content-between">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box padding="8px" fontSize={18}>
            Add Student
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
                      name="student"
                      label="Student"
                      variant="outlined"
                      error={touched.student && Boolean(errors.student)}
                      helperText={touched.student && errors.student}
                      onChange={(event) => {
                        setFieldValue("student", event.target.value);
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
                    {series && series !== null && series.length > 0 && (
                      <Autocomplete
                        id="tags-standard"
                        options={series && series !== null && series.length > 0 && series}
                        getOptionLabel={(option) => option.name}
                        onInputChange={(e, newInputValue) => {
                          const newValue = e.target.value;
                          console.log(newValue, newInputValue);
                          setFieldValue("student_school", newInputValue);
                        }}
                        onChange={(e, newInputValue) => {
                          const newValue = e.target.value;
                          console.log(newValue, newInputValue);
                          setFieldValue("student_school", newInputValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Select Series"
                            placeholder="Series"
                            error={touched.student_school && Boolean(errors.student_school)}
                            helperText={touched.student_school && errors.student_school}
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

export default StudentAddModal;

import { useEffect, useLayoutEffect, useState } from "react";
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
  Grid,
  Autocomplete,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { seriesActions } from "slices/series";
import { standardActions } from "slices/standard";
import { subjectActions } from "slices/subject";
import { lessonActions } from "slices/lesson";
import { typeOfVideosActions } from "slices/typeOfVideos";
// import { styled } from "@mui/material/styles";
import { Close } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { capitalizeString } from "../../../utils/capitalize";

const validationSchema = yup.object().shape({
  series: yup.string().required("Please select an option"),
  standard: yup.string().required("Please select an option"),
  subject: yup.string().required("Please select an option"),
  type: yup.string().required("Please select an option"),
  // typeOfVideos: yup.string().required("Please select an option"),
  lesson: yup.string().required("Lesson is required"),
});

export function LessonAddModal({ isOpen, onClose, onCloseEmpty }) {
  const [fetchedOptions, setFetchedOptions] = useState([]);

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(seriesActions.getAll());
    dispatch(standardActions.getAll());
    dispatch(subjectActions.getAll());
    dispatch(typeOfVideosActions.getAll());
  }, []);

  const series = useSelector((state) => state.series.data);
  const standard = useSelector((state) => state.standard.data);
  const subject = useSelector((state) => state.subject.data);
  const typeOfVideos = useSelector((state) => state.typeOfVideos.data);

  const fetchData = async (v) => {
    console.log(v);
    dispatch(lessonActions.getSome(v.series, v.standard, v.subject));
  };

  const lessonId = useSelector((state) => state.lesson.selectedData);

  useEffect(() => {
    console.log(lessonId);
  }, [lessonId]);

  useEffect(() => {
    console.log(series, standard, subject);
  }, [series, standard, subject]);

  const initialValues = {
    series: "",
    standard: "",
    subject: "",
    type: "main",
    typeOfVideos: "",
    lesson: "",
    partNo: "",
    partName: "",
    lessonId: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    onClose(values);
  };

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle className="flex justify-content-between">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box padding="8px">Add Lesson</Box>

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
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Series</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-series"
                        value={values.series}
                        label="Series"
                        error={touched.series && Boolean(errors.series)}
                        helperText={touched.series && errors.series}
                        onChange={(event) => {
                          setFieldValue("series", event.target.value);
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {series &&
                          series.length > 0 &&
                          series.map((v) => <MenuItem value={v.id}>{v.name}</MenuItem>)}
                      </Select>
                      <FormHelperText sx={{ color: "red" }}>
                        {errors.series && touched.series ? errors.series : ""}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Standard</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-standard"
                        value={values.standard}
                        label="Standard"
                        error={touched.standard && Boolean(errors.standard)}
                        helperText={touched.standard && errors.standard}
                        onChange={(event) => {
                          setFieldValue("standard", event.target.value);
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {standard &&
                          standard.length > 0 &&
                          standard.map((v) => <MenuItem value={v.id}>{v.name}</MenuItem>)}
                      </Select>
                      <FormHelperText sx={{ color: "red" }}>
                        {errors.standard && touched.standard ? errors.standard : ""}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-subject"
                        value={values.subject}
                        label="Subject"
                        error={touched.subject && Boolean(errors.subject)}
                        helperText={touched.subject && errors.subject}
                        onChange={(event) => {
                          setFieldValue("subject", event.target.value);
                          console.log(values);
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {subject &&
                          subject.length > 0 &&
                          subject.map((v) => <MenuItem value={v.id}>{v.name}</MenuItem>)}
                      </Select>
                      <FormHelperText sx={{ color: "red" }}>
                        {errors.subject && touched.subject ? errors.subject : ""}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-type"
                        value={values.type}
                        label="Type"
                        error={touched.type && Boolean(errors.type)}
                        helperText={touched.type && errors.type}
                        onChange={(event) => {
                          setFieldValue("type", event.target.value);
                          fetchData(values);
                          console.log(values);
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="main">Main</MenuItem>
                        <MenuItem value="part">Part</MenuItem>
                      </Select>
                      <FormHelperText sx={{ color: "red" }}>
                        {errors.type && touched.type ? errors.type : ""}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  {values.type === "part" ? (
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lesson</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-part-lesson"
                          value={values.lessonId}
                          label="Type"
                          error={touched.lessonId && Boolean(errors.lessonId)}
                          helperText={touched.lessonId && errors.lessonId}
                          onChange={(event) => {
                            setFieldValue("lessonId", event.target.value);
                            console.log(values);
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {fetchedOptions.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.lessonId && touched.lessonId ? errors.lessonId : ""}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  ) : (
                    <Grid item xs={6}>
                      <TextField
                        name="lesson"
                        label="Lesson"
                        variant="outlined"
                        error={touched.lesson && Boolean(errors.lesson)}
                        helperText={touched.lesson && errors.lesson}
                        onChange={(event) => {
                          setFieldValue("lesson", event.target.value);
                        }}
                        fullWidth
                      />
                    </Grid>
                  )}

                  {/* <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Type Of Videos</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-typeOfVideos"
                        value={values.typeOfVideos}
                        label="Type Of Videos"
                        error={touched.typeOfVideos && Boolean(errors.typeOfVideos)}
                        helperText={touched.typeOfVideos && errors.typeOfVideos}
                        onChange={(event) => {
                          setFieldValue("typeOfVideos", event.target.value);
                          console.log(values);
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {typeOfVideos &&
                          typeOfVideos.length > 0 &&
                          typeOfVideos.map((v) => (
                            <MenuItem value={v.name}>{capitalizeString(v.name)}</MenuItem>
                          ))}
                      </Select>
                      <FormHelperText sx={{ color: "red" }}>
                        {errors.typeOfVideos && touched.typeOfVideos ? errors.typeOfVideos : ""}
                      </FormHelperText>
                    </FormControl>
                  </Grid> */}
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

export default LessonAddModal;

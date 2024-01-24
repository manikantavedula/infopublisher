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
import { onlineClassesActions } from "slices/onlineClasses";
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
  onlineClasses: yup.string().required("OnlineClasses is required"),
});

export function OnlineClassesAddModal({ isOpen, onClose, onCloseEmpty }) {
  const [fetchedOptions, setFetchedOptions] = useState([]);
  const [partNo, setPartNo] = useState("");

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

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/onlineClasses/dataById`,
        {
          ...v,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://app.infopublisher.in",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
      console.log(response.data);
      setFetchedOptions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPart = async (v, cb) => {
    console.log(v, cb);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/onlineClasses/dataByOnlineClassesId`,
        {
          ...v,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://app.infopublisher.in",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
      console.log(response.data);

      if (response.data.length > 0) cb(response.data.length + 1);
      else cb(1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(series, standard, subject);
  }, [series, standard, subject]);

  const initialValues = {
    series: "",
    standard: "",
    subject: "",
    type: "main",
    typeOfVideos: "",
    onlineClasses: "",
    partNo: "",
    partName: "",
    onlineClassesId: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    onClose(values);
  };

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle className="flex justify-content-between">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box padding="8px" fontSize={18}>
            Add OnlineClasses
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
                        disabled={
                          values.series === "" || values.standard === "" || values.subject === ""
                        }
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
                    <>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">OnlineClasses</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-part-onlineClasses"
                            value={values.onlineClassesId}
                            label="OnlineClasses"
                            error={touched.onlineClassesId && Boolean(errors.onlineClassesId)}
                            helperText={touched.onlineClassesId && errors.onlineClassesId}
                            onChange={(event) => {
                              setFieldValue("onlineClassesId", event.target.value);
                              fetchPart({ onlineClassesId: event.target.value }, (partNo) => {
                                setFieldValue("partNo", partNo);
                              });
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
                            {errors.onlineClassesId && touched.onlineClassesId
                              ? errors.onlineClassesId
                              : ""}
                          </FormHelperText>
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          name="part_no"
                          label="Part No"
                          variant="outlined"
                          error={touched.onlineClasses && Boolean(errors.onlineClasses)}
                          helperText={touched.onlineClasses && errors.onlineClasses}
                          value={values.partNo}
                          fullWidth
                          disabled
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          name="onlineClasses"
                          label="OnlineClasses"
                          variant="outlined"
                          error={touched.onlineClasses && Boolean(errors.onlineClasses)}
                          helperText={touched.onlineClasses && errors.onlineClasses}
                          value={values.onlineClasses}
                          onChange={(event) => {
                            setFieldValue("onlineClasses", event.target.value);
                          }}
                          fullWidth
                          focused={values.onlineClasses !== ""}
                        />
                      </Grid>
                    </>
                  ) : (
                    <Grid item xs={6}>
                      <TextField
                        name="onlineClasses"
                        label="OnlineClasses"
                        variant="outlined"
                        error={touched.onlineClasses && Boolean(errors.onlineClasses)}
                        helperText={touched.onlineClasses && errors.onlineClasses}
                        value={values.onlineClasses}
                        onChange={(event) => {
                          setFieldValue("onlineClasses", event.target.value);
                        }}
                        fullWidth
                        focused={values.onlineClasses !== ""}
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

export default OnlineClassesAddModal;
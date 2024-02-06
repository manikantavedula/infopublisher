import React, { useLayoutEffect, useState, useMemo, useCallback, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useMaterialUIController } from "context";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { studentActions } from "slices/student";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import StudentTableNew from "./studentTableNew";
import { StudentAddModal } from "./modals/studentAddModal";
import { StudentEditModal } from "./modals/studentEditModal";
import { StudentDeleteModal } from "./modals/studentDeleteModal";
import { StudentViewModal } from "./modals/studentViewModal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { IconSearch, IconPlus } from "@tabler/icons";
import {
  Button,
  CardHeader,
  Typography,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Paper,
  InputBase,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import CryptoJS from "crypto-js";

function decryptObject(ciphertext, secretKey) {
  // Decrypt the object using AES
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);

  console.log(plaintext);
  return JSON.parse(plaintext);
}

// Create a custom theme with the desired color
const theme = createTheme({
  palette: {
    primary: {
      main: "#673ab7", // purple
    },
    secondary: {
      main: "rgb(33, 150, 243)", // blue
    },
  },
});

function Student() {
  console.log("In Student");

  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [whichModal, setWhichModal] = useState("");
  const [editModalData, setEditModalData] = useState({});
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [errorMessageContactToAddModal, setErrorMessageContactToAddModal] = useState("");
  const [errorMessageContactToEditModal, setErrorMessageContactToEditModal] = useState("");

  const key = localStorage.getItem("key_for_access");
  const login_role_data = localStorage.getItem("access_role_data");
  const decryptedObject = decryptObject(login_role_data, key);
  const accessRoleID = decryptedObject.id;

  console.log(accessRoleID);

  useEffect(() => {
    // var requestOptions = {
    //   method: "GET",
    //   redirect: "follow",
    // };
    // fetch(
    //   "https://2factor.in/API/V1/e6d1f0ea-fa33-11ed-addf-0200cd936042/SMS/+918639693342/AUTOGEN2/INFOPB",
    //   requestOptions
    // )
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error", error));
    // var requestOptions = {
    //   method: "GET",
    //   redirect: "follow",
    // };
    // fetch(
    //   "https://2factor.in/API/V1/e6d1f0ea-fa33-11ed-addf-0200cd936042/SMS/VERIFY3/918639693342/487638",
    //   requestOptions
    // )
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error", error));
    ////////////////////////////////////////////////////////////////////////////
    // var requestOptions = {
    //   method: "GET",
    //   redirect: "follow",
    // };
    // fetch(
    //   "https://2factor.in/API/V1/e6d1f0ea-fa33-11ed-addf-0200cd936042/SMS/VERIFY/f18eaa75-fa37-11ed-addf-0200cd936042/487638",
    //   requestOptions
    // )
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error", error));
  }, []);

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(studentActions.getAll());
  }, []);

  const student = useSelector((state) => state.student.data);

  useEffect(() => {
    console.log(student);
  }, [student]);

  const filteredData = useMemo(() => {
    console.log(searchQuery);

    if (searchQuery.trim() === "") {
      return;
    }

    console.log(student);

    const filteredStudent = student.filter(
      (item) =>
        (item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
          item.series.concat(" ").toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
          item.standard.concat(" ").toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
          item.contact.concat(" ").toLowerCase().includes(searchQuery.trim().toLowerCase())) &&
        item.school === Number(accessRoleID)
    );

    console.log(filteredStudent);

    return filteredStudent;
  }, [searchQuery, student]);

  const searchInputRef = React.useRef(null);

  const onOpenAddModal = useCallback(() => {
    setIsOpen(true);
    setWhichModal("add");
  });

  const onOpenEditModal = useCallback((val) => {
    setIsOpen(true);
    setWhichModal("edit");
    setEditModalData(val);
  });

  const onOpenViewModal = useCallback((val) => {
    setIsOpen(true);
    setWhichModal("view");
    setEditModalData(val);
  });

  const onOpenDeleteModal = useCallback((val) => {
    setIsOpen(true);
    setWhichModal("delete");
    setEditModalData(val);
  });

  const onCloseEmptyModal = useCallback(() => {
    setIsOpen(false);
    setWhichModal("");
    setEditModalData({});
  });

  useEffect(() => {
    console.log(errorMessageContactToAddModal);
  }, [errorMessageContactToAddModal]);

  useEffect(() => {
    console.log(errorMessageContactToEditModal);
  }, [errorMessageContactToEditModal]);

  const onCloseAddModal = async (values, checkedItems) => {
    setIsLoading(true);
    console.log(values);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/student/submit-form`,
        {
          ...values,
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

      if (response.data === "Contact already exists") {
        setErrorMessageContactToAddModal(values.contact);
      } else {
        setErrorMessageContactToAddModal("");
        setIsOpen(false);
        setWhichModal("");
        dispatch(studentActions.getAll());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onCloseEditModal = async (values, checkedItems) => {
    setIsLoading(true);
    console.log(values, editModalData, checkedItems);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/student/submit-edit-form`,
        {
          ...editModalData,
          ...values,
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

      if (response.data === "Contact already exists") {
        setErrorMessageContactToEditModal(values.contact);
      } else {
        setErrorMessageContactToEditModal("");
        setIsOpen(false);
        setWhichModal("");
        setEditModalData({});
        dispatch(studentActions.getAll());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onCloseDeleteModal = async (values) => {
    setIsLoading(true);
    console.log(values, editModalData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/student/submit-delete-form`,
        {
          ...editModalData,
          ...values,
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

      if (response.data === "Contact already exists") {
        setErrorMessageContactToEditModal(values.contact);
      } else {
        setErrorMessageContactToEditModal("");
        setIsOpen(false);
        setWhichModal("");
        setEditModalData({});
        dispatch(studentActions.getAll());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchTable = useCallback((event) => {
    console.log(event.target.value, searchInputRef, searchInputRef.current);

    searchInputRef.current?.focus();

    setSearchQuery(event.target.value);
  });

  const toggleSearch = () => {
    setIsSearchOpen((prevSearch) => !prevSearch);
  };

  const buttonSearch = (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {isOpen && whichModal === "add" ? (
        <StudentAddModal
          isOpen={isOpen}
          onClose={onCloseAddModal}
          onCloseEmpty={onCloseEmptyModal}
          errorContact={errorMessageContactToAddModal}
        />
      ) : null}

      {isOpen && whichModal === "edit" ? (
        <StudentEditModal
          isOpen={isOpen}
          onClose={onCloseEditModal}
          onCloseEmpty={onCloseEmptyModal}
          editModalData={editModalData}
          errorContact={errorMessageContactToEditModal}
        />
      ) : null}

      {isOpen && whichModal === "view" ? (
        <StudentViewModal
          isOpen={isOpen}
          onCloseEmpty={onCloseEmptyModal}
          editModalData={editModalData}
        />
      ) : null}

      {isOpen && whichModal === "delete" ? (
        <StudentDeleteModal
          isOpen={isOpen}
          onClose={onCloseDeleteModal}
          onCloseEmpty={onCloseEmptyModal}
          editModalData={editModalData}
        />
      ) : null}

      <Grid>
        <Card sx={{ boxShadow: "none" }}>
          <CardContent>
            <Grid
              variant="gradient"
              bgcolor="info"
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h3" fontWeight={500} color="primary">
                Student List
              </Typography>

              <Grid
                size="small"
                component="form"
                sx={{ p: "2px 0px", display: "flex", alignItems: "center" }}
              >
                {isSearchOpen ? (
                  <TextField
                    sx={{ ml: 1, flex: 1 }}
                    size="small"
                    placeholder="Search this table..."
                    inputProps={{ "aria-label": "search this table..." }}
                    autoFocus
                    value={searchQuery}
                    onChange={searchTable}
                    variant="standard"
                    label="Search"
                  />
                ) : null}
                <Tooltip title="Search..." placement="top">
                  <IconButton
                    color="primary"
                    type="button"
                    aria-label="search"
                    onClick={toggleSearch}
                  >
                    <IconSearch size="24px" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Add Student" placement="top">
                  <IconButton color="secondary" aria-label="add" onClick={onOpenAddModal}>
                    <IconPlus size="27px" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Select Standard" placement="top">
                  <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-standard-label">Select Standard</InputLabel>
                    <Select
                      value={searchQuery}
                      label="select-standard"
                      onChange={(e) => buttonSearch(e)}
                      placeholder=""
                    >
                      <MenuItem value="">
                        <em>Reset</em>
                      </MenuItem>

                      {student &&
                        [...new Set(student.map((v) => v.standard))].map((v) => (
                          <MenuItem value={v}>{v}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Tooltip>
              </Grid>
            </Grid>
          </CardContent>

          <Divider />

          <StudentTableNew
            filtereddata={filteredData}
            onOpenEditModal={onOpenEditModal}
            onOpenDeleteModal={onOpenDeleteModal}
            onOpenViewModal={onOpenViewModal}
          />
        </Card>
      </Grid>
      {/* <Footer /> */}
    </ThemeProvider>
  );
}

export default Student;

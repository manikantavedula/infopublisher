import React, { useLayoutEffect, useState, useMemo, useCallback, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useMaterialUIController } from "context";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { schoolActions } from "slices/school";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import SchoolTableNew from "./schoolTableNew";
import { SchoolAddModal } from "./modals/schoolAddModal";
import { SchoolEditModal } from "./modals/schoolEditModal";
import { SchoolDeleteModal } from "./modals/schoolDeleteModal";
import { SchoolViewModal } from "./modals/schoolViewModal";
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

function School() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [whichModal, setWhichModal] = useState("");
  const [editModalData, setEditModalData] = useState({});
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [errorMessageEmailToAddModal, setErrorMessageEmailToAddModal] = useState("");

  const key = localStorage.getItem("key_for_access");
  const login_role_data = localStorage.getItem("access_role_data");
  const decryptedObject = decryptObject(login_role_data, key);
  const accessRole = decryptedObject.role;

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
    dispatch(schoolActions.getAll());
  }, []);

  const school = useSelector((state) => state.school.data);

  const filteredData = useMemo(() => {
    console.log(searchQuery);

    if (searchQuery.trim() === "") {
      return school;
    }

    const filteredSchool = school.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        item.school_series.join(" ").toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    return filteredSchool;
  }, [searchQuery, school]);

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
    console.log(errorMessageEmailToAddModal);
  }, [errorMessageEmailToAddModal]);

  const onCloseAddModal = async (values, checkedItems) => {
    setIsLoading(true);
    console.log(values, checkedItems);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/school/submit-form`,
        {
          ...values,
          checkedItems,
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

      if (response.data === "Email already exists") {
        setErrorMessageEmailToAddModal(values.email);
      } else {
        setErrorMessageEmailToAddModal("");
        setIsOpen(false);
        setWhichModal("");
        dispatch(schoolActions.getAll());
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
        `${process.env.REACT_APP_API_URL}/school/submit-edit-form`,
        {
          ...editModalData,
          ...values,
          checkedItems,
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

      setIsOpen(false);
      setWhichModal("");
      setEditModalData({});
      dispatch(schoolActions.getAll());
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
        `${process.env.REACT_APP_API_URL}/school/submit-delete-form`,
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

      setIsOpen(false);
      setWhichModal("");
      setEditModalData({});
      dispatch(schoolActions.getAll());
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

  return (
    <ThemeProvider theme={theme}>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {isOpen && whichModal === "add" ? (
        <SchoolAddModal
          isOpen={isOpen}
          onClose={onCloseAddModal}
          onCloseEmpty={onCloseEmptyModal}
          errorEmail={errorMessageEmailToAddModal}
        />
      ) : null}

      {isOpen && whichModal === "edit" ? (
        <SchoolEditModal
          isOpen={isOpen}
          onClose={onCloseEditModal}
          onCloseEmpty={onCloseEmptyModal}
          editModalData={editModalData}
        />
      ) : null}

      {isOpen && whichModal === "view" ? (
        <SchoolViewModal
          isOpen={isOpen}
          onCloseEmpty={onCloseEmptyModal}
          editModalData={editModalData}
        />
      ) : null}

      {isOpen && whichModal === "delete" ? (
        <SchoolDeleteModal
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
                School List
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

                <Tooltip title="Add Series" placement="top">
                  <IconButton color="secondary" aria-label="delete" onClick={onOpenAddModal}>
                    <IconPlus size="27px" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </CardContent>

          <Divider />

          <SchoolTableNew
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

export default School;

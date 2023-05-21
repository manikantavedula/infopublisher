import React, { useLayoutEffect, useState, useMemo, useCallback } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Footer from "examples/Footer";
import { useMaterialUIController } from "context";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { lessonActions } from "slices/lesson";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LessonTableNew from "./lessonTableNew";
import { LessonAddModal } from "./modals/lessonAddModal";
import { LessonEditModal } from "./modals/lessonEditModal";
import { LessonViewModal } from "./modals/lessonViewModal";
import { LessonVideoModal } from "./modals/lessonVideoModal";
import { LessonDeleteModal } from "./modals/lessonDeleteModal";
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
import AddIcon from "@mui/icons-material/Add";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { IconSearch, IconPlus } from "@tabler/icons";

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

function Lesson() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [whichModal, setWhichModal] = useState("");
  const [editModalData, setEditModalData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(lessonActions.getAll());
  }, []);

  const lesson = useSelector((state) => state.lesson.data);

  const filteredData = useMemo(() => {
    console.log(searchQuery);

    if (searchQuery.trim() === "") {
      return lesson;
    }

    const filteredLesson = lesson.filter((item) => {
      console.log(item, item.name, item.name.toLowerCase(), searchQuery);
      return item.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
    });

    return filteredLesson;
  }, [searchQuery, lesson]);

  const searchInputRef = React.useRef(null);

  const onOpenAddModal = () => {
    setIsOpen(true);
    setWhichModal("add");
  };

  const onOpenEditModal = (val) => {
    setIsOpen(true);
    setWhichModal("edit");
    setEditModalData(val);
  };

  const onOpenDeleteModal = (val) => {
    setIsOpen(true);
    setWhichModal("delete");
    setEditModalData(val);
  };

  const onOpenViewModal = (val) => {
    setIsOpen(true);
    setWhichModal("view");
    setEditModalData(val);
  };

  const onOpenVideoModal = (val) => {
    setIsOpen(true);
    setWhichModal("video");
    setEditModalData(val);
  };

  const onCloseEmptyModal = () => {
    setIsOpen(false);
    setWhichModal("");
    setEditModalData({});
  };

  const onCloseAddModal = async (values) => {
    setIsLoading(true);
    console.log(values);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/lesson/submit-form`,
        {
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
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
      dispatch(lessonActions.getAll());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const onCloseEditModal = async (values) => {
    setIsLoading(true);
    console.log(values, editModalData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/lesson/submit-edit-form`,
        {
          ...editModalData,
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
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
      dispatch(lessonActions.getAll());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const onCloseDeleteModal = async (values) => {
    setIsLoading(true);
    console.log(values, editModalData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/lesson/submit-delete-form`,
        {
          ...editModalData,
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
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
      dispatch(lessonActions.getAll());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
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
        <LessonAddModal
          isOpen={isOpen}
          onClose={onCloseAddModal}
          onCloseEmpty={onCloseEmptyModal}
        />
      ) : null}

      {isOpen && whichModal === "edit" ? (
        <LessonEditModal
          isOpen={isOpen}
          onClose={onCloseEditModal}
          onCloseEmpty={onCloseEmptyModal}
          editModalData={editModalData}
        />
      ) : null}

      {isOpen && whichModal === "delete" ? (
        <LessonDeleteModal
          isOpen={isOpen}
          onClose={onCloseDeleteModal}
          onCloseEmpty={onCloseEmptyModal}
          editModalData={editModalData}
        />
      ) : null}

      {isOpen && whichModal === "view" ? (
        <LessonViewModal
          isOpen={isOpen}
          onCloseEmpty={onCloseEmptyModal}
          editModalData={editModalData}
        />
      ) : null}

      {isOpen && whichModal === "video" ? (
        <LessonVideoModal
          isOpen={isOpen}
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
                Lesson List
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
                    variant="lesson"
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

                <Tooltip title="Add Lesson" placement="top">
                  <IconButton color="secondary" aria-label="delete" onClick={onOpenAddModal}>
                    <IconPlus size="27px" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </CardContent>

          <Divider />

          <LessonTableNew
            filtereddata={filteredData}
            onOpenEditModal={onOpenEditModal}
            onOpenDeleteModal={onOpenDeleteModal}
            onOpenViewModal={onOpenViewModal}
            onOpenVideoModal={onOpenVideoModal}
          />
        </Card>
      </Grid>
      {/* <Footer /> */}
    </ThemeProvider>
  );
}

export default Lesson;

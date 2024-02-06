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
import { seriesActions } from "slices/series";
import { standardActions } from "slices/standard";
import { subjectActions } from "slices/subject";
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
import { styled, alpha } from "@mui/material/styles";
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
  Menu,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { IconSearch, IconPlus, IconFilter } from "@tabler/icons";

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

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    textAlign: "center",
    minWidth: 180,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

function Lesson() {
  console.log("In Lesson");

  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [whichModal, setWhichModal] = useState("");
  const [editModalData, setEditModalData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(lessonActions.getAll());
    dispatch(seriesActions.getAll());
    dispatch(standardActions.getAll());
    dispatch(subjectActions.getAll());
  }, []);

  const lesson = useSelector((state) => state.lesson.data);
  const series = useSelector((state) => state.series.data);
  const standard = useSelector((state) => state.standard.data);
  const subject = useSelector((state) => state.subject.data);

  const filteredData = useMemo(() => {
    console.log(searchQuery);

    if (
      searchQuery.trim() === "" &&
      selectedSeries === "" &&
      selectedStandard === "" &&
      selectedSubject === ""
    ) {
      return lesson;
    }

    const filteredLesson = lesson.filter((item) => {
      console.log(item, item.name, item.name.toLowerCase(), searchQuery);
      const queryEmpty = searchQuery === "";
      const seriesEmpty = selectedSeries === "";
      const standardEmpty = selectedStandard === "";
      const subjectEmpty = selectedSubject === "";

      if (!queryEmpty && !seriesEmpty && !standardEmpty && !subjectEmpty) {
        return (
          item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) &&
          `${item.series}` === `${selectedSeries}` &&
          `${item.standard}` === `${selectedStandard}` &&
          `${item.subject}` === `${selectedSubject}`
        );
      }

      if (!queryEmpty && seriesEmpty && standardEmpty && subjectEmpty) {
        return item.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
      }

      if (queryEmpty && !seriesEmpty && standardEmpty && subjectEmpty) {
        return `${item.series}` === `${selectedSeries}`;
      }

      if (queryEmpty && seriesEmpty && !standardEmpty && subjectEmpty) {
        return `${item.standard}` === `${selectedStandard}`;
      }

      if (queryEmpty && seriesEmpty && standardEmpty && !subjectEmpty) {
        return `${item.subject}` === `${selectedSubject}`;
      }

      if (queryEmpty && !seriesEmpty && !standardEmpty && subjectEmpty) {
        return (
          `${item.series}` === `${selectedSeries}` && `${item.standard}` === `${selectedStandard}`
        );
      }

      if (queryEmpty && !seriesEmpty && standardEmpty && !subjectEmpty) {
        return (
          `${item.series}` === `${selectedSeries}` && `${item.subject}` === `${selectedSubject}`
        );
      }

      if (queryEmpty && seriesEmpty && !standardEmpty && !subjectEmpty) {
        return (
          `${item.standard}` === `${selectedStandard}` && `${item.subject}` === `${selectedSubject}`
        );
      }

      // Additional Conditions

      if (!queryEmpty && !seriesEmpty && standardEmpty && subjectEmpty) {
        return (
          item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) &&
          `${item.series}` === `${selectedSeries}`
        );
      }

      if (!queryEmpty && seriesEmpty && !standardEmpty && subjectEmpty) {
        return (
          item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) &&
          `${item.standard}` === `${selectedStandard}`
        );
      }

      if (!queryEmpty && seriesEmpty && standardEmpty && !subjectEmpty) {
        return (
          item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) &&
          `${item.subject}` === `${selectedSubject}`
        );
      }

      if (!queryEmpty && !seriesEmpty && !standardEmpty && subjectEmpty) {
        return (
          item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) &&
          `${item.series}` === `${selectedSeries}` &&
          `${item.standard}` === `${selectedStandard}`
        );
      }

      if (!queryEmpty && !seriesEmpty && standardEmpty && !subjectEmpty) {
        return (
          item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) &&
          `${item.series}` === `${selectedSeries}` &&
          `${item.subject}` === `${selectedSubject}`
        );
      }

      if (!queryEmpty && seriesEmpty && !standardEmpty && !subjectEmpty) {
        return (
          item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) &&
          `${item.standard}` === `${selectedStandard}` &&
          `${item.subject}` === `${selectedSubject}`
        );
      }

      if (queryEmpty && !seriesEmpty && !standardEmpty && subjectEmpty) {
        return (
          `${item.series}` === `${selectedSeries}` && `${item.standard}` === `${selectedStandard}`
        );
      }

      if (queryEmpty && !seriesEmpty && standardEmpty && !subjectEmpty) {
        return (
          `${item.series}` === `${selectedSeries}` && `${item.subject}` === `${selectedSubject}`
        );
      }

      if (queryEmpty && seriesEmpty && !standardEmpty && !subjectEmpty) {
        return (
          `${item.standard}` === `${selectedStandard}` && `${item.subject}` === `${selectedSubject}`
        );
      }

      // Remaining Conditions

      if (!queryEmpty && !seriesEmpty && !standardEmpty && subjectEmpty) {
        return (
          item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) &&
          `${item.series}` === `${selectedSeries}` &&
          `${item.standard}` === `${selectedStandard}`
        );
      }

      if (!queryEmpty && !seriesEmpty && standardEmpty && !subjectEmpty) {
        return (
          item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) &&
          `${item.series}` === `${selectedSeries}` &&
          `${item.subject}` === `${selectedSubject}`
        );
      }

      if (!queryEmpty && seriesEmpty && !standardEmpty && !subjectEmpty) {
        return (
          item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) &&
          `${item.standard}` === `${selectedStandard}` &&
          `${item.subject}` === `${selectedSubject}`
        );
      }

      if (queryEmpty && !seriesEmpty && !standardEmpty && !subjectEmpty) {
        return (
          `${item.series}` === `${selectedSeries}` &&
          `${item.standard}` === `${selectedStandard}` &&
          `${item.subject}` === `${selectedSubject}`
        );
      }

      if (queryEmpty && !seriesEmpty && standardEmpty && subjectEmpty) {
        return `${item.series}` === `${selectedSeries}`;
      }

      if (!queryEmpty && seriesEmpty && standardEmpty && subjectEmpty) {
        return item.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
      }
    });

    return filteredLesson;
  }, [searchQuery, lesson, selectedSeries, selectedStandard, selectedSubject]);

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
          selectedValues={{
            selectedSeries,
            selectedStandard,
            selectedSubject,
          }}
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
                <Tooltip title="Filter Table" placement="top">
                  <IconButton
                    color="secondary"
                    type="button"
                    aria-label="search"
                    onClick={handleClick}
                  >
                    <IconFilter size="28px" />
                  </IconButton>
                </Tooltip>

                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <Typography variant="h6" fontWeight={500} color="primary">
                    Filter Table
                  </Typography>
                  <MenuItem disableRipple>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Series</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-series"
                        value={selectedSeries}
                        label="Series"
                        onChange={(event) => {
                          setSelectedSeries(event.target.value);
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {series &&
                          series.length > 0 &&
                          series.map((v) => (
                            <MenuItem key={`${v.name}-${v.id}`} value={v.id}>
                              {v.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </MenuItem>
                  <MenuItem disableRipple>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Standard</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-standard"
                        value={selectedStandard}
                        label="Standard"
                        onChange={(event) => {
                          setSelectedStandard(event.target.value);
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {standard &&
                          standard.length > 0 &&
                          standard.map((v) => (
                            <MenuItem key={`${v.name}-${v.id}`} value={v.id}>
                              {v.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </MenuItem>
                  <MenuItem disableRipple>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-subject"
                        value={selectedSubject}
                        label="Subject"
                        onChange={(event) => {
                          setSelectedSubject(event.target.value);
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {subject &&
                          subject.length > 0 &&
                          subject.map((v) => (
                            <MenuItem key={`${v.name}-${v.id}`} value={v.id}>
                              {v.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </MenuItem>
                </StyledMenu>

                {isSearchOpen ? (
                  <TextField
                    sx={{ ml: 1, flex: 1 }}
                    size="small"
                    placeholder="Search this table..."
                    inputProps={{ "aria-label": "search this table..." }}
                    autoFocus
                    value={searchQuery}
                    onChange={searchTable}
                    variant="outlined"
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
                    <IconSearch size="25px" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Add Lesson" placement="top">
                  <IconButton color="secondary" aria-label="delete" onClick={onOpenAddModal}>
                    <IconPlus size="28px" />
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

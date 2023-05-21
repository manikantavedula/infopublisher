import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import {
  Typography,
  Box,
  Tab,
  Tabs,
  AppBar,
  Button,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Paper,
  InputBase,
  Grid,
  Card,
  Backdrop,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState, useCallback, useMemo, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { lessonActions } from "slices/lesson";
import { seriesActions } from "slices/series";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import OnlineClassesTableNew from "./onlineClassesTableNew";
import { OnlineClassesAddModal } from "./modals/onlineClassesAddModal";
import { OnlineClassesEditModal } from "./modals/onlineClassesEditModal";
import { OnlineClassesDeleteModal } from "./modals/onlineClassesDeleteModal";
import { OnlineClassesViewModal } from "./modals/onlineClassesViewModal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { IconSearch, IconPlus } from "@tabler/icons";

// Create a custom theme with the desired color
const themes = createTheme({
  palette: {
    primary: {
      main: "#673ab7", // purple
    },
    secondary: {
      main: "rgb(33, 150, 243)", // blue
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

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
  flexDirection: "row-reverse",
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

function OnlineClasses() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [whichModal, setWhichModal] = useState("");
  const [editModalData, setEditModalData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(lessonActions.getAll());
    dispatch(seriesActions.getAll());
  }, []);

  const lesson = useSelector((state) => state.lesson.data);
  const series = useSelector((state) => state.series.data);

  useEffect(() => {
    console.log(series);
  }, [series]);

  const filteredData = useMemo(() => {
    console.log(searchQuery);

    if (searchQuery.trim() === "") {
      return lesson;
    }

    const filteredOnlineClasses = lesson.filter((item) => {
      console.log(item, item.name, item.name.toLowerCase(), searchQuery);
      return item.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
    });

    return filteredOnlineClasses;
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

  const [expanded, setExpanded] = useState(false > "panel1");

  const handleChangeAcc = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <ThemeProvider>
      <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
        <AppBar position="static" sx={{ backgroundColor: "#663ab6" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Add/View" {...a11yProps(0)} />
            <Tab label="Student View" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            {isOpen && whichModal === "add" ? (
              <OnlineClassesAddModal
                isOpen={isOpen}
                onClose={onCloseAddModal}
                onCloseEmpty={onCloseEmptyModal}
              />
            ) : null}

            {isOpen && whichModal === "edit" ? (
              <OnlineClassesEditModal
                isOpen={isOpen}
                onClose={onCloseEditModal}
                onCloseEmpty={onCloseEmptyModal}
                editModalData={editModalData}
              />
            ) : null}

            {isOpen && whichModal === "delete" ? (
              <OnlineClassesDeleteModal
                isOpen={isOpen}
                onClose={onCloseDeleteModal}
                onCloseEmpty={onCloseEmptyModal}
                editModalData={editModalData}
              />
            ) : null}

            <Grid>
              <Card sx={{ boxShadow: "none", border: "1px solid #000" }}>
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
                      OnlineClasses List
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

                      <Tooltip title="Add OnlineClasses" placement="top">
                        <IconButton color="secondary" aria-label="delete" onClick={onOpenAddModal}>
                          <IconPlus size="27px" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </CardContent>

                <Divider />

                <OnlineClassesTableNew
                  filtereddata={filteredData}
                  onOpenEditModal={onOpenEditModal}
                  onOpenDeleteModal={onOpenDeleteModal}
                />
              </Card>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {series &&
              series.length > 0 &&
              series.map((v, i) => (
                <Accordion
                  expanded={expanded === `panel${i + 1}`}
                  onChange={handleChangeAcc(`panel${i + 1}`)}
                >
                  <AccordionSummary
                    aria-controls={`panel${i + 1}d-content`}
                    id={`panel${i + 1}d-header`}
                  >
                    <Typography>{v.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                      lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
                      leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
          </TabPanel>
        </SwipeableViews>
      </Box>
    </ThemeProvider>
  );
}

export default OnlineClasses;

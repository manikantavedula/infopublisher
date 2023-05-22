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
import { animatedClassesActions } from "slices/animatedClasses";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import AnimatedClassesTableNew from "./animatedClassesTableNew";
import { AnimatedClassesAddModal } from "./modals/animatedClassesAddModal";
import { AnimatedClassesEditModal } from "./modals/animatedClassesEditModal";
import { AnimatedClassesDeleteModal } from "./modals/animatedClassesDeleteModal";
import { AnimatedClassesViewModal } from "./modals/animatedClassesViewModal";
import { AnimatedClassesVideoModal } from "./modals/animatedClassesVideoModal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import {
  IconEye,
  IconSlideshow,
  IconEditCircle,
  IconEdit,
  IconTrash,
  IconVideo,
} from "@tabler/icons";

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

function AnimatedClasses() {
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
    dispatch(animatedClassesActions.getAll());
  }, []);

  const lesson = useSelector((state) => state.lesson.data);
  const series = useSelector((state) => state.series.data);
  const animatedClasses = useSelector((state) => state.animatedClasses.data);

  useEffect(() => {
    console.log(animatedClasses);
  }, [animatedClasses]);

  const filteredData = useMemo(() => {
    console.log(searchQuery);

    if (searchQuery.trim() === "") {
      return lesson;
    }

    const filteredAnimatedClasses = lesson.filter((item) => {
      console.log(item, item.name, item.name.toLowerCase(), searchQuery);
      return item.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
    });

    return filteredAnimatedClasses;
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

  const onOpenVideoModal = (val) => {
    setIsOpen(true);
    setWhichModal("video");
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

  const [expandedSeries, setExpandedSeries] = useState(false);
  const [expandedStandard, setExpandedStandard] = useState(false);
  const [expandedSubject, setExpandedSubject] = useState(false);
  const [expandedLesson, setExpandedLesson] = useState(false);
  const [expandedParts, setExpandedParts] = useState(false);

  const handleChangeAccSeries = (panel) => (event, newExpanded) => {
    setExpandedSeries(newExpanded ? panel : false);
    setExpandedStandard(false);
    setExpandedSubject(false);
    setExpandedLesson(false);
    setExpandedParts(false);
  };

  const handleChangeAccStandard = (panel) => (event, newExpanded) => {
    setExpandedStandard(newExpanded ? panel : false);
    setExpandedSubject(false);
    setExpandedLesson(false);
    setExpandedParts(false);
  };

  const handleChangeAccSubject = (panel) => (event, newExpanded) => {
    setExpandedSubject(newExpanded ? panel : false);
    setExpandedLesson(false);
    setExpandedParts(false);
  };

  const handleChangeAccLesson = (panel) => (event, newExpanded) => {
    setExpandedLesson(newExpanded ? panel : false);
    setExpandedParts(false);
  };

  const handleChangeAccParts = (panel) => (event, newExpanded) => {
    setExpandedParts(newExpanded ? panel : false);
  };

  return (
    <ThemeProvider>
      {isOpen && whichModal === "video" ? (
        <AnimatedClassesVideoModal
          isOpen={isOpen}
          onCloseEmpty={onCloseEmptyModal}
          editModalData={editModalData}
        />
      ) : null}

      <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
        {animatedClasses &&
          animatedClasses.length > 0 &&
          animatedClasses.map((v, i) => (
            <Accordion
              expanded={expandedSeries === `panelseries${i + 1}`}
              onChange={handleChangeAccSeries(`panelseries${i + 1}`)}
            >
              <AccordionSummary
                aria-controls={`panelseries${i + 1}d-content`}
                id={`panelseries${i + 1}d-header`}
              >
                <Typography>{v.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {v.data.length > 0 &&
                  v.data.map((w, j) => (
                    <Accordion
                      expanded={expandedStandard === `panelstandard${i + j + 1}`}
                      onChange={handleChangeAccStandard(`panelstandard${i + j + 1}`)}
                    >
                      <AccordionSummary
                        aria-controls={`panelstandard${i + j + 1}d-content`}
                        id={`panelstandard${i + j + 1}d-header`}
                      >
                        <Typography>{w.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {w.data.length > 0 &&
                          w.data.map((x, k) => (
                            <Accordion
                              expanded={expandedSubject === `panelsubject${i + j + k + 1}`}
                              onChange={handleChangeAccSubject(`panelsubject${i + j + k + 1}`)}
                            >
                              <AccordionSummary
                                aria-controls={`panelsubject${i + j + k + 1}d-content`}
                                id={`panelsubject${i + j + k + 1}d-header`}
                              >
                                <Typography>{x.name}</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                {x.data.length > 0 &&
                                  x.data.map((y, l) => (
                                    <Accordion
                                      expanded={
                                        expandedLesson === `panellesson${i + j + k + l + 1}`
                                      }
                                      onChange={handleChangeAccLesson(
                                        `panellesson${i + j + k + l + 1}`
                                      )}
                                    >
                                      <AccordionSummary
                                        aria-controls={`panellesson${i + j + k + l + 1}d-content`}
                                        id={`panellesson${i + j + k + l + 1}d-header`}
                                      >
                                        <Typography>{y.name}</Typography>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        {y.parts.length > 0 &&
                                          y.parts.map((z, m) => (
                                            <Accordion
                                              expanded={
                                                expandedParts ===
                                                `panelparts${i + j + k + l + m + 1}`
                                              }
                                              onChange={handleChangeAccParts(
                                                `panelparts${i + j + k + l + m + 1}`
                                              )}
                                            >
                                              <AccordionSummary
                                                aria-controls={`panelparts${
                                                  i + j + k + l + m + 1
                                                }d-content`}
                                                id={`panelparts${i + j + k + l + m + 1}d-header`}
                                              >
                                                <Typography>{z.name}</Typography>
                                              </AccordionSummary>
                                              <AccordionDetails>
                                                <Tooltip title="Animation Video" placement="top">
                                                  <IconButton
                                                    color="primary"
                                                    type="button"
                                                    onClick={() =>
                                                      onOpenVideoModal({
                                                        ...v,
                                                        videoType: "live",
                                                        lessonIdName: y.name,
                                                        name: z.name,
                                                        partNo: z.partNo,
                                                        liveVideoId: z.liveVideoId,
                                                        animationVideoId: z.animationVideoId,
                                                      })
                                                    }
                                                  >
                                                    <IconSlideshow size="24px" />
                                                  </IconButton>
                                                </Tooltip>
                                              </AccordionDetails>
                                            </Accordion>
                                          ))}
                                      </AccordionDetails>
                                    </Accordion>
                                  ))}
                              </AccordionDetails>
                            </Accordion>
                          ))}
                      </AccordionDetails>
                    </Accordion>
                  ))}
              </AccordionDetails>
            </Accordion>
          ))}
      </Box>
    </ThemeProvider>
  );
}

export default AnimatedClasses;

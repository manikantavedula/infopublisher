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
import { commonActions } from "slices/common";
import { onlineClassesActions } from "slices/onlineClasses";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import OnlineClassesTableNew from "./onlineClassesTableNew";
import { OnlineClassesAddModal } from "./modals/onlineClassesAddModal";
import { OnlineClassesEditModal } from "./modals/onlineClassesEditModal";
import { OnlineClassesDeleteModal } from "./modals/onlineClassesDeleteModal";
import { OnlineClassesViewModal } from "./modals/onlineClassesViewModal";
import { OnlineClassesVideoModal } from "./modals/onlineClassesVideoModal";
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
import { useNavigate } from "react-router-dom";
import { RefreshToken } from "layouts/callback";

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
  const navigate = useNavigate;

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
    dispatch(onlineClassesActions.getAll());

    dispatch(commonActions.getUserRole());

    const storedAccessToken = localStorage.getItem("access_token");
    const storedRefreshToken = localStorage.getItem("refresh_token");
    const storedUserInfoResponse = localStorage.getItem("userinfo_response");
    const expirationTimestamp = localStorage.getItem("expiration_timestamp");

    if (
      storedAccessToken &&
      storedRefreshToken &&
      expirationTimestamp &&
      storedUserInfoResponse &&
      Date.now() < expirationTimestamp
    ) {
      console.log("Auth is working fine.");
    } else if (expirationTimestamp && Date.now() > expirationTimestamp && storedRefreshToken) {
      console.log("refresh token for main layout");
      let status;

      (async () => {
        status = await RefreshToken();

        await dispatch(commonActions.storeTokens());

        await console.log("refresh token status", status);

        if (status === "error") {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("expiration_timestamp");
          localStorage.removeItem("userinfo_response");

          const storedAccessToken = localStorage.getItem("access_token");
          const storedRefreshToken = localStorage.getItem("refresh_token");
          const expirationTimestamp = localStorage.getItem("expiration_timestamp");
          const userInfoResponse = localStorage.getItem("userinfo_response");

          if (
            !storedAccessToken ||
            !storedRefreshToken ||
            !expirationTimestamp ||
            !userInfoResponse ||
            !(Date.now() < expirationTimestamp)
          ) {
            navigate("/");
          }
        }
      })();
    } else {
      navigate("/");
    }
  }, []);

  const lesson = useSelector((state) => state.lesson.data);
  const series = useSelector((state) => state.series.data);
  const onlineClasses = useSelector((state) => state.onlineClasses.data);

  useEffect(() => {
    console.log(onlineClasses);
  }, [onlineClasses]);

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

  function extractVideoId(url) {
    let videoId = null;

    // Match the video ID using regular expressions
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?/]+)/
    );

    if (match) {
      videoId = match[1];
    }

    return videoId;
  }

  return (
    <ThemeProvider>
      {isOpen && whichModal === "video" ? (
        <OnlineClassesVideoModal
          isOpen={isOpen}
          onCloseEmpty={onCloseEmptyModal}
          editModalData={editModalData}
        />
      ) : null}

      <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
        {onlineClasses &&
          onlineClasses.length > 0 &&
          onlineClasses.map((v, i) => (
            <Accordion
              expanded={expandedSeries === `panelseries${i + 1}`}
              onChange={handleChangeAccSeries(`panelseries${i + 1}`)}
              key={`panelseries${i + 1}`}
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
                      key={`panelstandard${i + j + 1}`}
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
                              key={`panelsubject${i + j + k + 1}`}
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
                                      key={`panellesson${i + j + k + l + 1}`}
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
                                              key={`panelparts${i + j + k + l + m + 1}`}
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
                                                {!z.liveVideoId ? null : (
                                                  <Tooltip
                                                    title="Live Video"
                                                    placement="top"
                                                    className={z.liveVideoId}
                                                  >
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
                                                          liveVideoId: extractVideoId(
                                                            z.liveVideoId
                                                          ),
                                                        })
                                                      }
                                                    >
                                                      <IconVideo size="24px" />
                                                    </IconButton>
                                                  </Tooltip>
                                                )}
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

export default OnlineClasses;

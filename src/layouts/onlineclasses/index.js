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

import whizkid from "../../assets/images/whizkid.png";
import smartlearn from "../../assets/images/smartlearn.png";
import globalsmart from "../../assets/images/globalsmart.png";

import CryptoJS from "crypto-js";
import { fontWeight } from "@mui/system";

import YouTubeIcon from "@mui/icons-material/YouTube";
import { Container } from "react-bootstrap";

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

function decryptObject(ciphertext, secretKey) {
  // Decrypt the object using AES
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);

  console.log(plaintext);
  return JSON.parse(plaintext);
}

function OnlineClasses() {
  console.log("In OnlineClasses");

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
  const [loginAccessRole, setLoginAccessRole] = useState("");
  const [allowedClassess, setAllowedClassess] = useState([]);

  const dispatch = useDispatch();

  const onlineClasses = useSelector((state) => state.onlineClasses.data);

  useLayoutEffect(() => {
    setIsLoading(true);

    console.log(onlineClasses);

    if (!onlineClasses || onlineClasses.length <= 0) dispatch(onlineClassesActions.getAll());
  }, [onlineClasses]);

  const key = localStorage.getItem("key_for_access");
  const login_role_data = localStorage.getItem("access_role_data");
  const decryptedObject = decryptObject(login_role_data, key);
  const accessRole = decryptedObject.role;

  const [filteredSchoolOnlineClasses, setFilteredSchoolOnlineClasses] = useState(onlineClasses);

  useEffect(() => {
    console.log(filteredSchoolOnlineClasses);
  }, [filteredSchoolOnlineClasses]);

  useEffect(() => {
    console.log(onlineClasses);

    if (onlineClasses && onlineClasses.length > 0) {
      console.log(onlineClasses);

      setFilteredSchoolOnlineClasses(onlineClasses);

      if (accessRole === "school") {
        setLoginAccessRole(accessRole);

        console.log(decryptedObject);

        const inputString = decryptedObject["school_series"];
        const pairs = inputString.split(", ");
        const result = [];

        pairs.forEach((pair) => {
          const [id, standard] = pair.split("|-|");

          // Check if the ID already exists in the result array
          const existingItem = result.find((item) => item.id === parseInt(id));
          if (existingItem) {
            // If the ID already exists, add the standard number to its 'standard' array
            existingItem.standard.push(parseInt(standard));
          } else {
            // If the ID doesn't exist, create a new object and push it to the result array
            result.push({
              id: parseInt(id),
              standard: [parseInt(standard)],
            });
          }
        });

        console.log(result);

        setAllowedClassess(result);

        let filteredClasses = onlineClasses
          .filter((classObj) => {
            return result.some((formodObj) => classObj.series_id === formodObj.id);
          })
          .map((classObj) => {
            let filteredData = classObj.data.filter((dataObj) => {
              return result.some(
                (formodObj) =>
                  classObj.series_id === formodObj.id &&
                  formodObj.standard.includes(dataObj.standard_id)
              );
            });

            return { ...classObj, data: filteredData };
          });

        console.log(onlineClasses, result, filteredClasses);

        setFilteredSchoolOnlineClasses(filteredClasses);
      } else if (accessRole === "student") {
        setLoginAccessRole(accessRole);

        console.log(onlineClasses, decryptedObject);

        let filteredClasses = onlineClasses
          .map((classItem) => {
            const matchingCriteria = decryptedObject.formatted_data.filter((criterion) => {
              const [seriesId, standardId] = criterion.split("|-|");
              return (
                classItem.series_id === parseInt(seriesId) &&
                classItem.data.some((dataItem) => dataItem.standard_id === parseInt(standardId))
              );
            });

            const filteredData = classItem.data.filter((dataItem) => {
              return matchingCriteria.some((criterion) => {
                const [seriesId, standardId] = criterion.split("|-|");
                return dataItem.standard_id === parseInt(standardId);
              });
            });

            return { ...classItem, data: filteredData };
          })
          .filter((classItem) => {
            return decryptedObject.formatted_data.some((criterion) => {
              const [seriesId] = criterion.split("|-|");
              return classItem.series_id === parseInt(seriesId);
            });
          });

        console.log(onlineClasses, filteredClasses);

        setFilteredSchoolOnlineClasses(filteredClasses);
      }

      setIsLoading(false);
    }
  }, [onlineClasses]);

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
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {!isLoading && (
        <>
          {isOpen && whichModal === "video" ? (
            <OnlineClassesVideoModal
              isOpen={isOpen}
              onCloseEmpty={onCloseEmptyModal}
              editModalData={editModalData}
            />
          ) : null}

          {accessRole === "other" ? (
            <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
              {filteredSchoolOnlineClasses &&
                filteredSchoolOnlineClasses.length > 0 &&
                filteredSchoolOnlineClasses.map((v, i) => (
                  <Accordion
                    expanded={expandedSeries === `panelseries${i + 1}`}
                    onChange={handleChangeAccSeries(`panelseries${i + 1}`)}
                    key={`panelseries${i + 1}`}
                  >
                    <AccordionSummary
                      aria-controls={`panelseries${i + 1}d-content`}
                      id={`panelseries${i + 1}d-header`}
                    >
                      {/* <Typography>{v.name}</Typography> */}
                      <Typography>
                        {v.name === "Whiz Kid" ? (
                          <img src={whizkid} width={100} />
                        ) : v.name === "Smart Learn" ? (
                          <img src={smartlearn} width={100} />
                        ) : (
                          <img src={globalsmart} width={100} />
                        )}
                      </Typography>
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
                                    onChange={handleChangeAccSubject(
                                      `panelsubject${i + j + k + 1}`
                                    )}
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
                                              aria-controls={`panellesson${
                                                i + j + k + l + 1
                                              }d-content`}
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
                                                      id={`panelparts${
                                                        i + j + k + l + m + 1
                                                      }d-header`}
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
          ) : (
            <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
              {filteredSchoolOnlineClasses &&
                filteredSchoolOnlineClasses.length > 0 &&
                filteredSchoolOnlineClasses.map((v, i) => (
                  <AccordionDetails>
                    {v.data.length > 0 &&
                      v.data.map((w, j) => (
                        <Accordion
                          expanded={
                            expandedStandard === `panelstandard${v.name + w.name + i + j + 1}`
                          }
                          onChange={handleChangeAccStandard(
                            `panelstandard${v.name + w.name + i + j + 1}`
                          )}
                          key={`panelstandard${i + j + 1}`}
                        >
                          <AccordionSummary
                            aria-controls={`panelstandard${v.name + w.name + i + j + 1}d-content`}
                            id={`panelstandard${v.name + w.name + i + j + 1}d-header`}
                          >
                            <Box>
                              <Typography>
                                {v.name === "Whiz Kid" ? (
                                  <img src={whizkid} width={100} />
                                ) : v.name === "Smart Learn" ? (
                                  <img src={smartlearn} width={100} />
                                ) : (
                                  <img src={globalsmart} width={100} />
                                )}{" "}
                              </Typography>

                              <Typography>
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                  }}
                                >
                                  {w.name} Class
                                </span>
                              </Typography>
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails>
                            {w.data.length > 0 &&
                              w.data.map((x, k) => (
                                <Accordion
                                  expanded={
                                    expandedSubject ===
                                    `panelsubject${v.name + w.name + x.name + i + j + k + 1}`
                                  }
                                  onChange={handleChangeAccSubject(
                                    `panelsubject${v.name + w.name + x.name + i + j + k + 1}`
                                  )}
                                  key={`panelsubject${i + j + k + 1}`}
                                >
                                  <AccordionSummary
                                    aria-controls={`panelsubject${
                                      v.name + w.name + x.name + i + j + k + 1
                                    }d-content`}
                                    id={`panelsubject${
                                      v.name + w.name + x.name + i + j + k + 1
                                    }d-header`}
                                  >
                                    <Typography>{x.name}</Typography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    {x.data.length > 0 &&
                                      x.data.map((y, l) => (
                                        <Accordion
                                          expanded={
                                            expandedLesson ===
                                            `panellesson${
                                              v.name + w.name + x.name + y.name + i + j + k + l + 1
                                            }`
                                          }
                                          onChange={handleChangeAccLesson(
                                            `panellesson${
                                              v.name + w.name + x.name + y.name + i + j + k + l + 1
                                            }`
                                          )}
                                          key={`panellesson${
                                            v.name + w.name + x.name + y.name + i + j + k + l + 1
                                          }`}
                                        >
                                          <AccordionSummary
                                            aria-controls={`panellesson${
                                              v.name + w.name + x.name + y.name + i + j + k + l + 1
                                            }d-content`}
                                            id={`panellesson${
                                              v.name + w.name + x.name + y.name + i + j + k + l + 1
                                            }d-header`}
                                          >
                                            <Typography>{y.name}</Typography>
                                          </AccordionSummary>
                                          <AccordionDetails>
                                            <Grid container spacing={2}>
                                              {y.parts.length > 0 &&
                                                y.parts.map(
                                                  (z, m) =>
                                                    z.liveVideoId && (
                                                      <Grid item xs={4} sm={4} md={2}>
                                                        <Box>
                                                          <Tooltip
                                                            title="Live Video"
                                                            placement="top"
                                                            className={z.liveVideoId}
                                                          >
                                                            <IconButton
                                                              color="error"
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
                                                              <YouTubeIcon
                                                                sx={{ cursor: "pointer" }}
                                                              />{" "}
                                                            </IconButton>
                                                          </Tooltip>
                                                          <Typography>Part {m + 1}</Typography>
                                                        </Box>
                                                      </Grid>
                                                    )
                                                )}
                                            </Grid>
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
                ))}
            </Box>
          )}
        </>
      )}
    </ThemeProvider>
  );
}

export default OnlineClasses;

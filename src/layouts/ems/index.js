import React, { useState } from "react";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { Box, Drawer, Button, Paper, Typography, IconButton, useMediaQuery } from "@mui/material";
import { CheckCircle, Error, Flag } from "@mui/icons-material";
import { questionsDrawerWidth } from "store/constant";
import { SET_MENU } from "store/actions";

import { useDispatch, useSelector } from "react-redux";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";
import { BrowserView, MobileView } from "react-device-detect";
import { useEffect } from "react";

const FlagIcon = () => {
  return <Flag color="primary" fontSize="small" />;
};

const AttemptedIcon = () => {
  return <CheckCircle color="primary" fontSize="small" />;
};

const RootContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: (theme) => theme.spacing(3),
});

const NumberPanelRootContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  gap: "15px",
  flexWrap: "wrap",
  alignItems: "center",
});

const NumberPanelCircle = styled("div")({
  backgroundColor: "white",
  border: "1px solid black",
  borderRadius: "50%",
  width: "35px",
  height: "35px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const questionsData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
    answer: "Leonardo da Vinci",
  },
  {
    id: 3,
    question: "What is the symbol for potassium?",
    options: ["K", "P", "Pt", "Ka"],
    answer: "K",
  },
];

const ExaminationManagementSystem = () => {
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };

  const theme = useTheme();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(Array(questionsData.length).fill(null));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questionsData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionsData.length - 1;

  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    handleLeftDrawerToggle();
  }, []);

  const container = window !== undefined ? () => window.document.body + 260 : undefined;

  const drawer = (
    <>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 88px)",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <NumberPanelRootContainer>
            {Array.from(Array(50).keys()).map((number) => (
              <NumberPanelCircle key={number}>{number + 1}</NumberPanelCircle>
            ))}
          </NumberPanelRootContainer>
        </PerfectScrollbar>
      </BrowserView>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ flexShrink: { md: 0 }, width: matchUpMd ? questionsDrawerWidth : "auto" }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant={matchUpMd ? "persistent" : "temporary"}
          anchor="left"
          sx={{
            "& .MuiDrawer-paper": {
              width: questionsDrawerWidth,
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
              borderRight: "none",
              [theme.breakpoints.up("md")]: {
                top: "88px",
              },
            },
          }}
          ModalProps={{ keepMounted: true }}
          color="inherit"
          open={true}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default ExaminationManagementSystem;

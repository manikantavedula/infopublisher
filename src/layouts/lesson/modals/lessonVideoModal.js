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
import { lessonActions } from "slices/lesson";
import { typeOfVideosActions } from "slices/typeOfVideos";
// import { styled } from "@mui/material/styles";
import { Close } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { capitalizeString } from "../../../utils/capitalize";
import VideoPlayer from "layouts/videoplayer";

export function LessonVideoModal({ isOpen, onCloseEmpty, editModalData, videoType }) {
  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle className="flex justify-content-between">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box padding="8px" fontSize={18}>
            {`${editModalData.lessonIdName} (${editModalData.type} ${editModalData.part_no}) - ${editModalData.name}`}
          </Box>

          <IconButton onClick={onCloseEmpty}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {videoType === "live" ? (
          <VideoPlayer videoId={editModalData.live_video_id} />
        ) : (
          <VideoPlayer videoId={editModalData.animation_video_id} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default LessonVideoModal;

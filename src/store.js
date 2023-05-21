import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { seriesReducer } from "./slices/series";
import { schoolReducer } from "./slices/school";
import { studentReducer } from "./slices/student";
import { standardReducer } from "./slices/standard";
import { subjectReducer } from "./slices/subject";
import { lessonReducer } from "./slices/lesson";
import { onlineClassesReducer } from "./slices/onlineClasses";
import { typeOfVideosReducer } from "./slices/typeOfVideos";
import customizationReducer from "./store/customizationReducer";

const middleware = [...getDefaultMiddleware(), thunk, logger];

const store = configureStore({
  reducer: {
    series: seriesReducer,
    school: schoolReducer,
    standard: standardReducer,
    subject: subjectReducer,
    lesson: lessonReducer,
    onlineClasses: onlineClassesReducer,
    student: studentReducer,
    typeOfVideos: typeOfVideosReducer,
    customization: customizationReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [],
});

export default store;

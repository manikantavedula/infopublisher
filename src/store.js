import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { commonReducer } from "./slices/common";
import { seriesReducer } from "./slices/series";
import { distributorReducer } from "./slices/distributor";
import { schoolReducer } from "./slices/school";
import { studentReducer } from "./slices/student";
import { standardReducer } from "./slices/standard";
import { subjectReducer } from "./slices/subject";
import { lessonReducer } from "./slices/lesson";
import { onlineClassesReducer } from "./slices/onlineClasses";
import { animatedClassesReducer } from "./slices/animatedClasses";
import { typeOfVideosReducer } from "./slices/typeOfVideos";
import customizationReducer from "./store/customizationReducer";
import { OTPVerificationApi, OTPVerificationApiReducer } from "slices/get/OTPVerificationApi";
import { lessonApi } from "slices/get/lesson";

const middleware = [thunk, logger];

const store = configureStore({
  reducer: {
    common: commonReducer,
    series: seriesReducer,
    distributor: distributorReducer,
    school: schoolReducer,
    standard: standardReducer,
    subject: subjectReducer,
    lesson: lessonReducer,
    onlineClasses: onlineClassesReducer,
    animatedClasses: animatedClassesReducer,
    student: studentReducer,
    typeOfVideos: typeOfVideosReducer,
    customization: customizationReducer,
    [OTPVerificationApi.reducerPath]: OTPVerificationApi.reducer,
    [lessonApi.reducerPath]: lessonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(middleware)
      .concat(OTPVerificationApi.middleware)
      .concat(lessonApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [],
});

setupListeners(store.dispatch);

export default store;

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { commonReducer } from "./slices/common";
import { seriesReducer } from "./slices/series";
import { schoolReducer } from "./slices/school";
import { studentReducer } from "./slices/student";
import { standardReducer } from "./slices/standard";
import { subjectReducer } from "./slices/subject";
import { lessonReducer } from "./slices/lesson";
import { onlineClassesReducer } from "./slices/onlineClasses";
import { animatedClassesReducer } from "./slices/animatedClasses";
import { typeOfVideosReducer } from "./slices/typeOfVideos";
import customizationReducer from "./store/customizationReducer";

import courseSlice from "../src/layouts/home/redux/features/course-slice";
import cartSlice from "../src/layouts/home/redux/features/cart-slice";
import wishlistSlice from "../src/layouts/home/redux/features/wishlist-slice";
import eventSlice from "../src/layouts/home/redux/features/event-slice";
import filterSlice from "../src/layouts/home/redux/features/filter-slice";
import authSlice from "../src/layouts/home/redux/features/auth-slice";

const middleware = [...getDefaultMiddleware(), thunk, logger];

const store = configureStore({
  reducer: {
    common: commonReducer,
    series: seriesReducer,
    school: schoolReducer,
    standard: standardReducer,
    subject: subjectReducer,
    lesson: lessonReducer,
    onlineClasses: onlineClassesReducer,
    animatedClasses: animatedClassesReducer,
    student: studentReducer,
    typeOfVideos: typeOfVideosReducer,
    customization: customizationReducer,

    auth: authSlice,
    courses: courseSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    event: eventSlice,
    filter: filterSlice,
  },
  middleware,
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [],
});

export default store;

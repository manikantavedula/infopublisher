import { lazy } from "react";

import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";

// @mui icons
// import {
//   Dashboard as DashboardIcon,
//   // PeopleAlt,
//   LineWeight,
//   School as SchoolIcon,
//   Class,
//   Groups,
//   OndemandVideo,
//   Quiz,
//   Assignment,
//   Today,
// } from "@mui/icons-material";

// import Distributors from "layouts/distributors";

const Dashboard = Loadable(lazy(() => import("views/dashboard/Default")));
const Series = Loadable(lazy(() => import("layouts/series")));
const School = Loadable(lazy(() => import("layouts/school")));
const Standard = Loadable(lazy(() => import("layouts/standard")));
const Subject = Loadable(lazy(() => import("layouts/subject")));
const Lesson = Loadable(lazy(() => import("layouts/lesson")));
const Student = Loadable(lazy(() => import("layouts/student")));
const OnlineClasses = Loadable(lazy(() => import("layouts/onlineclasses")));
const AnimatedClasses = Loadable(lazy(() => import("layouts/animatedclasses")));
const PrepareTest = Loadable(lazy(() => import("layouts/preparetest")));
const Exam = Loadable(lazy(() => import("layouts/exam")));
const EMS = Loadable(lazy(() => import("layouts/ems")));

// const Attendance = Loadable(lazy(() => import("layouts/attendance")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "dashboard",
      children: [
        {
          path: "default",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "series",
          element: <Series />,
        },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "subject",
          element: <Subject />,
        },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "school",
          element: <School />,
        },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "standard",
          element: <Standard />,
        },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "lesson",
          element: <Lesson />,
        },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "student",
          element: <Student />,
        },
      ],
    },
    {
      path: "learn",
      children: [
        {
          path: "online-classes",
          element: <OnlineClasses />,
        },
      ],
    },
    {
      path: "learn",
      children: [
        {
          path: "animated-classes",
          element: <AnimatedClasses />,
        },
      ],
    },
    {
      path: "assess",
      children: [
        {
          path: "ems",
          element: <EMS />,
        },
      ],
    },
    {
      path: "assess",
      children: [
        {
          path: "exam",
          element: <Exam />,
        },
      ],
    },
    {
      path: "prepare",
      children: [
        {
          path: "test",
          element: <PrepareTest />,
        },
      ],
    },
  ],
};

export default MainRoutes;

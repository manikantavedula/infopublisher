import Dashboard from "layouts/dashboard";
// import Distributors from "layouts/distributors";
import Series from "layouts/series";
import School from "layouts/school";
import Standard from "layouts/standard";
import Student from "layouts/student";
import OnlineClasses from "layouts/onlineclasses";
import Assessments from "layouts/assessments";
import Exams from "layouts/exams";
import Attendance from "layouts/attendance";

// @mui icons
import {
  Dashboard as DashboardIcon,
  // PeopleAlt,
  LineWeight,
  School as SchoolIcon,
  Class,
  Groups,
  OndemandVideo,
  Quiz,
  Assignment,
  Today,
} from "@mui/icons-material";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <DashboardIcon />,
    route: "/dashboard",
    component: <Dashboard />,
  },
  // {
  //   type: "collapse",
  //   name: "Distributors",
  //   key: "distributors",
  //   icon: <PeopleAlt />,
  //   route: "/distributors",
  //   component: <Distributors />,
  // },
  {
    type: "collapse",
    name: "Series",
    key: "series",
    icon: <LineWeight />,
    route: "/series",
    component: <Series />,
  },
  {
    type: "collapse",
    name: "School",
    key: "school",
    icon: <SchoolIcon />,
    route: "/school",
    component: <School />,
  },
  {
    type: "collapse",
    name: "Standard",
    key: "standard",
    icon: <Class />,
    route: "/standard",
    component: <Standard />,
  },
  {
    type: "collapse",
    name: "Student",
    key: "student",
    icon: <Groups />,
    route: "/student",
    component: <Student />,
  },
  {
    type: "collapse",
    name: "Online Classes",
    key: "onlineclasses",
    icon: <OndemandVideo />,
    route: "/onlineclasses",
    component: <OnlineClasses />,
  },
  {
    type: "collapse",
    name: "Assessments",
    key: "assessments",
    icon: <Quiz />,
    route: "/authentication/assessments",
    component: <Assessments />,
  },
  {
    type: "collapse",
    name: "Exams",
    key: "exams",
    icon: <Assignment />,
    route: "/authentication/exams",
    component: <Exams />,
  },
  {
    type: "collapse",
    name: "Attendance",
    key: "attendance",
    icon: <Today />,
    route: "/authentication/exams",
    component: <Attendance />,
  },
];

export default routes;

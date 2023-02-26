import Dashboard from "layouts/dashboard";
import Distributors from "layouts/distributors";
import Series from "layouts/series";
import Schools from "layouts/schools";
import Students from "layouts/students";
import OnlineClasses from "layouts/onlineclasses";
import Assessments from "layouts/assessments";
import Exams from "layouts/exams";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/infopublisher/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Distributors",
    key: "distributors",
    icon: <Icon fontSize="small">people_alt</Icon>,
    route: "/infopublisher/distributors",
    component: <Distributors />,
  },
  {
    type: "collapse",
    name: "Series",
    key: "series",
    icon: <Icon fontSize="small">line_weight</Icon>,
    route: "/infopublisher/series",
    component: <Series />,
  },
  {
    type: "collapse",
    name: "Schools",
    key: "schools",
    icon: <Icon fontSize="small">corporate_fare</Icon>,
    route: "/infopublisher/schools",
    component: <Schools />,
  },
  {
    type: "collapse",
    name: "Students",
    key: "students",
    icon: <Icon fontSize="small">groups2</Icon>,
    route: "/infopublisher/students",
    component: <Students />,
  },
  {
    type: "collapse",
    name: "Online Classes",
    key: "online-classes",
    icon: <Icon fontSize="small">ondemand_video</Icon>,
    route: "/infopublisher/online-classes",
    component: <OnlineClasses />,
  },
  {
    type: "collapse",
    name: "Assessments",
    key: "assessments",
    icon: <Icon fontSize="small">quiz</Icon>,
    route: "/infopublisher/authentication/assessments",
    component: <Assessments />,
  },
  {
    type: "collapse",
    name: "Exams",
    key: "exams",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/infopublisher/authentication/exams",
    component: <Exams />,
  },
];

export default routes;

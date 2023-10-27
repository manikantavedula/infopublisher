import { useRoutes } from "react-router-dom";

// routes
import MainRoutes, {
  DashboardRoutes,
  RestrictedSchoolRoutes,
  RestrictedStudentRoutes,
} from "./MainRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import { useSelector } from "react-redux";
import { useEffect } from "react";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const user = useSelector((state) => state.common.role);

  useEffect(() => {
    console.log("routes", user);
  }, [user]);

  return useRoutes(
    user.role === "none"
      ? [AuthenticationRoutes, MainRoutes]
      : user.role === "admin"
      ? [AuthenticationRoutes, MainRoutes]
      : user.role === "school"
      ? [AuthenticationRoutes, RestrictedSchoolRoutes]
      : user.role === "student"
      ? [AuthenticationRoutes, RestrictedStudentRoutes]
      : null
  );
}

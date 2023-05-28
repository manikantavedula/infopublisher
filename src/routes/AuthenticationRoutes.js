import { lazy } from "react";

// project imports
import Loadable from "ui-component/Loadable";
import MinimalLayout from "layout/MinimalLayout";

// login option 3 routing
const AuthLogin3 = Loadable(
  lazy(() => import("views/pages/authentication/authentication3/Login3"))
);
const AuthRegister3 = Loadable(
  lazy(() => import("views/pages/authentication/authentication3/Register3"))
);
const Callback = Loadable(lazy(() => import("layouts/callback")));
// const Home = Loadable(lazy(() => import("layouts/home/homes/home-kindergarten")));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/",
      element: <AuthLogin3 />,
    },
    {
      path: "/callback",
      element: <Callback />,
    },
    // {
    //   path: "/home",
    //   element: <Home />,
    // },
    // {
    //   path: "/pages/register/register3",
    //   element: <AuthRegister3 />,
    // },
  ],
};

export default AuthenticationRoutes;

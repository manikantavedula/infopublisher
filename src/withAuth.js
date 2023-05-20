import React from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/function-component-definition
const withAuth = (WrappedComponent) => (props) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token"); // Check if the user is logged in or has a token

  if (!isLoggedIn) {
    // Redirect to the login page if not logged in
    navigate("/sign-in");
    return null;
  }

  // Render the protected component if logged in
  return <WrappedComponent {...props} />;
};

export default withAuth;

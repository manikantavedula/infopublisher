import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
    // You can log the error or perform any other necessary actions here
    console.error(error, errorInfo);
  }

  handleLogout() {
    console.log("Logout");

    localStorage.removeItem("access_token");
    localStorage.removeItem("access_role");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expiration_timestamp");
    localStorage.removeItem("userinfo_response");

    const storedAccessToken = localStorage.getItem("access_token");
    const storedRefreshToken = localStorage.getItem("refresh_token");
    const expirationTimestamp = localStorage.getItem("expiration_timestamp");
    const userInfoResponse = localStorage.getItem("userinfo_response");
    const accessRole = localStorage.getItem("access_role");

    if (!accessRole) {
      window.location.href = "/";
    }

    if (
      !storedAccessToken ||
      !storedRefreshToken ||
      !expirationTimestamp ||
      !userInfoResponse ||
      !(Date.now() < expirationTimestamp)
    ) {
      window.location.href = "/";
    }
  }

  render() {
    if (this.state.hasError) {
      // You can customize the error message or fallback UI here
      return (
        <div>
          <h1>
            Something went wrong.{" "}
            <span
              style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
              onClick={() => this.handleLogout()}
            >
              Logout
            </span>
          </h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

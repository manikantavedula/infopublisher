export const getGoogleUrl = () => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  const options = {
    redirect_uri: process.env.REACT_APP_OAUTH_REDIRECT,
    client_id: process.env.REACT_APP_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "none",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      // "https://www.googleapis.com/auth/gmail.readonly",
    ].join(" "),
    state: "/login",
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};

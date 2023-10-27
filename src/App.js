import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routing
import Routes from "routes";

// defaultTheme
import themes from "./themes";

// project imports
import NavigationScroll from "./layout/NavigationScroll";
import { GoogleOAuthProvider } from "@react-oauth/google";

// ==============================|| APP ||============================== //

function App() {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </StyledEngineProvider>
  );
}

export default App;

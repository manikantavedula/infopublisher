import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const name = "common";

function createInitialState() {
  return {
    credentialResponse: null,
    emailCheck: null,
    tokens: null,
    role: { role: "none" },
    isLoading: false,
    error: null,
  };
}

const initialState = createInitialState();

function createExtraActions() {
  function getCredentialResponse(credentialResponse) {
    return createAsyncThunk("commonSlice/fetchData", async () => {
      return credentialResponse;
    });
  }

  function setUserRole() {
    return createAsyncThunk("commonSlice/setUserRole", async () => {
      const role = localStorage.getItem("role");

      return { role };
    });
  }

  function getUserRole() {
    return createAsyncThunk("commonSlice/fetchUserRole", async () => {
      const storedAccessToken = localStorage.getItem("access_token");
      const storedUserInfoResponse = localStorage.getItem("userinfo_response");
      const role = localStorage.getItem("role");
      const { email } = JSON.parse(storedUserInfoResponse).data;
      console.log(role, email);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/common/api/role`,
          {
            role,
            email,
          },
          {
            headers: {
              Authorization: `Bearer ${storedAccessToken}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "https://app.infopublisher.in",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Access-Control-Allow-Headers":
                "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type",
              "Access-Control-Allow-Credentials": "true",
            },
          }
        );

        return response.data;
      } catch (error) {
        console.log(error);
      }
    });
  }

  function storeTokens() {
    return createAsyncThunk("commonSlice/storeTokens", async () => {
      const storedAccessToken = localStorage.getItem("access_token");
      const storedRefreshToken = localStorage.getItem("refresh_token");
      const email = localStorage.getItem("email_check");
      console.log(storedAccessToken, storedRefreshToken);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/common/api/storeTokens`,
          {
            email,
            storedAccessToken,
            storedRefreshToken,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "https://app.infopublisher.in",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Access-Control-Allow-Headers":
                "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type",
              "Access-Control-Allow-Credentials": "true",
            },
          }
        );

        return response.data;
      } catch (error) {
        console.log(error);
      }
    });
  }

  function getEmailCheck() {
    return createAsyncThunk("commonSlice/fetchEmailCheck", async () => {
      const email_check = localStorage.getItem("email_check");
      console.log(email_check);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/common/api/login`,
          {
            email: email_check,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "https://app.infopublisher.in",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Access-Control-Allow-Headers":
                "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type",
              "Access-Control-Allow-Credentials": "true",
            },
          }
        );

        return response.data;
      } catch (error) {
        console.log(error);
      }
    });
  }

  return {
    getCredentialResponse: getCredentialResponse(),
    storeTokens: storeTokens(),
    setUserRole: setUserRole(),
    getUserRole: getUserRole(),
    getEmailCheck: getEmailCheck(),
  };
}

const extraActions = createExtraActions();

function createExtraReducers() {
  function getCredentialResponse() {
    const { pending, fulfilled, rejected } = extraActions.getCredentialResponse;

    return {
      [pending]: (state) => ({ ...state, isLoading: true }),
      [fulfilled]: (state, action) => ({
        ...state,
        credentialResponse: action.payload,
        isLoading: false,
        error: null,
      }),
      [rejected]: (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }),
    };
  }

  function setUserRole() {
    const { pending, fulfilled, rejected } = extraActions.setUserRole;

    return {
      [pending]: (state) => ({ ...state, isLoading: true }),
      [fulfilled]: (state, action) => ({
        ...state,
        role: action.payload,
        isLoading: false,
        error: null,
      }),
      [rejected]: (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }),
    };
  }

  function getUserRole() {
    const { pending, fulfilled, rejected } = extraActions.getUserRole;

    return {
      [pending]: (state) => ({ ...state, isLoading: true }),
      [fulfilled]: (state, action) => ({
        ...state,
        role: action.payload,
        isLoading: false,
        error: null,
      }),
      [rejected]: (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }),
    };
  }

  function storeTokens() {
    const { pending, fulfilled, rejected } = extraActions.storeTokens;

    return {
      [pending]: (state) => ({ ...state, isLoading: true }),
      [fulfilled]: (state, action) => ({
        ...state,
        tokens: action.payload,
        isLoading: false,
        error: null,
      }),
      [rejected]: (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }),
    };
  }

  function getEmailCheck() {
    const { pending, fulfilled, rejected } = extraActions.getEmailCheck;

    return {
      [pending]: (state) => ({ ...state, isLoading: true }),
      [fulfilled]: (state, action) => ({
        ...state,
        emailCheck: action.payload,
        isLoading: false,
        error: null,
      }),
      [rejected]: (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }),
    };
  }

  return {
    ...getCredentialResponse(),
    ...getUserRole(),
    ...setUserRole(),
    ...storeTokens(),
    ...getEmailCheck(),
  };
}

const extraReducers = createExtraReducers();

const commonSlice = createSlice({ name, initialState, extraReducers });

export const commonActions = { ...commonSlice.actions, ...extraActions };
export const commonReducer = commonSlice.reducer;

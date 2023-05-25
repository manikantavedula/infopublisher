import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const name = "common";

function createInitialState() {
  return {
    credentialResponse: null,
    emailCheck: null,
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
              "Access-Control-Allow-Origin": "*",
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
    ...getEmailCheck(),
  };
}

const extraReducers = createExtraReducers();

const commonSlice = createSlice({ name, initialState, extraReducers });

export const commonActions = { ...commonSlice.actions, ...extraActions };
export const commonReducer = commonSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const name = "onlineClasses";

function createInitialState() {
  return {
    data: null,
    isLoading: false,
    error: null,
    filteredOnlineClasses: null,
  };
}

const initialState = createInitialState();

function createExtraActions() {
  function getFilteredOnlineClasses(data) {
    console.log(data);
    return createAsyncThunk("onlineClassesSlice/filteredOnlineClasses", async () => {
      return data;
    });
  }

  function getAll() {
    return createAsyncThunk("onlineClassesSlice/fetchData", async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/onlineClasses/data`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://app.infopublisher.in",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      return response.data;
    });
  }

  return {
    getFilteredOnlineClasses: getFilteredOnlineClasses(),
    getAll: getAll(),
  };
}

const extraActions = createExtraActions();

function createExtraReducers() {
  function getFilteredOnlineClasses() {
    const { pending, fulfilled, rejected } = extraActions.getFilteredOnlineClasses;

    return {
      [pending]: (state) => ({ ...state, isLoading: true }),
      [fulfilled]: (state, action) => ({
        ...state,
        filteredOnlineClasses: action.payload,
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

  function getAll() {
    const { pending, fulfilled, rejected } = extraActions.getAll;

    return {
      [pending]: (state) => ({ ...state, isLoading: true }),
      [fulfilled]: (state, action) => ({
        ...state,
        data: action.payload,
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
    ...getFilteredOnlineClasses(),
    ...getAll(),
  };
}

const extraReducers = createExtraReducers();

const onlineClassesSlice = createSlice({ name, initialState, extraReducers });

export const onlineClassesActions = { ...onlineClassesSlice.actions, ...extraActions };
export const onlineClassesReducer = onlineClassesSlice.reducer;

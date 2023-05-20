import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const name = "lesson";

function createInitialState() {
  return {
    data: null,
    selectedData: null,
    isLoading: false,
    error: null,
  };
}

const initialState = createInitialState();

function createExtraActions() {
  function getAll() {
    return createAsyncThunk("lessonSlice/fetchData", async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/lesson/data`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      return response.data;
    });
  }

  function getSome(series, standard, subject) {
    console.log(series, standard, subject);
    return createAsyncThunk("lessonSlice/fetchDataById", async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/lesson/dataById`,
        {
          series,
          standard,
          subject,
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
    });
  }

  return {
    getAll: getAll(),
    getSome: getSome(),
  };
}

const extraActions = createExtraActions();

function createExtraReducers() {
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

  function getSome() {
    const { pending, fulfilled, rejected } = extraActions.getSome;

    return {
      [pending]: (state) => ({ ...state, isLoading: true }),
      [fulfilled]: (state, action) => ({
        ...state,
        selectedData: action.payload,
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
    ...getAll(),
    ...getSome(),
  };
}

const extraReducers = createExtraReducers();

const lessonSlice = createSlice({ name, initialState, extraReducers });

export const lessonActions = { ...lessonSlice.actions, ...extraActions };
export const lessonReducer = lessonSlice.reducer;

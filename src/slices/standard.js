import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const name = "standard";

function createInitialState() {
  return {
    data: null,
    isLoading: false,
    error: null,
  };
}

const initialState = createInitialState();

function createExtraActions() {
  function getAll() {
    return createAsyncThunk("standardSlice/fetchData", async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/standard/data`, {
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

  return {
    getAll: getAll(),
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

  return {
    ...getAll(),
  };
}

const extraReducers = createExtraReducers();

const standardSlice = createSlice({ name, initialState, extraReducers });

export const standardActions = { ...standardSlice.actions, ...extraActions };
export const standardReducer = standardSlice.reducer;

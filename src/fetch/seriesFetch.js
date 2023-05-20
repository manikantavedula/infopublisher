import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchData = createAsyncThunk("seriesSlice/fetchData", async () => {
  const response = await fetch("https://dummyjson.com/products/1");
  const data = await response.json();
  return data;
});

export default fetchData;

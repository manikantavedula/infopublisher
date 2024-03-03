import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OTPVerificationApi = createApi({
  reducerPath: "OTPVerificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://2factor.in/API/V1/e6d1f0ea-fa33-11ed-addf-0200cd936042/SMS/",
  }),
  endpoints: (builder) => ({
    pullOTP: builder.mutation({
      query: (ep) => ({
        url: `+91${ep}/AUTOGEN2/INFOPBS`,
        method: "GET",
        redirect: "follow",
      }),
      transformResponse: (response) => response,
    }),
    checkOTP: builder.mutation({
      query: (ep) => ({
        url: `VERIFY3/+91${ep}`,
        method: "GET",
        redirect: "follow",
      }),
      transformResponse: (response) => response,
    }),
    successOTP: builder.mutation({
      query: (values) => ({
        url: `${process.env.REACT_APP_API_URL}/common/api/getLoginRole`,
        method: "POST",
        redirect: "follow",
        body: { ...values },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://app.infopublisher.in",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type",
          "Access-Control-Allow-Credentials": "true",
        },
      }),
    }),
  }),
});

export const { usePullOTPMutation, useCheckOTPMutation, useSuccessOTPMutation } =
  OTPVerificationApi;

export const { OTPVerificationApiReducer } = OTPVerificationApi.reducer;

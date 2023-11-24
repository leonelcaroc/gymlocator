/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Ratings"],
  endpoints: (builder) => ({}),
});

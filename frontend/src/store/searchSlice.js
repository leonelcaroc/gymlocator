/* eslint-disable import/newline-after-import */
/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
/* eslint-disable implicit-arrow-linebreak */
import { apiSlice } from "./apiSlice";
const SEARCH_URL = "api/search/";

export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query({
      query: ({ searchTerm, page }) =>
        `${SEARCH_URL}ratings?query=${searchTerm}&page=${page}`,
    }),
  }),
  providesTags: ["Ratings"],
});

export const { useSearchQuery } = searchApiSlice;

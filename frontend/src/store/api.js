import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ADDRESS,
  }),
  endpoints: () => ({}),
  tagTypes: ["Listings"],
});

export default api;
import api from "../store/api";

const listingsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getListings: build.query({
      query: () => "/api/listings",
      providesTags: ["Listings"],
    }),
    getListing: build.query({
      query: (id) => `/api/listings/${id}`,
      transformResponse: (response) => response[0],
      providesTags: ["Listings"],
    }),
    updateListing: build.mutation({
      query: ({ id, field, value }) => ({
        url: `/api/listings/${id}`,
        method: "PUT",
        body: { field, value },
      }),
      invalidatesTags: ["Listings"],
    }),
  }),
});

export const {
    useGetListingsQuery,
    useGetListingQuery,
    useUpdateListingMutation,
} = listingsApi;
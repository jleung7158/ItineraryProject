import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000"
  }),
  tagTypes: ["TripsList"],
  endpoints: (builder) => ({
    getTrips: builder.query({
      query: () => `/trips`,
      providesTags: ["TripsList"],
    }),
    getTrip: builder.query({
      query: (trip_id) => `/trips/${trip_id}`,
    }),
    createTrip: builder.mutation({
      query: (data) => ({
        url: `/trips`,
        body: data,
        method: 'post',
      }),
      invalidatesTags: ["TripsList"]
    }),
    getLocations: builder.query({
      query: () => `/locations`,
    }),
    getLocation: builder.query({
      query: (location_id) => `/trips/${location_id}`,
    }),
  }),
});

export const {
  useGetTripsQuery,
  useGetTripQuery,
  useCreateTripMutation,
  useGetLocationsQuery,
  useGetLocationQuery,
} = api;
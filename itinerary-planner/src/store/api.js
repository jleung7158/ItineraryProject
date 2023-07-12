import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000"
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    getTrips: builder.query({
      query: () => `/trips`,
    }),
    getTrip: builder.query({
      query: (trip_id) => `/trips/${trip_id}`,
    }),
  }),
});

export const {
  useGetTripsQuery,
  useGetTripQuery,
} = api;
import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/booking",
        method: "POST",
        data: bookingData,
      }),
      invalidatesTags: ["BOOKING"],
    }),
    getAllBookings: builder.query({
      query: () => ({
        url: "/booking",
        method: "GET",
      }),
      providesTags: ["BOOKING"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {useCreateBookingMutation, useGetAllBookingsQuery} = bookingApi;
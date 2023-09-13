import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const base_url = "https://backend.foodify.uz";

export const Table = createApi({
  reducerPath: "Table",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["table"],
  endpoints: (builder) => ({
    // add to table "/add/toCart/:user_id/;id"
    addTable: builder.mutation({
      query: (body) => ({
        url: "add/table",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      invalidatesTags: ["table"],
    }),

    // get restaurants all products "get/products/:res_id"
    getTables: builder.query({
      query: () => ({
        url: "get/tables",
        method: "GET",
        headers: {},
      }),
      providesTags: ["table"],
    }),

    // update restaurant  by user's  gave raiting "/update/money/:id" (private) (PATCH)
    updateTableById: builder.mutation({
      query: (data) => ({
        url: "update/table",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["table"],
    }),

    // delete table restaurant "/delete/favRes/:user_id/:id"
    deleteTableById: builder.mutation({
      query: (name) => ({
        url: `delete/table/${name}`,
        method: "DELETE",
        headers: {},
      }),
      invalidatesTags: ["table"],
    }),
  }),
});

export const {
  useAddTableMutation,
  useGetTablesQuery,
  useUpdateTableByIdMutation,
  useDeleteTableByIdMutation,
} = Table;

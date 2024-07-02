// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const nodeApi = createApi({
  reducerPath: 'nodeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Groups'],
  endpoints: (builder) => ({
    getProductGroups: builder.query({
      query: () => '/getgroups',
    }),
  // endpoints: (builder) => ({
  //   getProductGroups: builder.query({
  //     query: () => '/posts',
  //     // providesTags: ['Groups']
  //     providesTags: (result = [], error, arg) => [
  //       'Groups',
  //       ...result.map(({ id }) => ({ type: 'Post', id }))
  //     ]
  //   }),
    // getProductGroups: builder.query({
    //   query: () => `productgroups`,
    //   providesTags: (result) =>
    //     result
    //       ? 
    //         [
    //           ...result.map(({ id }) => ({ type: 'Posts', id })),
    //           { type: 'Posts', id: 'LIST' },
    //         ]
    //       : 
    //         [{ type: 'Posts', id: 'LIST' }],
    // }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductGroupsQuery,
} = nodeApi
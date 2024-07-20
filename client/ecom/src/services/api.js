// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const nodeApi = createApi({
  reducerPath: 'nodeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers;
    }
  }),
  tagTypes: ['Groups'],
  endpoints: (builder) => ({
    getProductGroups: builder.query({
      query: () => '/getgroups',
    }),
    getStoreById: builder.mutation({
      query(body) {
        return {
          url: `getstorebyid`,
          method: 'POST',
          body,
        }
      },
    }),
    signIn: builder.mutation({
      query(body) {
        return {
          url: `signin`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'Groups', id: 'LIST' }],
    }),
    signUp: builder.mutation({
      query(body) {
        return {
          url: `signup`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'Groups', id: 'LIST' }],
    }),
    getProducts: builder.mutation({
      query() {
        return {
          url: `getproductstest`,
          method: 'GET',
        }
      },
      invalidatesTags: [{ type: 'Groups', id: 'LIST' }],
    }),
    getStores: builder.mutation({
      query(body) {
        return {
          url: `getstores`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'Groups', id: 'LIST' }],
    }),
    getProductsBySlug: builder.mutation({
      query(data) {
        return {
          url: `products/${data.slug}`,
          method: 'GET',
          params: data.params
        }
      },
      invalidatesTags: [{ type: 'Groups', id: 'LIST' }],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductGroupsQuery, useSignInMutation, useSignUpMutation, useGetProductsMutation, useGetStoresMutation, useGetStoreByIdMutation, useGetProductsBySlugMutation
} = nodeApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {PRODUCT_URL} from '../constants.js';
import { apiSlice } from "./apiSlices.js";


export const productsApiSlice=apiSlice.injectEndpoints({
  endpoints:(builder)=>({
    getProducts: builder.query({
      query: ()=>({
        url: PRODUCT_URL,
      }),
      keepUnusedDataFor:5,
    }),
    getProductDetails: builder.query({
      query: (productId)=>({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor:5,
    }),
    createProduct: builder.mutation({
      query: (productId)=>({
        url: `${PRODUCT_URL}`,
        method:'POST',
      }),
      invalidatesTags:['Product']
    }),
    updateProduct: builder.mutation({
      query: (data)=>({
        url: `${PRODUCT_URL}/${data._id}`,
        method:'PUT',
        body: data,
      }),
      invalidatesTags:['Product']
    }),
    deleteProduct: builder.mutation({
      query: (productId)=>({
        url: `${PRODUCT_URL}/${productId}`,
        method:'DELETE',
      }),
    }),
    createReview: builder.mutation({
      query: (data)=>({
        url: `${PRODUCT_URL}/${data.productId}/reviews`,
        method:'POST',
        body:data
      }),
      invalidatesTags:['Product']
    }),
  }),
});
export const {useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, useCreateReviewMutation}=productsApiSlice;

import {USERS_URL} from '../constants.js';
import { apiSlice } from "./apiSlices.js";


export const usersApiSlice=apiSlice.injectEndpoints({
  endpoints:(builder)=>({
    login: builder.mutation({
      query: (data)=>({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
      keepUnusedDataFor:5,
    }),
    register: builder.mutation({
      query: (data)=>({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
      keepUnusedDataFor:5,
    }),
    logout: builder.mutation({
      query: ()=>({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
      keepUnusedDataFor:5,
    }),
    profile: builder.mutation({
      query: (data)=>({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body:data,
      }),
      keepUnusedDataFor:5,
    }),
    getUsers: builder.query({
      query: ()=>({
        url: `${USERS_URL}`,
      }),
      providesTags:['Users'],
      keepUnusedDataFor:5,
    }),
    deleteUsers: builder.mutation({
      query: (userId)=>({
        url: `${USERS_URL}/${userId}`,
        method:'DELETE',
      }),

    }),
  }),
});
// export const {useloginMutation}=usersApiSlice;
export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery,useDeleteUsersMutation } = usersApiSlice;

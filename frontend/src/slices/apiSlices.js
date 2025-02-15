import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {BASIC_URL} from '../constants.js';


const baseQuery=fetchBaseQuery({baseUrl: BASIC_URL});
export const apiSlice=createApi({
  baseQuery:baseQuery,
  tagTypes:['Product', 'Order','User'],
  endpoints:(builder)=>({})
});
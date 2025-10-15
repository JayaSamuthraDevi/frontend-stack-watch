import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseApi'
import { SignupResponse, SignupRequest, LoginResponse, LoginRequest } from '@/types/authTypes'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Instance', 'Auth'],
  endpoints: (build) => ({
    signup: build.mutation<SignupResponse, SignupRequest>({
      query: (body) => ({
        url: 'auth/signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    me: build.query<LoginResponse, void>({
      query: () => '/auth/me',
    }),
  }),
})

export const {
  useSignupMutation,
  useLoginMutation,
  useMeQuery
} = authApi

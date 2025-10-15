import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',  // Important for cookies
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Try refresh token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    if (refreshResult.data) {
      // Retry original request
      console.log('----')
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(baseApi.endpoints.logout.initiate());  }
  }
  return result;
};

export const API_TAG_TYPES = [ 'Auth','Instance'] as const
export type ApiTags = typeof API_TAG_TYPES[number]

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: API_TAG_TYPES,
  endpoints: (build) => ({
     logout: build.mutation<void, void>({
          query: () => ({
            url: 'auth/logout',
            method: 'POST',
          }),
        }),
  }),
})

export const {  useLogoutMutation,
}= baseApi
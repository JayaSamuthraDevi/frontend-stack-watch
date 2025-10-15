import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '../store/api/baseApi'
import { instanceApi } from '../store/api/instanceApi'
import { authApi } from '../store/api/authApi'
import instanceReducer from '../store/slices/instanceSlice';

export const store = configureStore({
  reducer: {
    api: baseApi.reducer,
    instances: instanceReducer,
    [instanceApi.reducerPath]: instanceApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      instanceApi.middleware,
      authApi.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

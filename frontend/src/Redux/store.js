import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import contactSlice from './contactSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    contact:contactSlice
  },
})
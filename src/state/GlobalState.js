import { configureStore, combineReducers } from '@reduxjs/toolkit'
import commetingReducer from './commentingSlice'

export const store = configureStore({
  reducer: combineReducers({
    commenting: commetingReducer
  })
});
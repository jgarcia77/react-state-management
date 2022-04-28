import { configureStore, combineReducers } from '@reduxjs/toolkit'
import commetingReducer from './commentingSlice'
import todosReducer from './todosSlice';

export const store = configureStore({
  reducer: combineReducers({
    commenting: commetingReducer,
    todoList: todosReducer
  })
});
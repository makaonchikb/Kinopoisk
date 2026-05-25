import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { moviesReducer } from './movies-slice'
import { collectionsReducer } from './collections-slice'
import { moviesFilterReducer } from './filters-slice'
import { authReducer } from './auth-slice'

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    collections: collectionsReducer,
    filters: moviesFilterReducer,
    auth: authReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

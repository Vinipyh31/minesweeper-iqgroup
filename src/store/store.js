import optionsReducer from './optionsSlice';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        optionsReducer,
    },
})

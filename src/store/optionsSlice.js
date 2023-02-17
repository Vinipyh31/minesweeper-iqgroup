import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    width: 16,
    height: 16,
    numOfMines: 30,
    userName: 'player',
}

export const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        setWidth: (state, action) => {
            state.width = action.payload
        },
        setHeight: (state, action) => {
            state.height = action.payload
        },
        setNumOfMines: (state, action) => {
            state.numOfMines = action.payload
        },
        setUserName: (state, action) => {
            state.userName = action.payload
        }
    },
})

export const { setWidth, setHeight, setNumOfMines, setUserName } = optionsSlice.actions

export default optionsSlice.reducer
import { createSlice } from "@reduxjs/toolkit"

export interface GlobalState {
    mode: string,
    userId: string
}

const initialState: GlobalState = {
    mode: "dark",
    userId: "63701cc1f03239b7f700000e",
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        }
    }
})

export const {setMode} = globalSlice.actions
export default globalSlice.reducer
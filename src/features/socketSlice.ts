import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type socketState = {
    value: WebSocket | null,
}

const initialState: socketState = {
    value: null
};

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setWebSocket: (state, action: PayloadAction<WebSocket>)=>{
            state.value = action.payload
        }
    }
});

export const {setWebSocket} = socketSlice.actions;
export default socketSlice.reducer;
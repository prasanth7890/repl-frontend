import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type renderState = {
    value: boolean;
}

const initialState: renderState = {
    value: false
};

export const renderEditorSlice = createSlice({
    name: 'renderEditor',
    initialState,
    reducers: {
        setRenderEditor: (state, action: PayloadAction<boolean>)=>{
            state.value = action.payload
        }
    }
});

export const {setRenderEditor} = renderEditorSlice.actions;
export default renderEditorSlice.reducer;
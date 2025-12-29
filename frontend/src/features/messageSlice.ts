import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store/store";
import {Messagetype} from "../types/types";

type InitialStateType = {
    ragextra1: Messagetype[];
}

const initialState: InitialStateType = {
    ragextra1: [],
}

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        inputMessageToReduxStore: (state, action) => {
            if(action.payload.pathname === "/main") {
                state.ragextra1.push(
                    action.payload
                );
            }
        }
    }
})

export const {inputMessageToReduxStore} = messageSlice.actions;
export const selectMessages = (state: RootState) => state.message;
export default messageSlice.reducer;
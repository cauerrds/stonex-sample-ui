import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../database/users.types";
import { getAllUsers } from "./usertsActions";


interface InitialState {
    loading: boolean
    success: boolean
    userList: IUser[]
}

const initialState: InitialState = {
    loading: false,
    success: false,
    userList: [],
}


const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        setToInitalState(state, action) {
            state = initialState
        },
        loadInitialItems: (state, action) => {
            state.userList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
        })
    },
});
export const { setToInitalState, loadInitialItems } = usersSlice.actions
export default usersSlice.reducer

import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../database/users.types";
import { getAllUsers } from "./usertsActions";
import { sortUsersByName } from "../../helpers/SortByName";
import { sortNumbersByValue } from "../../helpers/SortByValue";


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
        filterList: (state, action) => {
            switch (action.payload) {
                case 'name':
                    const nameSortedList = sortUsersByName(state.userList)
                    state.userList = nameSortedList
                    break;
                case "bank":
                    const bankSortedList = sortNumbersByValue(state.userList)
                    state.userList = bankSortedList
                    break;
                default:
                    break
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
        })
    },
});
export const { setToInitalState, loadInitialItems, filterList } = usersSlice.actions
export default usersSlice.reducer

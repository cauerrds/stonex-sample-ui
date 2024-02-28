import { createAsyncThunk } from "@reduxjs/toolkit"
import { userLocalService } from "../../service/users.local.service"
import { loadInitialItems } from "./users"

export const getAllUsers = createAsyncThunk(
    'users/getAll',
    async (_, { dispatch }) => {
        const res = await userLocalService.getUsers()
        dispatch(loadInitialItems(res.data))
    }
)
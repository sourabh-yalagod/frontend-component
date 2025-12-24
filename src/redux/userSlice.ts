import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserApi = createAsyncThunk("user/fetch", async () => {
    const { data } = await axios.get("https://dummyjson.com/users?limit=5")
    return data;
})
const initialState = {
    loading: false,
    users: [],
    error: ""
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserApi.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUserApi.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserApi.rejected, (state) => {
                state.loading = false;
                state.error = "Errpr";
            })
    }
})

export default userSlice.reducer;
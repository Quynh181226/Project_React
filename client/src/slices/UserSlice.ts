import { createSlice } from "@reduxjs/toolkit";
import { getByEmail, add, login } from "../apis/UserApi";
import type { UserState } from "../types/type";

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

//getUserByEmail
//addUser
//login
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getByEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getByEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getByEmail.rejected, (state) => {
                state.loading = false;
                state.error = "Error";
            })
            .addCase(add.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(add.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(add.rejected, (state) => {
                state.loading = false;
                state.error = "Error";
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const userReducer = userSlice.reducer;
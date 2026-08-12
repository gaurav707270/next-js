import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {
            email: "",
            password: "",
        },
    },
    reducers: {
        singUp: (state, action) => {
            state.user = action.payload;
        },

        singIn: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { singUp, singIn } = authSlice.actions;

export default authSlice.reducer;
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice";
import userReducer from "../features/UserSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
    },
});
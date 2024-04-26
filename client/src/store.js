import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../src/features/auth/authSlice';
import { handleSessionTimeout } from "./middlewares/handleSessionTimeout";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(handleSessionTimeout),
});